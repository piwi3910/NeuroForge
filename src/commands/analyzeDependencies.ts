import * as vscode from 'vscode';

import { DependencyAnalyzer } from '../services/dependencyAnalyzer';
import { DependencyTreeProvider } from '../views/dependencyTreeProvider';

interface DependencyDetails {
  name: string;
  version: string;
  description?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

export async function analyzeDependencies(_context: vscode.ExtensionContext): Promise<void> {
  const analyzer = new DependencyAnalyzer();
  const treeDataProvider = new DependencyTreeProvider(analyzer);

  // Register the tree data provider
  void vscode.window.registerTreeDataProvider('dependencyExplorer', treeDataProvider);

  // Register the refresh command
  void vscode.commands.registerCommand('neuroforge.refreshDependencies', () => {
    treeDataProvider.refresh();
  });

  // Register the view details command
  void vscode.commands.registerCommand(
    'neuroforge.viewDependencyDetails',
    async (dependency: string) => {
      try {
        const details = await analyzer.getDependencyDetails(dependency);
        if (!details) {
          void vscode.window.showErrorMessage(`No details found for ${dependency}`);
          return;
        }

        const panel = vscode.window.createWebviewPanel(
          'dependencyDetails',
          `Dependency: ${dependency}`,
          vscode.ViewColumn.One,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          }
        );

        panel.webview.html = getDetailsWebviewContent(details);
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to load dependency details: ${error}`);
      }
    }
  );
}

function getDetailsWebviewContent(details: DependencyDetails): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dependency Details</title>
      <style>
        body {
          padding: 20px;
          font-family: var(--vscode-font-family);
          color: var(--vscode-editor-foreground);
          background-color: var(--vscode-editor-background);
        }
        .details-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .detail-item {
          margin-bottom: 20px;
        }
        .detail-label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .detail-value {
          padding: 10px;
          background-color: var(--vscode-input-background);
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="details-container">
        <h2>${details.name} v${details.version}</h2>
        <div class="detail-item">
          <div class="detail-label">Description</div>
          <div class="detail-value">${details.description || 'No description available'}</div>
        </div>
        ${
          details.dependencies
            ? `
        <div class="detail-item">
          <div class="detail-label">Dependencies</div>
          <div class="detail-value">
            <ul>
              ${Object.entries(details.dependencies)
                .map(([name, version]) => `<li>${name}: ${version}</li>`)
                .join('\n')}
            </ul>
          </div>
        </div>
        `
            : ''
        }
        ${
          details.devDependencies
            ? `
        <div class="detail-item">
          <div class="detail-label">Dev Dependencies</div>
          <div class="detail-value">
            <ul>
              ${Object.entries(details.devDependencies)
                .map(([name, version]) => `<li>${name}: ${version}</li>`)
                .join('\n')}
            </ul>
          </div>
        </div>
        `
            : ''
        }
      </div>
    </body>
    </html>
  `;
}
