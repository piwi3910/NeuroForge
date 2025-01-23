import * as vscode from 'vscode';
import { LanguageService } from '../services/languageService';
import { AIService } from '../services/aiService';

interface ConversionOption {
    label: string;
    sourceLanguage: string;
    targetLanguage: string;
    description: string;
}

export class ConvertCodeCommand {
    private readonly languageService: LanguageService;
    private readonly aiService: AIService;
    private readonly conversionOptions: ConversionOption[] = [
        {
            label: "JavaScript → TypeScript",
            sourceLanguage: "javascript",
            targetLanguage: "typescript",
            description: "Convert JavaScript code to TypeScript"
        },
        {
            label: "TypeScript → JavaScript",
            sourceLanguage: "typescript",
            targetLanguage: "javascript",
            description: "Convert TypeScript code to JavaScript"
        },
        {
            label: "Python → JavaScript",
            sourceLanguage: "python",
            targetLanguage: "javascript",
            description: "Convert Python code to JavaScript"
        },
        {
            label: "JavaScript → Python",
            sourceLanguage: "javascript",
            targetLanguage: "python",
            description: "Convert JavaScript code to Python"
        },
        {
            label: "Java → TypeScript",
            sourceLanguage: "java",
            targetLanguage: "typescript",
            description: "Convert Java code to TypeScript"
        }
    ];

    constructor(languageService: LanguageService, aiService: AIService) {
        this.languageService = languageService;
        this.aiService = aiService;
    }

    /**
     * Registers the convert code command
     * @param context The extension context
     */
    public register(context: vscode.ExtensionContext): void {
        const disposable = vscode.commands.registerCommand('neuroforge.convertCode', async () => {
            await this.execute();
        });
        context.subscriptions.push(disposable);
    }

    /**
     * Executes the convert code command
     */
    private async execute(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('Please open a file to convert code.');
            return;
        }

        const selection = editor.selection;
        const code = selection.isEmpty 
            ? editor.document.getText() 
            : editor.document.getText(selection);

        if (!code.trim()) {
            vscode.window.showWarningMessage('No code selected to convert.');
            return;
        }

        try {
            // Get current language
            const currentLanguage = editor.document.languageId;

            // Filter relevant conversion options
            const relevantOptions = this.conversionOptions.filter(
                option => option.sourceLanguage === currentLanguage
            );

            if (relevantOptions.length === 0) {
                vscode.window.showWarningMessage('No conversion options available for current language.');
                return;
            }

            // Let user select conversion option
            const selected = await vscode.window.showQuickPick(
                relevantOptions.map(option => ({
                    label: option.label,
                    description: option.description,
                    option: option
                })),
                {
                    placeHolder: 'Select conversion type'
                }
            );

            if (!selected) {
                return;
            }

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Converting code...",
                cancellable: false
            }, async (progress) => {
                // Analyze code structure
                progress.report({ message: 'Analyzing code structure...' });
                const analysis = await this.languageService.analyzeCode(code);

                // Convert code
                progress.report({ message: 'Converting code...' });
                const convertedCode = await this.aiService.convertCode(code, {
                    ...analysis,
                    sourceLanguage: selected.option.sourceLanguage,
                    targetLanguage: selected.option.targetLanguage
                });

                // Show preview and apply changes
                await this.showConversionPreview(code, convertedCode.content, selected.option);
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to convert code: ${error}`);
        }
    }

    /**
     * Shows a preview of the converted code
     * @param originalCode Original code
     * @param convertedCode Converted code
     * @param option Conversion option
     */
    private async showConversionPreview(
        originalCode: string,
        convertedCode: string,
        option: ConversionOption
    ): Promise<void> {
        const panel = vscode.window.createWebviewPanel(
            'codeConversion',
            `Convert ${option.sourceLanguage} to ${option.targetLanguage}`,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true
            }
        );

        panel.webview.html = this.getPreviewHtml(originalCode, convertedCode, option);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'applyConversion':
                    await this.applyConversion(message.code);
                    panel.dispose();
                    break;
                case 'copyToClipboard':
                    await vscode.env.clipboard.writeText(message.code);
                    vscode.window.showInformationMessage('Converted code copied to clipboard!');
                    break;
            }
        });
    }

    /**
     * Applies the converted code
     * @param newCode Converted code
     */
    private async applyConversion(newCode: string): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        await editor.edit(editBuilder => {
            if (selection.isEmpty) {
                const fullRange = new vscode.Range(
                    new vscode.Position(0, 0),
                    new vscode.Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length)
                );
                editBuilder.replace(fullRange, newCode);
            } else {
                editBuilder.replace(selection, newCode);
            }
        });

        vscode.window.showInformationMessage('Code conversion applied successfully!');
    }

    /**
     * Generates the HTML for the preview webview
     */
    private getPreviewHtml(originalCode: string, convertedCode: string, option: ConversionOption): string {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Conversion Preview</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    padding: 20px;
                }
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .code-block {
                    background-color: var(--vscode-editor-background);
                    padding: 10px;
                    border-radius: 5px;
                    white-space: pre-wrap;
                }
                .actions {
                    margin-top: 20px;
                    display: flex;
                    gap: 10px;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 12px;
                    cursor: pointer;
                    border-radius: 3px;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
            </style>
        </head>
        <body>
            <h2>Code Conversion Preview</h2>
            <div class="container">
                <div>
                    <h3>${option.sourceLanguage}</h3>
                    <div class="code-block">${this.escapeHtml(originalCode)}</div>
                </div>
                <div>
                    <h3>${option.targetLanguage}</h3>
                    <div class="code-block">${this.escapeHtml(convertedCode)}</div>
                </div>
            </div>
            <div class="actions">
                <button onclick="applyConversion()">Apply Conversion</button>
                <button onclick="copyToClipboard()">Copy to Clipboard</button>
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                
                function applyConversion() {
                    vscode.postMessage({
                        command: 'applyConversion',
                        code: ${JSON.stringify(convertedCode)}
                    });
                }
                
                function copyToClipboard() {
                    vscode.postMessage({
                        command: 'copyToClipboard',
                        code: ${JSON.stringify(convertedCode)}
                    });
                }
            </script>
        </body>
        </html>`;
    }

    /**
     * Escapes HTML special characters
     * @param text Text to escape
     * @returns Escaped text
     */
    private escapeHtml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}