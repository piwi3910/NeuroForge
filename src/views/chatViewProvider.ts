import * as vscode from 'vscode';
import { ConfigurationService } from '../services/configurationService';

export class ChatViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private configService: ConfigurationService;
    private isSettingsVisible: boolean = false;

    constructor(
        private readonly _extensionUri: vscode.Uri
    ) {
        this.configService = new ConfigurationService();
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        const styleUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'chat.css')
        );

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, styleUri);

        webviewView.webview.onDidReceiveMessage(async data => {
            switch (data.type) {
                case 'saveSettings':
                    await this.saveSettings(data.settings);
                    break;
                case 'sendMessage':
                    await this.handleMessage(data.message);
                    break;
            }
        });
    }

    public toggleSettings(): void {
        this.isSettingsVisible = !this.isSettingsVisible;
        if (this._view) {
            const styleUri = this._view.webview.asWebviewUri(
                vscode.Uri.joinPath(this._extensionUri, 'media', 'chat.css')
            );
            this._view.webview.html = this._getHtmlForWebview(this._view.webview, styleUri);
        }
    }

    private async saveSettings(settings: any) {
        try {
            await this.configService.updateConfiguration('provider', settings.provider);
            await this.configService.updateConfiguration('apiKey', settings.apiKey);
            await this.configService.updateConfiguration('maxTokens', settings.maxTokens);
            await this.configService.updateConfiguration('temperature', settings.temperature);
            
            this._view?.webview.postMessage({ type: 'settingsSaved' });
            vscode.window.showInformationMessage('Settings saved successfully');
            
            // Switch back to chat view after saving
            this.isSettingsVisible = false;
            if (this._view) {
                const styleUri = this._view.webview.asWebviewUri(
                    vscode.Uri.joinPath(this._extensionUri, 'media', 'chat.css')
                );
                this._view.webview.html = this._getHtmlForWebview(this._view.webview, styleUri);
            }
        } catch (error) {
            vscode.window.showErrorMessage('Failed to save settings: ' + error);
        }
    }

    private async handleMessage(message: string) {
        if (!this._view) return;

        // Add user message to chat
        this._view.webview.postMessage({
            type: 'addMessage',
            message,
            isUser: true
        });

        // TODO: Implement AI response handling
        // For now, just echo back
        this._view.webview.postMessage({
            type: 'addMessage',
            message: `Received: ${message}`,
            isUser: false
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview, styleUri: vscode.Uri) {
        const settings = this.configService.getAISettings();

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="${styleUri}">
        </head>
        <body>
            ${this.isSettingsVisible ? `
            <div class="settings-section">
                <div class="form-group">
                    <label for="provider">AI Provider</label>
                    <select id="provider">
                        <option value="anthropic" ${settings.provider === 'anthropic' ? 'selected' : ''}>Anthropic</option>
                        <option value="openai" ${settings.provider === 'openai' ? 'selected' : ''}>OpenAI</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="apiKey">API Key</label>
                    <input type="password" id="apiKey" value="${settings.apiKey}" />
                </div>
                <div class="form-group">
                    <label for="maxTokens">Max Tokens</label>
                    <input type="number" id="maxTokens" value="${settings.maxTokens}" />
                </div>
                <div class="form-group">
                    <label for="temperature">Temperature</label>
                    <input type="number" id="temperature" value="${settings.temperature}" step="0.1" min="0" max="1" />
                </div>
                <button onclick="saveSettings()">Save Settings</button>
                <div id="settings-status"></div>
            </div>
            ` : `
            <div class="chat-section">
                <div id="chat-messages"></div>
                <div class="chat-input-container">
                    <textarea id="chat-input" placeholder="Type your message..."></textarea>
                    <button class="send-button" onclick="sendMessage()">Send</button>
                </div>
            </div>
            `}

            <script>
                const vscode = acquireVsCodeApi();
                const messagesContainer = document.getElementById('chat-messages');
                const chatInput = document.getElementById('chat-input');

                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'settingsSaved':
                            const status = document.getElementById('settings-status');
                            if (status) {
                                status.className = 'success';
                                status.textContent = 'Settings saved successfully';
                                setTimeout(() => status.textContent = '', 3000);
                            }
                            break;
                        case 'addMessage':
                            if (messagesContainer) {
                                addMessageToChat(message.message, message.isUser);
                            }
                            break;
                    }
                });

                function saveSettings() {
                    const settings = {
                        provider: document.getElementById('provider').value,
                        apiKey: document.getElementById('apiKey').value,
                        maxTokens: parseInt(document.getElementById('maxTokens').value),
                        temperature: parseFloat(document.getElementById('temperature').value)
                    };

                    vscode.postMessage({
                        type: 'saveSettings',
                        settings: settings
                    });
                }

                function sendMessage() {
                    if (!chatInput) return;
                    const message = chatInput.value.trim();
                    if (message) {
                        vscode.postMessage({
                            type: 'sendMessage',
                            message: message
                        });
                        chatInput.value = '';
                    }
                }

                function addMessageToChat(text, isUser) {
                    if (!messagesContainer) return;
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message ' + (isUser ? 'user' : 'assistant');
                    messageDiv.textContent = text;
                    messagesContainer.appendChild(messageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }

                // Handle Enter key in textarea
                if (chatInput) {
                    chatInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    });
                }
            </script>
        </body>
        </html>`;
    }
}