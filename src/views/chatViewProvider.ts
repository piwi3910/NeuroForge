import * as vscode from 'vscode';

import { ConfigurationService } from '../services/configurationService';

export class ChatViewProvider implements vscode.WebviewViewProvider {
  private readonly configService: ConfigurationService;

  constructor(private readonly extensionUri: vscode.Uri) {
    this.configService = new ConfigurationService();
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
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link href="${styleUri}" rel="stylesheet">
          <title>NeuroForge Chat</title>
        </head>
        <body>
          <div id="chat-container">
            <div id="messages"></div>
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
            // Validate configuration before processing input
            const validationErrors = await this.configService.validateSettings();
            if (validationErrors.length > 0) {
              void webview.postMessage({
                type: 'error',
                value: 'Configuration error: ' + validationErrors.join('\n'),
              });
              return;
            }

            // TODO: Process user input and generate response
            void webview.postMessage({ type: 'response', value: 'Message received!' });
            break;

          case 'openSettings':
            // Replace chat view with settings
            await vscode.commands.executeCommand(
              'workbench.action.openSettings',
              '@ext:neuroforge'
            );
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
