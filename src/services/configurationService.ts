import * as vscode from 'vscode';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

interface NeuroForgeConfig {
  provider: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
}

export class ConfigurationService {
  private readonly config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration('neuroforge');
  }

  public getConfig(): NeuroForgeConfig {
    return {
      provider: this.config.get('provider', 'anthropic'),
      apiKey: this.config.get('apiKey', ''),
      maxTokens: this.config.get('maxTokens', 8192),
      temperature: this.config.get('temperature', 0.7),
    };
  }

  public async validateSettings(): Promise<string[]> {
    const errors: string[] = [];
    const config = this.getConfig();

    // Validate provider
    const validProviders = ['anthropic', 'openai'];
    if (!validProviders.includes(config.provider)) {
      errors.push(
        `Invalid provider: ${config.provider}. Must be one of: ${validProviders.join(', ')}`
      );
    }

    // Validate API key
    if (!config.apiKey) {
      errors.push('API key is required');
    }

    // Validate max tokens
    if (config.maxTokens < 1 || config.maxTokens > 32768) {
      errors.push('Max tokens must be between 1 and 32768');
    }

    // Validate temperature
    if (config.temperature < 0 || config.temperature > 1) {
      errors.push('Temperature must be between 0 and 1');
    }

    return errors;
  }

  public async updateSetting<T extends keyof NeuroForgeConfig>(
    key: T,
    value: NeuroForgeConfig[T]
  ): Promise<ValidationResult> {
    try {
      await this.config.update(key, value, vscode.ConfigurationTarget.Global);
      const errors = await this.validateSettings();

      if (errors.length > 0) {
        return {
          isValid: false,
          message: errors.join('\n'),
        };
      }

      return {
        isValid: true,
        message: `Successfully updated ${key}`,
      };
    } catch (error) {
      return {
        isValid: false,
        message: `Failed to update ${key}: ${error}`,
      };
    }
  }
}
