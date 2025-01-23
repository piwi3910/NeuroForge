import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export async function generateTests(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    void vscode.window.showWarningMessage('Please open a file to generate tests for.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);

  if (!selectedText) {
    void vscode.window.showWarningMessage('Please select code to generate tests for.');
    return;
  }

  const languageService = new LanguageService();
  const aiService = new AIService();

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Generating tests...',
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Get test code
        const tests = await aiService.generateTests(selectedText);
        const formattedTests = await languageService.formatCode(
          tests.toString(),
          document.languageId
        );

        // Create test file
        const testFilePath = document.uri.fsPath.replace(/\.(ts|js|tsx|jsx)$/, '.test.$1');
        const testUri = vscode.Uri.file(testFilePath);

        try {
          await vscode.workspace.fs.stat(testUri);
          // File exists, show in new tab
          const doc = await vscode.workspace.openTextDocument(testUri);
          await vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        } catch {
          // File doesn't exist, create new one
          const doc = await vscode.workspace.openTextDocument({
            content: formattedTests,
            language: document.languageId,
          });
          await vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        }

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to generate tests: ${error}`);
      }
    }
  );
}
