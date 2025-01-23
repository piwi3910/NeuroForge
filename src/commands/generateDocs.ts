import * as vscode from 'vscode';

import { AIService } from '../services/aiService';
import { LanguageService } from '../services/languageService';

export class GenerateDocsCommand {
  private readonly languageService: LanguageService;
  private readonly aiService: AIService;

  constructor(languageService: LanguageService, aiService: AIService) {
    this.languageService = languageService;
    this.aiService = aiService;
  }

  /**
   * Registers the generate documentation command
   * @param context The extension context
   */
  public register(context: vscode.ExtensionContext): void {
    const disposable = vscode.commands.registerCommand('neuroforge.generateDocs', async () => {
      await this.execute();
    });
    context.subscriptions.push(disposable);
  }

  /**
   * Executes the generate documentation command
   */
  private async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('Please open a file to generate documentation.');
      return;
    }

    const selection = editor.selection;
    const code = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

    if (!code.trim()) {
      vscode.window.showWarningMessage('No code selected to document.');
      return;
    }

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Generating documentation...',
          cancellable: false,
        },
        async progress => {
          // Analyze code structure
          progress.report({ message: 'Analyzing code structure...' });
          const analysis = await this.languageService.analyzeCode(code);

          // Generate documentation
          progress.report({ message: 'Generating documentation...' });
          const documentation = await this.aiService.generateDocumentation(code, analysis);

          // Insert documentation above the selected code
          const position = selection.isEmpty ? new vscode.Position(0, 0) : selection.start;

          await editor.edit(editBuilder => {
            editBuilder.insert(position, this.formatDocumentation(documentation.content) + '\n');
          });

          vscode.window.showInformationMessage('Documentation generated successfully!');
        }
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to generate documentation: ${error}`);
    }
  }

  /**
   * Formats the documentation based on the file type
   * @param documentation The generated documentation
   * @returns Formatted documentation string
   */
  private formatDocumentation(documentation: string): string {
    const languageId = vscode.window.activeTextEditor?.document.languageId;

    switch (languageId) {
      case 'javascript':
      case 'typescript':
        return this.formatJSDoc(documentation);
      case 'python':
        return this.formatPythonDoc(documentation);
      case 'java':
        return this.formatJavaDoc(documentation);
      default:
        return this.formatGenericDoc(documentation);
    }
  }

  private formatJSDoc(documentation: string): string {
    return `/**\n${documentation
      .split('\n')
      .map(line => ` * ${line}`)
      .join('\n')}\n */`;
  }

  private formatPythonDoc(documentation: string): string {
    return `"""\n${documentation}\n"""`;
  }

  private formatJavaDoc(documentation: string): string {
    return `/**\n${documentation
      .split('\n')
      .map(line => ` * ${line}`)
      .join('\n')}\n */`;
  }

  private formatGenericDoc(documentation: string): string {
    return documentation
      .split('\n')
      .map(line => `// ${line}`)
      .join('\n');
  }
}
