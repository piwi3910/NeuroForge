import * as vscode from 'vscode';

import { analyzeDependencies } from './commands/analyzeDependencies';
import { convertCode } from './commands/convertCode';
import { explainCode } from './commands/explainCode';
import { generateDocs } from './commands/generateDocs';
import { generateTests } from './commands/generateTests';
import { suggestRefactor } from './commands/suggestRefactor';
import { AIService } from './services/aiService';
import { CompletionProvider } from './services/completionProvider';
import { DependencyAnalyzer } from './services/dependencyAnalyzer';
import { ChatViewProvider } from './views/chatViewProvider';
import { DependencyTreeProvider } from './views/dependencyTreeProvider';
import { SettingsViewProvider } from './views/settingsViewProvider';

// Create output channel for logging
const outputChannel = vscode.window.createOutputChannel('NeuroForge');

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  outputChannel.show();
  outputChannel.appendLine('NeuroForge extension is being activated...');

  try {
    // Initialize services
    outputChannel.appendLine('Initializing services...');
    const aiService = new AIService();
    await aiService.initialize();

    // Set initial context for view visibility
    void vscode.commands.executeCommand('setContext', 'neuroforge.showingSettings', false);

    // Register Chat View Provider
    outputChannel.appendLine('Registering Chat View Provider...');
    const chatViewProvider = new ChatViewProvider(context.extensionUri);
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('neuroforge.chatView', chatViewProvider, {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      })
    );

    // Register Settings View Provider
    outputChannel.appendLine('Registering Settings View Provider...');
    const settingsViewProvider = new SettingsViewProvider(context.extensionUri);
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('neuroforge.settingsView', settingsViewProvider, {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      })
    );

    // Register Dependency Tree Provider
    outputChannel.appendLine('Registering Dependency Tree Provider...');
    const dependencyTreeProvider = new DependencyTreeProvider(new DependencyAnalyzer());
    context.subscriptions.push(
      vscode.window.registerTreeDataProvider('dependencyExplorer', dependencyTreeProvider)
    );

    // Register completion provider
    outputChannel.appendLine('Registering Completion Provider...');
    const completionProvider = new CompletionProvider(aiService);
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        ['javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'go', 'rust', 'php'],
        completionProvider,
        '.',
        ' '
      )
    );

    // Register Commands
    outputChannel.appendLine('Registering commands...');
    context.subscriptions.push(
      vscode.commands.registerCommand('neuroforge.explainCode', explainCode),
      vscode.commands.registerCommand('neuroforge.generateDocs', generateDocs),
      vscode.commands.registerCommand('neuroforge.suggestRefactor', suggestRefactor),
      vscode.commands.registerCommand('neuroforge.generateTests', generateTests),
      vscode.commands.registerCommand('neuroforge.convertCode', convertCode),
      vscode.commands.registerCommand('neuroforge.analyzeDependencies', () =>
        analyzeDependencies(context)
      ),
      vscode.commands.registerCommand('neuroforge.openSettings', async () => {
        // Show settings view and hide chat view
        await vscode.commands.executeCommand('setContext', 'neuroforge.showingSettings', true);
      }),
      vscode.commands.registerCommand('neuroforge.backToChat', async () => {
        // Show chat view and hide settings view
        await vscode.commands.executeCommand('setContext', 'neuroforge.showingSettings', false);
      }),
      vscode.commands.registerCommand('neuroforge.showMenu', async () => {
        const commands = [
          {
            label: 'Explain Code',
            command: 'neuroforge.explainCode',
            detail: 'Get an explanation of the selected code',
          },
          {
            label: 'Generate Documentation',
            command: 'neuroforge.generateDocs',
            detail: 'Generate documentation for the selected code',
          },
          {
            label: 'Suggest Refactoring',
            command: 'neuroforge.suggestRefactor',
            detail: 'Get refactoring suggestions for the selected code',
          },
          {
            label: 'Generate Tests',
            command: 'neuroforge.generateTests',
            detail: 'Generate test cases for the selected code',
          },
          {
            label: 'Convert Code',
            command: 'neuroforge.convertCode',
            detail: 'Convert code to another programming language',
          },
          {
            label: 'Analyze Dependencies',
            command: 'neuroforge.analyzeDependencies',
            detail: 'Analyze project dependencies',
          },
          {
            label: 'Settings',
            command: 'neuroforge.openSettings',
            detail: 'Open NeuroForge settings',
          },
        ];

        const selected = await vscode.window.showQuickPick(commands, {
          placeHolder: 'Select an action',
        });

        if (selected) {
          void vscode.commands.executeCommand(selected.command);
        }
      })
    );

    // Show welcome message on first install
    const config = vscode.workspace.getConfiguration('neuroforge');
    const hasShownWelcome = config.get('hasShownWelcome');

    if (!hasShownWelcome) {
      void vscode.window
        .showInformationMessage(
          'Welcome to NeuroForge! Would you like to configure the extension now?',
          'Configure',
          'Later'
        )
        .then(selection => {
          if (selection === 'Configure') {
            void vscode.commands.executeCommand('neuroforge.openSettings');
          }
          void config.update('hasShownWelcome', true, true);
        });
    }

    outputChannel.appendLine('NeuroForge extension activated successfully!');
    void vscode.window.showInformationMessage('NeuroForge activated successfully!');
  } catch (error) {
    outputChannel.appendLine(`Error activating NeuroForge: ${error}`);
    void vscode.window.showErrorMessage(`Failed to activate NeuroForge: ${error}`);
  }
}

export function deactivate(): void {
  outputChannel.appendLine('NeuroForge extension is being deactivated...');
}
