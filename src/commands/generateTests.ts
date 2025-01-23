import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

interface TestFramework {
  name: string;
  filePattern: string;
  setupCode: string;
}

type CoverageType = 'unit' | 'integration' | 'both';

const TEST_FRAMEWORKS: Record<string, TestFramework> = {
  jest: {
    name: 'Jest',
    filePattern: '.test.ts',
    setupCode: `import { describe, it, expect } from '@jest/globals';\n\n`,
  },
  mocha: {
    name: 'Mocha',
    filePattern: '.spec.ts',
    setupCode: `import { describe, it } from 'mocha';\nimport { expect } from 'chai';\n\n`,
  },
};

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

  // Get test framework preference
  const framework = await vscode.window.showQuickPick(
    Object.values(TEST_FRAMEWORKS).map(f => f.name),
    {
      placeHolder: 'Select test framework',
    }
  );

  if (!framework) {
    return;
  }

  const selectedFramework = Object.values(TEST_FRAMEWORKS).find(f => f.name === framework);
  if (!selectedFramework) {
    void vscode.window.showErrorMessage('Invalid test framework selected.');
    return;
  }

  // Get test coverage preference
  const coverageOptions: CoverageType[] = ['unit', 'integration', 'both'];
  const coverage = await vscode.window.showQuickPick(coverageOptions, {
    placeHolder: 'Select test coverage type',
  });

  if (!coverage) {
    return;
  }

  // Show progress indicator
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Generating ${coverage} tests...`,
      cancellable: false,
    },
    async progress => {
      try {
        progress.report({ increment: 0 });

        // Generate test code
        const testCode = await aiService.generateTests(selectedText);
        const formattedCode = await languageService.formatCode(
          selectedFramework.setupCode + testCode.toString(),
          'typescript'
        );

        // Create test file
        const sourceFile = document.uri;
        const testFile = sourceFile.with({
          path: sourceFile.path.replace(/\.[^.]+$/, selectedFramework.filePattern),
        });

        // Create and show the test file
        const edit = new vscode.WorkspaceEdit();
        edit.createFile(testFile, { overwrite: true });
        edit.insert(testFile, new vscode.Position(0, 0), formattedCode);
        await vscode.workspace.applyEdit(edit);

        // Open the test file
        const doc = await vscode.workspace.openTextDocument(testFile);
        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });

        progress.report({ increment: 100 });
      } catch (error) {
        void vscode.window.showErrorMessage(`Failed to generate tests: ${error}`);
      }
    }
  );
}
