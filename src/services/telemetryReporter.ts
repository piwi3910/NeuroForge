import * as vscode from 'vscode';

export class TelemetryReporter {
  private enabled: boolean;
  private readonly metadata: { [key: string]: string };

  constructor(extensionId: string, extensionVersion: string) {
    this.enabled = vscode.workspace.getConfiguration('neuroforge').get('telemetry.enabled', true);

    this.metadata = {
      extensionId,
      extensionVersion,
      vscodeVersion: vscode.version,
      platform: process.platform,
    };

    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('neuroforge.telemetry.enabled')) {
        this.enabled = vscode.workspace
          .getConfiguration('neuroforge')
          .get('telemetry.enabled', true);
      }
    });
  }

  public sendError(error: Error, properties?: Record<string, string>): void {
    if (!this.enabled) {
      return;
    }

    const errorData = {
      ...this.metadata,
      ...properties,
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };

    // Use VSCode's built-in error reporting
    void vscode.window.showErrorMessage(`NeuroForge Error: ${error.message}`);

    // TODO: Implement proper error telemetry
    console.error('Telemetry Error:', errorData);
  }

  public sendEvent(eventName: string, properties?: Record<string, string>): void {
    if (!this.enabled) {
      return;
    }

    const eventData = {
      ...this.metadata,
      ...properties,
      eventName,
      timestamp: new Date().toISOString(),
    };

    // TODO: Implement proper event telemetry
    if (eventName.includes('error') || eventName.includes('failure')) {
      console.error('Telemetry Event:', eventData);
    } else {
      console.warn('Telemetry Event:', eventData);
    }
  }

  public dispose(): void {
    // Clean up any resources if needed
    this.sendEvent('extension.disposed');
  }
}
