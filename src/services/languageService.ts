import * as vscode from 'vscode';

export class LanguageService {
  private readonly supportedLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cpp',
    'go',
    'rust',
    'ruby',
    'php',
    'swift',
    'kotlin',
    'scala',
    'html',
    'css',
    'sql',
    'markdown',
  ];

  public getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  public async formatCode(code: string, language: string): Promise<string> {
    try {
      // Get document formatting options from VSCode settings
      const config = vscode.workspace.getConfiguration('editor', { languageId: language });
      const tabSize = config.get<number>('tabSize', 2);
      const insertSpaces = config.get<boolean>('insertSpaces', true);

      // Create a temporary document to use VSCode's formatting
      const tempDoc = await vscode.workspace.openTextDocument({
        content: code,
        language,
      });

      // Format the document
      const edits = await vscode.commands.executeCommand<vscode.TextEdit[]>(
        'vscode.executeFormatDocumentProvider',
        tempDoc.uri
      );

      if (edits && edits.length > 0) {
        // Apply formatting edits
        const workspaceEdit = new vscode.WorkspaceEdit();
        workspaceEdit.set(tempDoc.uri, edits);
        await vscode.workspace.applyEdit(workspaceEdit);
        return tempDoc.getText();
      }

      // If no formatting provider available, do basic indentation
      return this.basicFormatting(code, tabSize, insertSpaces);
    } catch (error) {
      console.error('Error formatting code:', error);
      // Fall back to basic formatting
      return this.basicFormatting(code, 2, true);
    }
  }

  private basicFormatting(code: string, tabSize: number, insertSpaces: boolean): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const indent = insertSpaces ? ' '.repeat(tabSize) : '\t';

    return lines
      .map(line => {
        const trimmedLine = line.trim();

        // Decrease indent for closing braces/brackets
        if (trimmedLine.match(/^[})\]]/)) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        // Add current indentation
        const formattedLine = indent.repeat(indentLevel) + trimmedLine;

        // Increase indent for opening braces/brackets
        if (trimmedLine.match(/[{([]\s*$/)) {
          indentLevel++;
        }

        return formattedLine;
      })
      .join('\n');
  }

  public getFileExtension(language: string): string {
    const extensionMap: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      cpp: 'cpp',
      go: 'go',
      rust: 'rs',
      ruby: 'rb',
      php: 'php',
      swift: 'swift',
      kotlin: 'kt',
      scala: 'scala',
      html: 'html',
      css: 'css',
      sql: 'sql',
      markdown: 'md',
    };

    return extensionMap[language] || language;
  }

  public detectLanguage(code: string): string {
    // Simple language detection based on common patterns
    if (code.includes('import React') || code.includes('export default')) {
      return 'javascript';
    }
    if (code.includes('interface ') || code.includes('type ')) {
      return 'typescript';
    }
    if (code.includes('def ') || (code.includes('import ') && code.includes(':'))) {
      return 'python';
    }
    if (code.includes('public class ') || code.includes('private void ')) {
      return 'java';
    }
    if (code.includes('using System;') || code.includes('namespace ')) {
      return 'csharp';
    }
    if (code.includes('#include <') || code.includes('std::')) {
      return 'cpp';
    }
    if (code.includes('package main') || code.includes('func ')) {
      return 'go';
    }
    if (code.includes('fn ') || code.includes('impl ')) {
      return 'rust';
    }
    if (code.includes('<?php') || code.includes('namespace ')) {
      return 'php';
    }

    // Default to javascript if no pattern matches
    return 'javascript';
  }
}
