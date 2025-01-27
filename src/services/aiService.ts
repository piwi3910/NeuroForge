import * as vscode from 'vscode';

import { getLLMProviderRegistry } from './llm/providerRegistry';
import { LLMRequest, LLMStreamCallback } from './llm/types';

export class AIService {
  private readonly outputChannel: vscode.OutputChannel;
  private initialized: boolean = false;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge AI');
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      const registry = getLLMProviderRegistry();

      // Initialize the registry first
      await registry.initialize();

      // Get and initialize the selected provider
      const config = vscode.workspace.getConfiguration('neuroforge');
      const providerId = config.get<string>('provider') || registry.getDefaultProvider();
      await registry.initializeProvider(providerId);

      this.initialized = true;
      this.outputChannel.appendLine(`Initialized AI service with provider: ${providerId}`);
    } catch (error) {
      this.outputChannel.appendLine(
        `Error initializing AI service: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('AI service not initialized. Call initialize() first.');
    }
  }

  public async chat(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: { stream?: boolean; onChunk?: LLMStreamCallback }
  ): Promise<string> {
    this.ensureInitialized();

    try {
      const registry = getLLMProviderRegistry();
      const config = vscode.workspace.getConfiguration('neuroforge');
      const providerId = config.get<string>('provider') || registry.getDefaultProvider();
      const provider = registry.getProvider(providerId);

      // Get provider-specific settings
      const providerConfig = registry.getProviderSettings(providerId);
      const model =
        providerConfig.get<string>('model') ||
        (provider.settings.find(s => s.key === 'model')?.default as string);
      const maxTokens =
        providerConfig.get<number>('maxTokens') ||
        (provider.settings.find(s => s.key === 'maxTokens')?.default as number);
      const temperature =
        providerConfig.get<number>('temperature') ||
        (provider.settings.find(s => s.key === 'temperature')?.default as number);

      const request: LLMRequest = {
        messages,
        model,
        maxTokens,
        temperature,
        stream: options?.stream,
      };

      if (options?.stream && options.onChunk) {
        // Use streaming response
        await provider.generateStreamingResponse(request, options.onChunk);
        return ''; // Content is delivered through chunks
      } else {
        // Use regular response
        const response = await provider.generateResponse(request);
        return response.content;
      }
    } catch (error) {
      this.outputChannel.appendLine(
        `Error in chat: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async explainCode(code: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Explain the following code in a clear and concise way:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async generateDocs(code: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Generate comprehensive documentation for the following code:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async suggestRefactoring(code: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Suggest improvements and refactoring for the following code:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async generateTests(code: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Generate comprehensive test cases for the following code:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async analyzeDependencies(dependencies: string[]): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Analyze the following project dependencies and provide insights:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify(dependencies, null, 2) },
    ]);
  }

  public async getCompletionSuggestions(prefix: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Provide code completion suggestions for the following context:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prefix },
    ]);
  }

  public async reviewCode(code: string): Promise<string> {
    const systemPrompt =
      'You are an expert software developer. Review the following code and provide feedback:';
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async convertCode(code: string, targetLanguage: string): Promise<string> {
    const systemPrompt = `You are an expert software developer. Convert the following code to ${targetLanguage}:`;
    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ]);
  }

  public async getAvailableProviders(): Promise<
    Array<{ id: string; name: string; description: string }>
  > {
    this.ensureInitialized();
    const registry = getLLMProviderRegistry();
    return registry.getAllProviders().map(provider => ({
      id: provider.id,
      name: provider.name,
      description: provider.description,
    }));
  }

  public async getProviderModels(
    providerId: string
  ): Promise<Array<{ label: string; value: string; description: string }>> {
    this.ensureInitialized();
    const registry = getLLMProviderRegistry();
    return registry.getAvailableModels(providerId);
  }

  public async validateProviderConfig(providerId: string): Promise<string[]> {
    this.ensureInitialized();
    const registry = getLLMProviderRegistry();
    return registry.validateProviderConfig(providerId);
  }

  public getProviderSettings(providerId: string): vscode.WorkspaceConfiguration {
    this.ensureInitialized();
    const registry = getLLMProviderRegistry();
    return registry.getProviderSettings(providerId);
  }
}
