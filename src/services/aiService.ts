import * as vscode from 'vscode';

interface AIResponse {
  toString(): string;
}

export class AIService {
  private readonly apiKey: string;
  private readonly provider: string;
  private readonly outputChannel: vscode.OutputChannel;

  constructor() {
    const config = vscode.workspace.getConfiguration('neuroforge');
    this.apiKey = config.get<string>('apiKey') || '';
    this.provider = config.get<string>('provider') || 'anthropic';
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge AI');
  }

  private validateConfig(): void {
    if (!this.apiKey) {
      throw new Error('API key not configured. Please set neuroforge.apiKey in settings.');
    }

    const validProviders = ['anthropic', 'openai'];
    if (!validProviders.includes(this.provider)) {
      throw new Error(
        `Invalid provider: ${this.provider}. Must be one of: ${validProviders.join(', ')}`
      );
    }
  }

  private async makeRequest<T>(_endpoint: string, _data: unknown): Promise<T> {
    this.validateConfig();

    try {
      // TODO: Implement actual API request
      this.outputChannel.appendLine(
        `Making request to ${_endpoint} with data: ${JSON.stringify(_data)}`
      );
      console.warn('Using mock response - API integration not implemented yet');
      return {
        toString: () => 'Mock response - API integration not implemented yet',
      } as T;
    } catch (error) {
      this.outputChannel.appendLine(`API request failed: ${error}`);
      throw new Error(`API request failed: ${error}`);
    }
  }

  public async chat(message: string): Promise<string> {
    try {
      this.outputChannel.appendLine(`Processing chat message: ${message}`);
      const _response = await this.makeRequest<AIResponse>('/chat', {
        message,
        provider: this.provider,
        maxTokens: vscode.workspace.getConfiguration('neuroforge').get('maxTokens'),
        temperature: vscode.workspace.getConfiguration('neuroforge').get('temperature'),
      });

      // For now, return a mock response based on the message
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        return "Hello! I'm NeuroForge, your AI coding assistant. How can I help you today?";
      } else if (message.toLowerCase().includes('help')) {
        return "I can help you with various coding tasks such as:\n- Explaining code\n- Generating documentation\n- Suggesting refactoring\n- Generating tests\n- Converting code between languages\n\nJust let me know what you'd like to do!";
      } else {
        return `I understand you want to "${message}". I'm currently in development, but once fully implemented, I'll be able to help you with this request. For now, you can try commands like "help" to see what I can do.`;
      }
    } catch (error) {
      this.outputChannel.appendLine(`Chat error: ${error}`);
      throw new Error(`Failed to process chat message: ${error}`);
    }
  }

  public async explainCode(code: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/explain', { code });
      return response;
    } catch (error) {
      throw new Error(`Failed to explain code: ${error}`);
    }
  }

  public async generateDocs(code: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/docs', { code });
      return response;
    } catch (error) {
      throw new Error(`Failed to generate documentation: ${error}`);
    }
  }

  public async suggestRefactoring(code: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/refactor', { code });
      return response;
    } catch (error) {
      throw new Error(`Failed to suggest refactoring: ${error}`);
    }
  }

  public async generateTests(code: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/tests', { code });
      return response;
    } catch (error) {
      throw new Error(`Failed to generate tests: ${error}`);
    }
  }

  public async analyzeDependencies(dependencies: string[]): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/analyze', { dependencies });
      return response;
    } catch (error) {
      throw new Error(`Failed to analyze dependencies: ${error}`);
    }
  }

  public async getCompletionSuggestions(prefix: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/complete', { prefix });
      return response;
    } catch (error) {
      throw new Error(`Failed to get completion suggestions: ${error}`);
    }
  }

  public async reviewCode(code: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/review', { code });
      return response;
    } catch (error) {
      throw new Error(`Failed to review code: ${error}`);
    }
  }

  public async convertCode(code: string, targetLanguage: string): Promise<AIResponse> {
    try {
      const response = await this.makeRequest<AIResponse>('/convert', { code, targetLanguage });
      return response;
    } catch (error) {
      throw new Error(`Failed to convert code: ${error}`);
    }
  }
}
