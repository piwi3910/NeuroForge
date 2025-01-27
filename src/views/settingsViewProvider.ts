import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { ConfigurationService } from '../services/configurationService';
import { getLLMProviderRegistry } from '../services/llm/providerRegistry';

interface SettingsMessage {
  type: 'saveSettings' | 'backToChat' | 'providerChanged';
  value?: {
    provider: string;
    [key: string]: unknown;
  };
}

export class SettingsViewProvider implements vscode.WebviewViewProvider {
  private readonly configService: ConfigurationService;
  private readonly aiService: AIService;
  private currentWebview?: vscode.Webview;
  private initialized: boolean = false;

  constructor(private readonly extensionUri: vscode.Uri) {
    this.configService = new ConfigurationService();
    this.aiService = new AIService();
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Initialize the registry if not already initialized
      const registry = getLLMProviderRegistry();
      await registry.initialize();

      // Initialize the AI service
      await this.aiService.initialize();

      this.initialized = true;
    } catch (error) {
      throw new Error(
        `Failed to initialize settings view: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
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

    try {
      await this.initialize();
      this.currentWebview = webviewView.webview;
      webviewView.webview.html = await this._getHtmlForWebview(webviewView.webview);
      this._setWebviewMessageListener(webviewView.webview);

      // Handle webview disposal
      webviewView.onDidDispose(() => {
        this.currentWebview = undefined;
      });
    } catch (error) {
      // Show error in webview
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      webviewView.webview.html = this._getErrorHtml(webviewView.webview, errorMessage);
    }
  }

  private _getErrorHtml(webview: vscode.Webview, errorMessage: string): string {
    const nonce = this._getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' ${webview.cspSource}; style-src 'self' ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
          <style>
            body {
              padding: 20px;
              color: var(--vscode-errorForeground);
              font-family: var(--vscode-font-family);
            }
            .error-container {
              background-color: var(--vscode-inputValidation-errorBackground);
              border: 1px solid var(--vscode-inputValidation-errorBorder);
              padding: 15px;
              border-radius: 4px;
            }
            .error-title {
              font-weight: bold;
              margin-bottom: 10px;
            }
            .error-message {
              white-space: pre-wrap;
              word-break: break-word;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-title">Error Loading Settings</div>
            <div class="error-message">${errorMessage}</div>
          </div>
        </body>
      </html>`;
  }

  private async _getHtmlForWebview(webview: vscode.Webview): Promise<string> {
    if (!this.initialized) {
      throw new Error('Settings view not initialized');
    }

    const nonce = this._getNonce();
    const registry = getLLMProviderRegistry();
    const providers = await this.aiService.getAvailableProviders();
    const config = vscode.workspace.getConfiguration('neuroforge');
    const selectedProviderId = config.get<string>('provider') || registry.getDefaultProvider();

    // Get provider-specific settings
    const provider = registry.getProvider(selectedProviderId);
    const providerConfig = registry.getProviderSettings(selectedProviderId);

    // Note: Models are fetched but not used in the current implementation
    // They will be used in a future update for model-specific features
    await registry.getAvailableModels(selectedProviderId);

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
              margin-right: 8px;
            }
            button:hover {
              background: var(--vscode-button-hoverBackground);
            }
            .error {
              color: var(--vscode-errorForeground);
              margin-top: 5px;
            }
            .description {
              font-size: 0.9em;
              color: var(--vscode-descriptionForeground);
              margin-bottom: 5px;
            }
            #provider-settings {
              margin-top: 20px;
            }
            .loading {
              display: none;
              color: var(--vscode-textPreformat-foreground);
              font-style: italic;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="setting-group">
            <label class="setting-label" for="provider">AI Provider</label>
            <div class="description">Select the AI provider to use</div>
            <select id="provider">
              ${providers
                .map(
                  p => `
                <option value="${p.id}" ${p.id === selectedProviderId ? 'selected' : ''}>
                  ${p.name}
                </option>
              `
                )
                .join('')}
            </select>

            <div id="loading" class="loading">Loading provider settings...</div>
            <div id="provider-settings">
              ${provider.settings
                .map(
                  setting => `
                <div class="setting-group">
                  <label class="setting-label" for="${setting.key}">${setting.label}</label>
                  <div class="description">${setting.description}</div>
                  ${
                    setting.type === 'select'
                      ? `
                    <select id="${setting.key}" ${setting.required ? 'required' : ''}>
                      ${setting.options
                        ?.map(
                          opt => `
                        <option value="${opt.value}" ${
                          providerConfig.get(setting.key) === opt.value ? 'selected' : ''
                        }>
                          ${opt.label}
                        </option>
                      `
                        )
                        .join('')}
                    </select>
                  `
                      : setting.type === 'password'
                        ? `
                    <input type="password" id="${setting.key}" 
                      value="${providerConfig.get(setting.key) || ''}"
                      ${setting.required ? 'required' : ''}
                    />
                  `
                        : setting.type === 'number'
                          ? `
                    <input type="number" id="${setting.key}"
                      value="${providerConfig.get(setting.key) || setting.default || ''}"
                      ${setting.validation?.min !== undefined ? `min="${setting.validation.min}"` : ''}
                      ${setting.validation?.max !== undefined ? `max="${setting.validation.max}"` : ''}
                      ${setting.required ? 'required' : ''}
                    />
                  `
                          : `
                    <input type="text" id="${setting.key}"
                      value="${providerConfig.get(setting.key) || setting.default || ''}"
                      ${setting.required ? 'required' : ''}
                    />
                  `
                  }
                </div>
              `
                )
                .join('')}
            </div>

            <button id="saveButton">Save Settings</button>
            <button id="backButton">Back to Chat</button>
            <div id="error" class="error"></div>
          </div>

          <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
            let currentProvider = '${selectedProviderId}';
            
            // Handle provider change
            document.getElementById('provider').addEventListener('change', async (e) => {
              const newProvider = e.target.value;
              if (newProvider !== currentProvider) {
                currentProvider = newProvider;
                
                // Show loading state
                const loadingEl = document.getElementById('loading');
                const settingsEl = document.getElementById('provider-settings');
                loadingEl.style.display = 'block';
                settingsEl.style.display = 'none';

                vscode.postMessage({
                  type: 'providerChanged',
                  value: { provider: newProvider }
                });
              }
            });

            // Handle save
            document.getElementById('saveButton').addEventListener('click', () => {
              const settings = {
                provider: document.getElementById('provider').value,
              };

              // Add provider-specific settings
              const settingsEl = document.getElementById('provider-settings');
              const inputs = settingsEl.querySelectorAll('input, select');
              inputs.forEach(input => {
                const value = input.type === 'number' ? Number(input.value) : input.value;
                settings[input.id] = value;
              });

              vscode.postMessage({
                type: 'saveSettings',
                value: settings
              });
            });

            // Handle back button
            document.getElementById('backButton').addEventListener('click', () => {
              vscode.postMessage({ type: 'backToChat' });
            });

            // Handle messages from extension
            window.addEventListener('message', event => {
              const message = event.data;
              switch (message.type) {
                case 'error':
                  document.getElementById('error').textContent = message.value;
                  break;
                case 'providerSettings':
                  const loadingEl = document.getElementById('loading');
                  const settingsEl = document.getElementById('provider-settings');
                  settingsEl.innerHTML = message.value;
                  loadingEl.style.display = 'none';
                  settingsEl.style.display = 'block';
                  break;
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
                const { provider, ...settings } = message.value;

                // Update global provider setting
                await this.configService.updateSetting('provider', provider);

                // Update provider-specific settings
                const registry = getLLMProviderRegistry();
                const providerInstance = registry.getProvider(provider);

                for (const setting of providerInstance.settings) {
                  const value = settings[setting.key];
                  if (value !== undefined) {
                    await this.configService.updateSetting(
                      setting.key,
                      value,
                      vscode.ConfigurationTarget.Global,
                      provider
                    );
                  }
                }

                // Validate the new configuration
                const errors = await registry.validateProviderConfig(provider);
                if (errors.length > 0) {
                  void webview.postMessage({
                    type: 'error',
                    value: `Configuration errors:\n${errors.join('\n')}`,
                  });
                  return;
                }

                // Switch back to chat view
                await vscode.commands.executeCommand('neuroforge.backToChat');
              }
            } catch (error) {
              void webview.postMessage({
                type: 'error',
                value: `Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}`,
              });
            }
            break;

          case 'providerChanged':
            if (message.value?.provider) {
              try {
                // Update the provider setting immediately
                await this.configService.updateSetting('provider', message.value.provider);

                // Get the new provider's settings HTML
                const registry = getLLMProviderRegistry();
                const provider = registry.getProvider(message.value.provider);
                const providerConfig = registry.getProviderSettings(message.value.provider);

                const settingsHtml = provider.settings
                  .map(
                    setting => `
                  <div class="setting-group">
                    <label class="setting-label" for="${setting.key}">${setting.label}</label>
                    <div class="description">${setting.description}</div>
                    ${
                      setting.type === 'select'
                        ? `
                      <select id="${setting.key}" ${setting.required ? 'required' : ''}>
                        ${setting.options
                          ?.map(
                            opt => `
                          <option value="${opt.value}" ${
                            providerConfig.get(setting.key) === opt.value ? 'selected' : ''
                          }>
                            ${opt.label}
                          </option>
                        `
                          )
                          .join('')}
                      </select>
                    `
                        : setting.type === 'password'
                          ? `
                      <input type="password" id="${setting.key}" 
                        value="${providerConfig.get(setting.key) || ''}"
                        ${setting.required ? 'required' : ''}
                      />
                    `
                          : setting.type === 'number'
                            ? `
                      <input type="number" id="${setting.key}"
                        value="${providerConfig.get(setting.key) || setting.default || ''}"
                        ${setting.validation?.min !== undefined ? `min="${setting.validation.min}"` : ''}
                        ${setting.validation?.max !== undefined ? `max="${setting.validation.max}"` : ''}
                        ${setting.required ? 'required' : ''}
                      />
                    `
                            : `
                      <input type="text" id="${setting.key}"
                        value="${providerConfig.get(setting.key) || setting.default || ''}"
                        ${setting.required ? 'required' : ''}
                      />
                    `
                    }
                  </div>
                `
                  )
                  .join('');

                // Send the new settings HTML to the webview
                void webview.postMessage({
                  type: 'providerSettings',
                  value: settingsHtml,
                });
              } catch (error) {
                void webview.postMessage({
                  type: 'error',
                  value: `Failed to change provider: ${error instanceof Error ? error.message : 'Unknown error'}`,
                });
              }
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
