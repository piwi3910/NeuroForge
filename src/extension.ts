import * as vscode from 'vscode';
import { LanguageService } from './services/languageService';
import { AIService } from './services/aiService';
import { ExplainCodeCommand } from './commands/explainCode';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('NeuroForge extension is now active!');

    // Initialize services
    const languageService = new LanguageService();
    const aiService = new AIService();

    // Initialize and register commands
    const explainCode = new ExplainCodeCommand(languageService, aiService);
    explainCode.register(context);

    // Add status bar item
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.text = "$(brain) NeuroForge";
    statusBarItem.tooltip = "Click to explain selected code";
    statusBarItem.command = 'neuroforge.explainCode';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

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
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('NeuroForge extension is now deactivated!');
}
