import * as vscode from 'vscode';

import { AIService } from './aiService';

export class CompletionProvider implements vscode.CompletionItemProvider {
  constructor(private readonly aiService: AIService) {}

  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
    _context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[] | vscode.CompletionList> {
    try {
      // Get the current line up to the cursor position
      const linePrefix = document.lineAt(position).text.substring(0, position.character);

      // Don't suggest if line is empty or starts with whitespace
      if (!linePrefix.trim()) {
        return [];
      }

      // Get suggestions from AI service
      const suggestions = await this.aiService.getCompletionSuggestions(linePrefix);
      const language = document.languageId;

      // Convert suggestions to completion items
      return this.createCompletionItems(suggestions.toString(), language);
    } catch (error) {
      console.error('Error providing completions:', error);
      return [];
    }
  }

  private createCompletionItems(suggestions: string, language: string): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    // Split suggestions into individual lines
    const lines = suggestions.split('\n').filter(line => line.trim());

    for (const line of lines) {
      const item = new vscode.CompletionItem(line, vscode.CompletionItemKind.Text);

      // Add language-specific details
      switch (language) {
        case 'javascript':
        case 'typescript':
          if (line.includes('function')) {
            item.kind = vscode.CompletionItemKind.Function;
          } else if (line.includes('class')) {
            item.kind = vscode.CompletionItemKind.Class;
          }
          break;

        case 'python':
          if (line.includes('def ')) {
            item.kind = vscode.CompletionItemKind.Function;
          } else if (line.includes('class ')) {
            item.kind = vscode.CompletionItemKind.Class;
          }
          break;

        default:
          item.kind = vscode.CompletionItemKind.Text;
      }

      // Add documentation
      item.documentation = new vscode.MarkdownString(
        'AI-suggested completion based on current context'
      );

      items.push(item);
    }

    return items;
  }

  resolveCompletionItem(
    item: vscode.CompletionItem,
    _token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CompletionItem> {
    return item;
  }
}
