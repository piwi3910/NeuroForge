import * as vscode from 'vscode';
import { LanguageService } from '../services/languageService';
import { AIService } from '../services/aiService';

interface RefactoringSuggestion {
    title: string;
    description: string;
    beforeCode: string;
    afterCode: string;
    reason: string;
    impact: 'high' | 'medium' | 'low';
}

export class SuggestRefactorCommand {
    private readonly languageService: LanguageService;
    private readonly aiService: AIService;

    constructor(languageService: LanguageService, aiService: AIService) {
        this.languageService = languageService;
        this.aiService = aiService;
    }

    /**
     * Registers the suggest refactoring command
     * @param context The extension context
     */
    public register(context: vscode.ExtensionContext): void {
        const disposable = vscode.commands.registerCommand('neuroforge.suggestRefactor', async () => {
            await this.execute();
        });
        context.subscriptions.push(disposable);
    }

    /**
     * Executes the suggest refactoring command
     */
    private async execute(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('Please open a file to analyze for refactoring.');
            return;
        }

        const selection = editor.selection;
        const code = selection.isEmpty 
            ? editor.document.getText() 
            : editor.document.getText(selection);

        if (!code.trim()) {
            vscode.window.showWarningMessage('No code selected to analyze.');
            return;
        }

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Analyzing code for refactoring...",
                cancellable: false
            }, async (progress) => {
                // Analyze code structure
                progress.report({ message: 'Analyzing code patterns...' });
                const analysis = await this.languageService.analyzeCode(code);

                // Generate refactoring suggestions
                progress.report({ message: 'Generating suggestions...' });
                const suggestions = await this.aiService.suggestImprovements(code, analysis);

                // Show suggestions in a webview
                await this.showRefactoringSuggestions(code, suggestions.content);
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to analyze code: ${error}`);
        }
    }

    /**
     * Creates and shows a webview with refactoring suggestions
     * @param originalCode The original code
     * @param suggestions Refactoring suggestions
     */
    private async showRefactoringSuggestions(originalCode: string, suggestions: string): Promise<void> {
        const panel = vscode.window.createWebviewPanel(
            'refactoringSuggestions',
            'Refactoring Suggestions',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = this.getWebviewContent(originalCode, suggestions);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'applyRefactoring':
                    await this.applyRefactoring(message.code);
                    break;
                case 'copyToClipboard':
                    await vscode.env.clipboard.writeText(message.code);
                    vscode.window.showInformationMessage('Code copied to clipboard!');
                    break;
            }
        });
    }

    /**
     * Applies the selected refactoring to the code
     * @param newCode The refactored code
     */
    private async applyRefactoring(newCode: string): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        await editor.edit(editBuilder => {
            if (selection.isEmpty) {
                // Replace entire file content
                const fullRange = new vscode.Range(
                    new vscode.Position(0, 0),
                    new vscode.Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length)
                );
                editBuilder.replace(fullRange, newCode);
            } else {
                // Replace only selected content
                editBuilder.replace(selection, newCode);
            }
        });

        vscode.window.showInformationMessage('Refactoring applied successfully!');
    }

    /**
     * Generates the HTML content for the webview
     * @param originalCode The original code
     * @param suggestions Refactoring suggestions
     * @returns HTML content
     */
    private getWebviewContent(originalCode: string, suggestions: string): string {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Refactoring Suggestions</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    padding: 20px;
                }
                .suggestion {
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 1px solid var(--vscode-panel-border);
                    border-radius: 5px;
                }
                .code-block {
                    background-color: var(--vscode-editor-background);
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 3px;
                    white-space: pre-wrap;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 12px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
            </style>
        </head>
        <body>
            <h2>Original Code</h2>
            <div class="code-block">${this.escapeHtml(originalCode)}</div>
            
            <h2>Suggested Improvements</h2>
            <div class="suggestion">
                ${this.formatSuggestions(suggestions)}
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                
                function applyRefactoring(code) {
                    vscode.postMessage({
                        command: 'applyRefactoring',
                        code: code
                    });
                }
                
                function copyToClipboard(code) {
                    vscode.postMessage({
                        command: 'copyToClipboard',
                        code: code
                    });
                }
            </script>
        </body>
        </html>`;
    }

    /**
     * Formats the suggestions into HTML
     * @param suggestions Raw suggestions text
     * @returns Formatted HTML
     */
    private formatSuggestions(suggestions: string): string {
        return suggestions.split('\n').map(line => {
            if (line.startsWith('```')) {
                return '<div class="code-block">';
            } else if (line.endsWith('```')) {
                return '</div>';
            }
            return this.escapeHtml(line);
        }).join('\n');
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