import * as vscode from 'vscode';
import { ConfigurationService } from './services/configurationService';
import { ChatViewProvider } from './views/chatViewProvider';

export function activate(context: vscode.ExtensionContext) {
  // Initialize configuration service
  const configService = new ConfigurationService();

  // Register Chat View Provider
  const chatViewProvider = new ChatViewProvider(context.extensionUri);
  const chatView = vscode.window.registerWebviewViewProvider(
    'neuroforge.chatView',
    chatViewProvider
  );
  context.subscriptions.push(chatView);

  // Register commands
  let explainCode = vscode.commands.registerCommand('neuroforge.explainCode', () => {
    vscode.window.showInformationMessage('Explain Code command executed');
  });

  let generateDocs = vscode.commands.registerCommand('neuroforge.generateDocs', () => {
    vscode.window.showInformationMessage('Generate Documentation command executed');
  });

  let suggestRefactor = vscode.commands.registerCommand('neuroforge.suggestRefactor', () => {
    vscode.window.showInformationMessage('Suggest Refactoring command executed');
  });

  let generateTests = vscode.commands.registerCommand('neuroforge.generateTests', () => {
    vscode.window.showInformationMessage('Generate Tests command executed');
  });

  let convertCode = vscode.commands.registerCommand('neuroforge.convertCode', () => {
    vscode.window.showInformationMessage('Convert Code command executed');
  });

  let analyzeDependencies = vscode.commands.registerCommand(
    'neuroforge.analyzeDependencies',
    () => {
      vscode.window.showInformationMessage('Analyze Dependencies command executed');
    }
  );

  let openSettings = vscode.commands.registerCommand('neuroforge.openSettings', () => {
    vscode.commands.executeCommand('workbench.action.openSettings', 'neuroforge');
  });

  let showMenu = vscode.commands.registerCommand('neuroforge.showMenu', () => {
    vscode.window
      .showQuickPick([
        'Explain Code',
        'Generate Documentation',
        'Suggest Refactoring',
        'Generate Tests',
        'Convert Code',
        'Analyze Dependencies',
      ])
      .then(selection => {
        if (selection) {
          vscode.commands.executeCommand(
            `neuroforge.${selection.toLowerCase().replace(/\s+/g, '')}`
          );
        }
      });
  });

  // Add all commands to subscriptions
  context.subscriptions.push(
    explainCode,
    generateDocs,
    suggestRefactor,
    generateTests,
    convertCode,
    analyzeDependencies,
    openSettings,
    showMenu
  );

  // Register configuration change listener
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async e => {
      if (e.affectsConfiguration('neuroforge')) {
        const validationErrors = await configService.validateSettings();
        if (validationErrors.length > 0) {
          const message = 'NeuroForge configuration issues found:\n' + validationErrors.join('\n');
          vscode.window.showWarningMessage(message);
        }
      }
    })
  );

  // Show welcome message
  vscode.window.showInformationMessage('NeuroForge is now active!');
}

export function deactivate() {}
