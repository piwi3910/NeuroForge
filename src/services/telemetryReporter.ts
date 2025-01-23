import * as vscode from 'vscode';

export class TelemetryReporter {
  private readonly extensionId: string;
  private readonly extensionVersion: string;
  private enabled: boolean;

  constructor(extensionId: string, extensionVersion: string) {
    this.extensionId = extensionId;
    this.extensionVersion = extensionVersion;
    this.enabled = vscode.workspace.getConfiguration('neuroforge').get('telemetry.enabled', true);

    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('neuroforge.telemetry.enabled')) {
        this.enabled = vscode.workspace
          .getConfiguration('neuroforge')
          .get('telemetry.enabled', true);
      }
    });
  }

  public sendError(error: Error, _properties?: Record<string, string>): void {
    if (!this.enabled) {
      return;
    }

    // Use VSCode's built-in error reporting
    void vscode.window.showErrorMessage(`NeuroForge Error: ${error.message}`);
  }

  public sendEvent(eventName: string, _properties?: Record<string, string>): void {
    if (!this.enabled) {
      return;
    }

    // TODO: Implement proper telemetry reporting
    // For now, we'll just log errors to help with debugging
    if (eventName.includes('error') || eventName.includes('failure')) {
      void vscode.window.showErrorMessage(`NeuroForge Event: ${eventName}`);
    }
  }

  public dispose(): void {
    // Clean up any resources if needed
  }
}
