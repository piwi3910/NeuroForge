import * as vscode from 'vscode';

export class ConfigurationService {
  private readonly configPrefix = 'neuroforge';

  public getConfiguration(section?: string): vscode.WorkspaceConfiguration {
    return section
      ? vscode.workspace.getConfiguration(`${this.configPrefix}.${section}`)
      : vscode.workspace.getConfiguration(this.configPrefix);
  }

  public async validateSettings(): Promise<string[]> {
    const errors: string[] = [];
    const config = this.getConfiguration();

    // Check provider
    const provider = config.get<string>('provider');
    if (!provider) {
      errors.push('AI provider is not configured');
    }

    return errors;
  }

  public async updateSetting<T>(
    key: string,
    value: T,
    target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global,
    section?: string
  ): Promise<void> {
    const config = this.getConfiguration(section);
    await config.update(key, value, target);
  }

  public async resetSettings(
    target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global
  ): Promise<void> {
    const config = this.getConfiguration();
    const keys = ['provider', 'hasShownWelcome', 'telemetry.enabled'];

    for (const key of keys) {
      await config.update(key, undefined, target);
    }
  }

  public getDefaultSettings(): Record<string, unknown> {
    return {
      provider: '',
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
