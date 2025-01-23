import * as vscode from 'vscode';

export class ConfigurationService {
  private readonly configPrefix = 'neuroforge';

  public getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(this.configPrefix);
  }

  public async validateSettings(): Promise<string[]> {
    const errors: string[] = [];
    const config = this.getConfiguration();

    // Check API key
    const apiKey = config.get<string>('apiKey');
    if (!apiKey) {
      errors.push('API key is not configured. Please set neuroforge.apiKey in settings.');
    }

    // Check provider
    const provider = config.get<string>('provider');
    const validProviders = ['anthropic', 'openai'];
    if (!provider || !validProviders.includes(provider)) {
      errors.push(`Invalid provider: ${provider}. Must be one of: ${validProviders.join(', ')}`);
    }

    // Check max tokens
    const maxTokens = config.get<number>('maxTokens', 8192);
    if (maxTokens < 1 || maxTokens > 32000) {
      errors.push('maxTokens must be between 1 and 32000');
    }

    // Check temperature
    const temperature = config.get<number>('temperature', 0.7);
    if (temperature < 0 || temperature > 1) {
      errors.push('temperature must be between 0 and 1');
    }

    return errors;
  }

  public async updateSetting<T>(
    key: string,
    value: T,
    target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global
  ): Promise<void> {
    const config = this.getConfiguration();
    await config.update(key, value, target);
  }

  public async resetSettings(
    target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global
  ): Promise<void> {
    const config = this.getConfiguration();
    const keys = [
      'apiKey',
      'provider',
      'maxTokens',
      'temperature',
      'hasShownWelcome',
      'telemetry.enabled',
    ];

    for (const key of keys) {
      await config.update(key, undefined, target);
    }
  }

  public getDefaultSettings(): Record<string, unknown> {
    return {
      apiKey: '',
      provider: 'anthropic',
      maxTokens: 8192,
      temperature: 0.7,
      hasShownWelcome: false,
      'telemetry.enabled': true,
    };
  }

  public async migrateSettings(oldVersion: string, newVersion: string): Promise<void> {
    // Add migration logic here when needed
    void vscode.window.showInformationMessage(
      `Migrating settings from ${oldVersion} to ${newVersion}`
    );
  }
}
