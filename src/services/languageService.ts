import * as vscode from 'vscode';

export class LanguageService {
  private readonly supportedLanguages = [
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
  ];

  public getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  public getLanguageId(_code: string): string {
    // TODO: Implement language detection
    return 'typescript';
  }

  public async formatCode(code: string, language: string): Promise<string> {
    try {
      const doc = await vscode.workspace.openTextDocument({
        content: code,
        language: language.toLowerCase(),
      });

      const edits = await vscode.commands.executeCommand<vscode.TextEdit[]>(
        'vscode.executeFormatDocumentProvider',
        doc.uri,
        {
          insertSpaces: true,
          tabSize: 2,
        }
      );

      if (!edits) {
        return code;
      }

      // Apply the edits to get the formatted code
      let formattedCode = code;
      edits
        .sort((a, b) => b.range.start.line - a.range.start.line)
        .forEach(edit => {
          const start = doc.offsetAt(edit.range.start);
          const end = doc.offsetAt(edit.range.end);
          formattedCode =
            formattedCode.substring(0, start) + edit.newText + formattedCode.substring(end);
        });

      return formattedCode;
    } catch (error) {
      throw new Error(`Failed to format code: ${error}`);
    }
  }
}
