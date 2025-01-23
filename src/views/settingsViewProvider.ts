import * as vscode from 'vscode';

import { ConfigurationService } from '../services/configurationService';

interface SettingsMessage {
  type: 'saveSettings' | 'backToChat';
  value?: {
    provider: string;
    apiKey: string;
    maxTokens: number;
    temperature: number;
  };
}

export class SettingsViewProvider implements vscode.WebviewViewProvider {
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
    const nonce = this._getNonce();
    const config = vscode.workspace.getConfiguration('neuroforge');

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' ${webview.cspSource}; style-src 'self' ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
          <style>
            body {
              padding: 10px;
              color: var(--vscode-foreground);
              font-family: var(--vscode-font-family);
            }
            .setting-group {
              margin-bottom: 20px;
            }
            .setting-label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
            }
            input, select {
              width: 100%;
              padding: 5px;
              margin-bottom: 10px;
              background: var(--vscode-input-background);
              color: var(--vscode-input-foreground);
              border: 1px solid var(--vscode-input-border);
              border-radius: 2px;
            }
            button {
              background: var(--vscode-button-background);
              color: var(--vscode-button-foreground);
              border: none;
              padding: 8px 12px;
              cursor: pointer;
              border-radius: 2px;
            }
            button:hover {
              background: var(--vscode-button-hoverBackground);
            }
            .error {
              color: var(--vscode-errorForeground);
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="setting-group">
            <label class="setting-label" for="provider">AI Provider</label>
            <select id="provider">
              <option value="anthropic" ${config.get('provider') === 'anthropic' ? 'selected' : ''}>Anthropic</option>
              <option value="openai" ${config.get('provider') === 'openai' ? 'selected' : ''}>OpenAI</option>
            </select>

            <label class="setting-label" for="apiKey">API Key</label>
            <input type="password" id="apiKey" value="${config.get('apiKey') || ''}" />

            <label class="setting-label" for="maxTokens">Max Tokens</label>
            <input type="number" id="maxTokens" value="${config.get('maxTokens') || 8192}" min="1" max="32000" />

            <label class="setting-label" for="temperature">Temperature</label>
            <input type="number" id="temperature" value="${config.get('temperature') || 0.7}" min="0" max="1" step="0.1" />

            <button id="saveButton">Save Settings</button>
            <button id="backButton">Back to Chat</button>
            <div id="error" class="error"></div>
          </div>

          <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
            
            document.getElementById('saveButton').addEventListener('click', () => {
              const settings = {
                provider: document.getElementById('provider').value,
                apiKey: document.getElementById('apiKey').value,
                maxTokens: parseInt(document.getElementById('maxTokens').value),
                temperature: parseFloat(document.getElementById('temperature').value)
              };

              vscode.postMessage({ type: 'saveSettings', value: settings });
            });

            document.getElementById('backButton').addEventListener('click', () => {
              vscode.postMessage({ type: 'backToChat' });
            });

            window.addEventListener('message', event => {
              const message = event.data;
              if (message.type === 'error') {
                document.getElementById('error').textContent = message.value;
              }
            });
          </script>
        </body>
      </html>`;
  }

  private _setWebviewMessageListener(webview: vscode.Webview): void {
    webview.onDidReceiveMessage(
      async (message: SettingsMessage) => {
        switch (message.type) {
          case 'saveSettings':
            try {
              if (message.value) {
                const settings = message.value;
                await this.configService.updateSetting('provider', settings.provider);
                await this.configService.updateSetting('apiKey', settings.apiKey);
                await this.configService.updateSetting('maxTokens', settings.maxTokens);
                await this.configService.updateSetting('temperature', settings.temperature);

                // Switch back to chat view after saving
                await vscode.commands.executeCommand('neuroforge.backToChat');
              }
            } catch (error) {
              void webview.postMessage({
                type: 'error',
                value: `Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}`,
              });
            }
            break;

          case 'backToChat':
            void vscode.commands.executeCommand('neuroforge.backToChat');
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
