import * as vscode from 'vscode';

export interface AutoApproveSettings {
    readOperations: boolean;
    writeOperations: boolean;
    browserActions: boolean;
    retryFailedRequests: boolean;
}

export interface AIProviderSettings {
    provider: 'anthropic' | 'openai' | 'local';
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
    useCustomBaseUrl: boolean;
    customBaseUrl?: string;
}

export class ConfigurationService {
    private readonly configPrefix = 'neuroforge';

    public getConfiguration<T>(section: string): T {
        return vscode.workspace.getConfiguration(this.configPrefix).get<T>(section)!;
    }

    public async updateConfiguration(section: string, value: any, target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global): Promise<void> {
        await vscode.workspace.getConfiguration(this.configPrefix).update(section, value, target);
    }

    public getAISettings(): AIProviderSettings {
        const config = vscode.workspace.getConfiguration(this.configPrefix);
        return {
            provider: config.get('provider', 'anthropic'),
            apiKey: config.get('apiKey', ''),
            model: config.get('model', 'claude-3-sonnet-20240229'),
            maxTokens: config.get('maxTokens', 8192),
            temperature: config.get('temperature', 0.7),
            useCustomBaseUrl: config.get('useCustomBaseUrl', false),
            customBaseUrl: config.get('customBaseUrl', '')
        };
    }

    public getAutoApproveSettings(): AutoApproveSettings {
        const config = vscode.workspace.getConfiguration(this.configPrefix);
        const autoApprove = config.get<any>('autoApprove', {});
        return {
            readOperations: autoApprove.readOperations ?? false,
            writeOperations: autoApprove.writeOperations ?? false,
            browserActions: autoApprove.browserActions ?? false,
            retryFailedRequests: autoApprove.retryFailedRequests ?? true
        };
    }

    public async validateSettings(): Promise<string[]> {
        const errors: string[] = [];
        const settings = this.getAISettings();

        if (!settings.apiKey && settings.provider !== 'local') {
            errors.push('API key is required for the selected provider');
        }

        if (settings.maxTokens < 1) {
            errors.push('Max tokens must be greater than 0');
        }

        if (settings.temperature < 0 || settings.temperature > 1) {
            errors.push('Temperature must be between 0 and 1');
        }

        if (settings.useCustomBaseUrl && !settings.customBaseUrl) {
            errors.push('Custom base URL is required when using custom URL option');
        }

        return errors;
    }
}