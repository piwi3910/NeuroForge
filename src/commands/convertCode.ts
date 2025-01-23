import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export async function convertCode(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    void vscode.window.showWarningMessage('Please open a file to convert code.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);

  if (!selectedText) {
    void vscode.window.showWarningMessage('Please select code to convert.');
    return;
  }

  const languageService = new LanguageService();
  const aiService = new AIService();

  // Get target language
  const languages = languageService.getSupportedLanguages();
  const targetLanguage = await vscode.window.showQuickPick(languages, {
    placeHolder: 'Select target language',
  });

  if (!targetLanguage) {
    return;
  }

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Converting code...',
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Get the converted code
        const convertedCode = await aiService.convertCode(selectedText, targetLanguage);

        // Format the converted code
        const formattedCode = await languageService.formatCode(
          convertedCode.toString(),
          targetLanguage.toLowerCase()
        );

        // Create new document with converted code
        const doc = await vscode.workspace.openTextDocument({
          content: formattedCode,
          language: targetLanguage.toLowerCase(),
        });

        // Show the new document
        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to convert code: ${error}`);
      }
    }
  );
}
