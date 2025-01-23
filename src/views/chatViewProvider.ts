import * as vscode from 'vscode';
import { AIService } from '../services/aiService';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export class ChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'neuroforge.chatView';
    private _view?: vscode.WebviewView;
    private messages: ChatMessage[] = [];

    constructor(
        private readonly extensionUri: vscode.Uri,
        private readonly aiService: AIService
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'sendMessage':
                    await this._handleUserMessage(data.message);
                    break;
                case 'openSettings':
                    await vscode.commands.executeCommand('neuroforge.openSettings');
                    break;
            }
        });
    }

    private async _handleUserMessage(message: string) {
        // Add user message
        this.messages.push({
            role: 'user',
            content: message,
            timestamp: Date.now()
        });

        this._view?.webview.postMessage({
            type: 'addMessage',
            message: {
                role: 'user',
                content: message,
                timestamp: Date.now()
            }
        });

        // Show typing indicator
        this._view?.webview.postMessage({ type: 'showTyping' });

        try {
            // Get AI response
            const response = await this.aiService.generateResponse(message);

            // Add AI message
            this.messages.push({
                role: 'assistant',
                content: response.content,
                timestamp: Date.now()
            });

            // Hide typing indicator and show response
            this._view?.webview.postMessage({ type: 'hideTyping' });
            this._view?.webview.postMessage({
                type: 'addMessage',
                message: {
                    role: 'assistant',
                    content: response.content,
                    timestamp: Date.now()
                }
            });
        } catch (error) {
            this._view?.webview.postMessage({ type: 'hideTyping' });
            vscode.window.showErrorMessage(`Failed to get AI response: ${error}`);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.js')
        );
        const styleUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.css')
        );

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${styleUri}" rel="stylesheet">
            <title>NeuroForge Chat</title>
        </head>
        <body>
            <div class="chat-container">
                <div class="chat-header">
                    <div class="title">NeuroForge Chat</div>
                    <button class="settings-button" onclick="openSettings()">
                        <i class="codicon codicon-gear"></i>
                    </button>
                </div>
                <div class="messages" id="messages"></div>
                <div class="typing-indicator hidden" id="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="input-container">
                    <textarea
                        id="messageInput"
                        placeholder="Type a message..."
                        rows="1"
                    ></textarea>
                    <button id="sendButton">
                        <i class="codicon codicon-send"></i>
                    </button>
                </div>
            </div>
            <script src="${scriptUri}"></script>
        </body>
        </html>`;
    }
}