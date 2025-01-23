import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { ConfigurationService } from '../services/configurationService';

export class ChatViewProvider implements vscode.WebviewViewProvider {
  private readonly configService: ConfigurationService;
  private readonly aiService: AIService;

  constructor(private readonly extensionUri: vscode.Uri) {
    this.configService = new ConfigurationService();
    this.aiService = new AIService();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    this._setWebviewMessageListener(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.js')
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.css')
    );

    const nonce = this._getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' ${webview.cspSource}; style-src 'self' ${webview.cspSource}; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src 'self' ${webview.cspSource} https:; font-src 'self' ${webview.cspSource};">
          <link href="${styleUri}" rel="stylesheet">
          <title>NeuroForge Chat</title>
        </head>
        <body>
          <div id="chat-container">
            <div id="messages">
              <div class="message assistant-message">Welcome to NeuroForge! I'm your AI coding assistant. How can I help you today?</div>
            </div>
            <div id="input-container">
              <textarea id="user-input" placeholder="Type your message..."></textarea>
              <button id="send-button">Send</button>
            </div>
          </div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
  }

  private _setWebviewMessageListener(webview: vscode.Webview): void {
    webview.onDidReceiveMessage(
      async (message: { type: string; value: string }) => {
        switch (message.type) {
          case 'userInput':
            try {
              // Validate configuration before processing input
              const validationErrors = await this.configService.validateSettings();
              if (validationErrors.length > 0) {
                const configMessage = `To start using NeuroForge, please configure the following settings:\n\n${validationErrors.join('\n')}\n\nWould you like to configure these settings now?`;

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
              void webview.postMessage({
                type: 'error',
                value: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
              });
            }
            break;

          case 'openSettings':
            await vscode.commands.executeCommand(
              'workbench.action.openSettings',
              '@ext:neuroforge'
            );
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
