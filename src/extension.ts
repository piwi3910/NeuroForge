import * as vscode from 'vscode';
import { LanguageService } from './services/languageService';
import { AIService } from './services/aiService';
import { ExplainCodeCommand } from './commands/explainCode';
import { GenerateDocsCommand } from './commands/generateDocs';
import { SuggestRefactorCommand } from './commands/suggestRefactor';
import { GenerateTestsCommand } from './commands/generateTests';
import { ConvertCodeCommand } from './commands/convertCode';
import { AnalyzeDependenciesCommand } from './commands/analyzeDependencies';
import { CompletionProvider } from './services/completionProvider';
import { TelemetryReporter } from './services/telemetryReporter';
import { CacheService } from './services/cacheService';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('NeuroForge extension is now active!');

    // Initialize services
    const cacheService = new CacheService();
    const languageService = new LanguageService();
    const aiService = new AIService();
    const telemetryReporter = new TelemetryReporter();

    // Initialize commands
    const explainCode = new ExplainCodeCommand(languageService, aiService);
    const generateDocs = new GenerateDocsCommand(languageService, aiService);
    const suggestRefactor = new SuggestRefactorCommand(languageService, aiService);
    const generateTests = new GenerateTestsCommand(languageService, aiService);
    const convertCode = new ConvertCodeCommand(languageService, aiService);
    const analyzeDependencies = new AnalyzeDependenciesCommand(cacheService);

    // Register all commands
    explainCode.register(context);
    generateDocs.register(context);
    suggestRefactor.register(context);
    generateTests.register(context);
    convertCode.register(context);
    analyzeDependencies.register(context);

    // Register completion provider
    const completionProvider = new CompletionProvider(aiService, languageService);
    const supportedLanguages = ['javascript', 'typescript', 'python', 'java', 'cpp', 'csharp'];
    
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            supportedLanguages.map(lang => ({ scheme: 'file', language: lang })),
            completionProvider,
            '.', '(', '{', '[', '"', "'" // Trigger characters
        )
    );

    // Register completion tracking command
    context.subscriptions.push(
        vscode.commands.registerCommand('neuroforge.trackCompletion', (suggestion: string) => {
            telemetryReporter.sendTelemetryEvent('completion.used', {
                suggestion,
                language: vscode.window.activeTextEditor?.document.languageId || 'unknown'
            });
        })
    );

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
            { label: "$(beaker) Generate Tests", command: 'neuroforge.generateTests' },
            { label: "$(sync) Convert Code", command: 'neuroforge.convertCode' },
            { label: "$(references) Analyze Dependencies", command: 'neuroforge.analyzeDependencies' }
        ];

        const selected = await vscode.window.showQuickPick(actions, {
            placeHolder: 'Select NeuroForge Action'
        });

        if (selected) {
            telemetryReporter.sendTelemetryEvent('menu.action.selected', {
                action: selected.command
            });
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
                const settings = {
                    model: config.get('aiModel'),
                    maxTokens: config.get('maxTokens'),
                    language: config.get('language'),
                    autoSuggest: config.get('autoSuggest')
                };
                
                aiService.updateSettings(settings);
                telemetryReporter.sendTelemetryEvent('settings.updated', settings as Record<string, string>);
                
                // Clear cache on configuration change
                cacheService.clear();
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
                    new vscode.CodeAction('NeuroForge: Generate Tests', vscode.CodeActionKind.QuickFix),
                    new vscode.CodeAction('NeuroForge: Convert Code', vscode.CodeActionKind.QuickFix),
                    new vscode.CodeAction('NeuroForge: Analyze Dependencies', vscode.CodeActionKind.QuickFix)
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

    // Register telemetry reporter for cleanup
    context.subscriptions.push(telemetryReporter);
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('NeuroForge extension is now deactivated!');
}
