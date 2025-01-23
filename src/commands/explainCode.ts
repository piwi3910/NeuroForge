import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export class ExplainCodeCommand {
  private readonly languageService: LanguageService;
  private readonly aiService: AIService;

  constructor(languageService: LanguageService, aiService: AIService) {
    this.languageService = languageService;
    this.aiService = aiService;
  }

  /**
   * Registers the explain code command
   * @param context The extension context
   */
  public register(context: vscode.ExtensionContext): void {
    const disposable = vscode.commands.registerCommand('neuroforge.explainCode', async () => {
      await this.execute();
    });
    context.subscriptions.push(disposable);
  }

  /**
   * Executes the explain code command
   */
  private async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('Please open a file to explain code.');
      return;
    }

    const selection = editor.selection;
    const code = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

    if (!code.trim()) {
      vscode.window.showWarningMessage('No code selected to explain.');
      return;
    }

    try {
      // Show progress indicator
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Analyzing code...',
          cancellable: false,
        },
        async progress => {
          // Analyze code structure
          progress.report({ message: 'Analyzing code structure...' });
          const analysis = await this.languageService.analyzeCode(code);

          // Generate explanation
          progress.report({ message: 'Generating explanation...' });
          const explanation = await this.aiService.explainCode(code, analysis);

          // Show results in a new editor
          const document = await vscode.workspace.openTextDocument({
            content: this.formatExplanation(code, explanation.content),
            language: 'markdown',
          });

          await vscode.window.showTextDocument(document, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        }
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to explain code: ${error}`);
    }
  }

  /**
   * Formats the explanation with the original code
   * @param code Original code
   * @param explanation Generated explanation
   * @returns Formatted markdown text
   */
  private formatExplanation(code: string, explanation: string): string {
    return `# Code Explanation

## Original Code
\`\`\`
${code}
\`\`\`

## Explanation
${explanation}

---
Generated by NeuroForge
`;
  }
}
