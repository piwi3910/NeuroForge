'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) {
          k2 = k;
        }
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) {
          k2 = k;
        }
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) {
            if (Object.prototype.hasOwnProperty.call(o, k)) {
              ar[ar.length] = k;
            }
          }
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) {
        return mod;
      }
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) {
          if (k[i] !== 'default') {
            __createBinding(result, mod, k[i]);
          }
        }
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require('vscode'));
const configurationService_1 = require('./services/configurationService');
const chatViewProvider_1 = require('./views/chatViewProvider');
// Adding an unformatted line to test prettier
const test = 'unformatted';
function activate(context) {
  // Initialize configuration service
  const configService = new configurationService_1.ConfigurationService();
  // Register Chat View Provider
  const chatViewProvider = new chatViewProvider_1.ChatViewProvider(context.extensionUri);
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
function deactivate() {}
//# sourceMappingURL=extension.js.map
