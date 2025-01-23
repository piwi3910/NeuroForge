import * as vscode from 'vscode';
import { LanguageService } from './services/languageService';
import { AIService } from './services/aiService';
import { ExplainCodeCommand } from './commands/explainCode';
import { GenerateDocsCommand } from './commands/generateDocs';
import { SuggestRefactorCommand } from './commands/suggestRefactor';
import { GenerateTestsCommand } from './commands/generateTests';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('NeuroForge extension is now active!');

    // Initialize services
    const languageService = new LanguageService();
    const aiService = new AIService();

    // Initialize commands
    const explainCode = new ExplainCodeCommand(languageService, aiService);
    const generateDocs = new GenerateDocsCommand(languageService, aiService);
    const suggestRefactor = new SuggestRefactorCommand(languageService, aiService);
    const generateTests = new GenerateTestsCommand(languageService, aiService);

    // Register all commands
    explainCode.register(context);
    generateDocs.register(context);
    suggestRefactor.register(context);
    generateTests.register(context);

    // Create status bar menu
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.text = "$(brain) NeuroForge";
    statusBarItem.tooltip = "Click to show NeuroForge actions";
    statusBarItem.command = 'neuroforge.showMenu';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register menu command
    const menuCommand = vscode.commands.registerCommand('neuroforge.showMenu', async () => {
        const actions = [
            { label: "$(lightbulb) Explain Code", command: 'neuroforge.explainCode' },
            { label: "$(note) Generate Documentation", command: 'neuroforge.generateDocs' },
            { label: "$(wand) Suggest Refactoring", command: 'neuroforge.suggestRefactor' },
            { label: "$(beaker) Generate Tests", command: 'neuroforge.generateTests' }
        ];

        const selected = await vscode.window.showQuickPick(actions, {
            placeHolder: 'Select NeuroForge Action'
        });

        if (selected) {
            vscode.commands.executeCommand(selected.command);
        }
    });
    context.subscriptions.push(menuCommand);

    // Register configuration change handler
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('neuroforge')) {
                // Update services with new configuration
                const config = vscode.workspace.getConfiguration('neuroforge');
                aiService.updateSettings({
                    model: config.get('aiModel'),
                    maxTokens: config.get('maxTokens'),
                    language: config.get('language'),
                    autoSuggest: config.get('autoSuggest')
                });
            }
        })
    );

    // Register code action provider
    const codeActionProvider = vscode.languages.registerCodeActionsProvider(
        { pattern: '**/*' },
        {
            provideCodeActions(document, range) {
                const actions = [
                    new vscode.CodeAction('NeuroForge: Explain Code', vscode.CodeActionKind.QuickFix),
                    new vscode.CodeAction('NeuroForge: Generate Documentation', vscode.CodeActionKind.QuickFix),
                    new vscode.CodeAction('NeuroForge: Suggest Refactoring', vscode.CodeActionKind.QuickFix),
                    new vscode.CodeAction('NeuroForge: Generate Tests', vscode.CodeActionKind.QuickFix)
                ];

                actions.forEach(action => {
                    action.command = {
                        command: action.title.toLowerCase().replace('neuroforge: ', 'neuroforge.'),
                        title: action.title,
                        tooltip: `Execute ${action.title}`
                    };
                });

                return actions;
            }
        }
    );
    context.subscriptions.push(codeActionProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('NeuroForge extension is now deactivated!');
}
