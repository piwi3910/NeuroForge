import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export async function suggestRefactor(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    void vscode.window.showWarningMessage('Please open a file to suggest refactoring for.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);

  if (!selectedText) {
    void vscode.window.showWarningMessage('Please select code to suggest refactoring for.');
    return;
  }

  const languageService = new LanguageService();
  const aiService = new AIService();

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Analyzing code and suggesting refactoring...',
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Get refactoring suggestions
        const suggestions = await aiService.suggestRefactoring(selectedText);
        const formattedSuggestions = await languageService.formatCode(
          suggestions.toString(),
          'markdown'
        );

        // Show suggestions in new document
        const doc = await vscode.workspace.openTextDocument({
          content: formattedSuggestions,
          language: 'markdown',
        });

        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });

        // Ask if user wants to apply the suggested refactoring
        const applyChanges = await vscode.window.showInformationMessage(
          'Would you like to apply the suggested refactoring?',
          'Apply',
          'Cancel'
        );

        if (applyChanges === 'Apply') {
          // Get the refactored code
          const refactoredCode = await aiService.suggestRefactoring(selectedText);

          // Format the refactored code
          const formattedCode = await languageService.formatCode(
            refactoredCode.toString(),
            document.languageId
          );

          // Apply the changes
          await editor.edit(editBuilder => {
            editBuilder.replace(selection, formattedCode);
          });
        }

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to suggest refactoring: ${error}`);
      }
    }
  );
}
