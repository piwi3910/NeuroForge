import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export async function generateDocs(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    void vscode.window.showWarningMessage('Please open a file to generate documentation for.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);

  if (!selectedText) {
    void vscode.window.showWarningMessage('Please select code to generate documentation for.');
    return;
  }

  const languageService = new LanguageService();
  const aiService = new AIService();

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Generating documentation...',
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Generate documentation
        const docs = await aiService.generateDocs(selectedText);
        const formattedDocs = await languageService.formatCode(docs.toString(), 'markdown');

        // Show documentation in new document
        const doc = await vscode.workspace.openTextDocument({
          content: formattedDocs,
          language: 'markdown',
        });

        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to generate documentation: ${error}`);
      }
    }
  );
}
