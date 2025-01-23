import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export async function explainCode(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    void vscode.window.showWarningMessage('Please open a file to explain.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);

  if (!selectedText) {
    void vscode.window.showWarningMessage('Please select code to explain.');
    return;
  }

  const languageService = new LanguageService();
  const aiService = new AIService();

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Analyzing code...',
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Get code explanation
        const explanation = await aiService.explainCode(selectedText);
        const formattedExplanation = await languageService.formatCode(
          explanation.toString(),
          'markdown'
        );

        // Show explanation in new document
        const doc = await vscode.workspace.openTextDocument({
          content: formattedExplanation,
          language: 'markdown',
        });

        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to explain code: ${error}`);
      }
    }
  );
}
