import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { ConfigurationService } from '../services/configurationService';
import { getLLMProviderRegistry } from '../services/llm/providerRegistry';

export class ChatViewProvider implements vscode.WebviewViewProvider {
  private readonly configService: ConfigurationService;
  private readonly aiService: AIService;
  private initialized: boolean = false;

  constructor(private readonly extensionUri: vscode.Uri) {
    this.configService = new ConfigurationService();
    this.aiService = new AIService();
  }

  private async initialize(): Promise<string[]> {
    if (this.initialized) {
      return [];
    }

    try {
      await this.aiService.initialize();
      this.initialized = true;
      return [];
    } catch (error) {
      // If initialization fails, return the error message
      return [error instanceof Error ? error.message : 'Unknown error occurred'];
    }
  }

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    // Try to initialize and check for errors
    const initErrors = await this.initialize();
    if (initErrors.length > 0) {
      webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, initErrors[0]);
    } else {
      webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    this._setWebviewMessageListener(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview, errorMessage?: string): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.js')
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.css')
    );

    const nonce = this._getNonce();

    const welcomeMessage = errorMessage
      ? `<div class="message error-message">
          ${errorMessage}
          <br><br>
          Would you like to configure the settings now?
          <br><br>
          <button onclick="vscode.postMessage({ type: 'openSettings' })">Configure Settings</button>
         </div>`
      : '<div class="message assistant-message">Welcome to NeuroForge! I\'m your AI coding assistant. How can I help you today?</div>';

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' ${webview.cspSource}; style-src 'self' ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src 'self' ${webview.cspSource} https:; font-src 'self' ${webview.cspSource};">
          <link href="${styleUri}" rel="stylesheet">
          <title>NeuroForge Chat</title>
          <style>
            .error-message {
              color: var(--vscode-errorForeground);
              background-color: var(--vscode-inputValidation-errorBackground);
              border: 1px solid var(--vscode-inputValidation-errorBorder);
              padding: 10px;
              margin-bottom: 10px;
              border-radius: 4px;
            }
            .error-message button {
              background: var(--vscode-button-background);
              color: var(--vscode-button-foreground);
              border: none;
              padding: 6px 12px;
              border-radius: 2px;
              cursor: pointer;
              margin-top: 8px;
            }
            .error-message button:hover {
              background: var(--vscode-button-hoverBackground);
            }
          </style>
        </head>
        <body>
          <div id="chat-container">
            <div id="messages">
              ${welcomeMessage}
            </div>
            <div id="input-container">
              <textarea id="user-input" placeholder="Type your message..." ${errorMessage ? 'disabled' : ''}></textarea>
              <button id="send-button" ${errorMessage ? 'disabled' : ''}>Send</button>
            </div>
          </div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
  }

  private async validateProviderConfig(): Promise<string[]> {
    const errors: string[] = [];
    const config = vscode.workspace.getConfiguration('neuroforge');
    const providerId = config.get<string>('provider');

    if (!providerId) {
      errors.push('No AI provider selected. Please select a provider in the settings.');
      return errors;
    }

    try {
      const registry = getLLMProviderRegistry();
      const provider = registry.getProvider(providerId);
      const providerConfig = registry.getProviderSettings(providerId);

      // Check for required provider settings
      for (const setting of provider.settings) {
        if (setting.required && !providerConfig.get(setting.key)) {
          errors.push(`${setting.label} is required for ${provider.name}`);
        }
      }
    } catch (error) {
      errors.push(
        error instanceof Error ? error.message : 'Unknown error validating provider configuration'
      );
    }

    return errors;
  }

  private _setWebviewMessageListener(webview: vscode.Webview): void {
    webview.onDidReceiveMessage(
      async (message: { type: string; value: string }) => {
        switch (message.type) {
          case 'userInput':
            try {
              // Validate configuration before processing input
              const validationErrors = await this.validateProviderConfig();
              if (validationErrors.length > 0) {
                const configMessage = `To start using NeuroForge, please configure the following settings:

${validationErrors.join('\n')}

Would you like to configure these settings now?`;

                void webview.postMessage({
                  type: 'assistant',
                  value: configMessage,
                });

                const response = await vscode.window.showInformationMessage(
                  'Configure NeuroForge settings?',
                  'Configure Now',
                  'Later'
                );

                if (response === 'Configure Now') {
                  void vscode.commands.executeCommand('neuroforge.openSettings');
                }
                return;
              }

              // Process the message using AIService
              const aiResponse = await this.aiService.chat([
                {
                  role: 'system',
                  content:
                    'You are NeuroForge, an AI coding assistant. Help the user with their programming tasks.',
                },
                {
                  role: 'user',
                  content: message.value,
                },
              ]);

              void webview.postMessage({
                type: 'assistant',
                value: aiResponse,
              });
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : 'Unknown error occurred';
              void webview.postMessage({
                type: 'error',
                value: `Error: ${errorMessage}`,
              });

              // If it's a configuration error, prompt to open settings
              if (errorMessage.includes('API key') || errorMessage.includes('configuration')) {
                const response = await vscode.window.showErrorMessage(
                  `${errorMessage}. Would you like to configure the settings now?`,
                  'Configure Now',
                  'Later'
                );

                if (response === 'Configure Now') {
                  void vscode.commands.executeCommand('neuroforge.openSettings');
                }
              }
            }
            break;

          case 'openSettings':
            void vscode.commands.executeCommand('neuroforge.openSettings');
            break;

          case 'log':
            // Use console.warn for logging in development
            console.warn('NeuroForge Chat:', message.value);
            break;

          case 'error':
            console.error('NeuroForge Chat Error:', message.value);
            break;
        }
      },
      undefined,
      []
    );
  }

  private _getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
