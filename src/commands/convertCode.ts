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

                // Show in diff editor
                await this.showConversionDiff(
                    code,
                    convertedCode.content,
                    selected.option.sourceLanguage,
                    selected.option.targetLanguage
                );
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to convert code: ${error}`);
        }
    }

    /**
     * Shows the conversion diff in VSCode's diff editor
     * @param originalCode Original code
     * @param convertedCode Converted code
     * @param sourceLanguage Source language
     * @param targetLanguage Target language
     */
    private async showConversionDiff(
        originalCode: string,
        convertedCode: string,
        sourceLanguage: string,
        targetLanguage: string
    ): Promise<void> {
        // Create URIs for the diff editor
        const originalUri = vscode.Uri.parse(`untitled:Original.${sourceLanguage}`);
        const convertedUri = vscode.Uri.parse(`untitled:Converted.${targetLanguage}`);

        // Create the documents
        const originalDoc = await vscode.workspace.openTextDocument(originalUri);
        const convertedDoc = await vscode.workspace.openTextDocument(convertedUri);

        // Apply the content
        const edit = new vscode.WorkspaceEdit();
        edit.insert(originalUri, new vscode.Position(0, 0), originalCode);
        edit.insert(convertedUri, new vscode.Position(0, 0), convertedCode);
        await vscode.workspace.applyEdit(edit);

        // Show diff
        await vscode.commands.executeCommand('vscode.diff',
            originalUri,
            convertedUri,
            `Convert ${sourceLanguage} to ${targetLanguage}`
        );

        // Add apply button to editor title
        const applyButton = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        applyButton.text = "$(check) Apply Conversion";
        applyButton.tooltip = "Apply the converted code";
        applyButton.command = {
            command: 'neuroforge.applyConversion',
            title: 'Apply Conversion',
            arguments: [convertedCode]
        };
        applyButton.show();

        // Register apply command
        const disposable = vscode.commands.registerCommand(
            'neuroforge.applyConversion',
            async (newCode: string) => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return;
                }

                await editor.edit(editBuilder => {
                    if (editor.selection.isEmpty) {
                        const fullRange = new vscode.Range(
                            new vscode.Position(0, 0),
                            new vscode.Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length)
                        );
                        editBuilder.replace(fullRange, newCode);
                    } else {
                        editBuilder.replace(editor.selection, newCode);
                    }
                });

                applyButton.dispose();
                disposable.dispose();
                vscode.window.showInformationMessage('Code conversion applied successfully!');
            }
        );
    }
}