import * as vscode from 'vscode';

import { getLLMProviderRegistry } from './llm/providerRegistry';
import { LLMRequest, LLMStreamCallback } from './llm/types';

const SYSTEM_MESSAGE = 'Use XML tags for commands.';

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
      await registry.initialize();

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

      const providerConfig = registry.getProviderSettings(providerId);
      const model = providerConfig.get<string>('model') || 'default-model';
      const maxTokens = providerConfig.get<number>('maxTokens') || 2048;
      const temperature = providerConfig.get<number>('temperature') || 0.7;

      const request: LLMRequest = {
        messages: [{ role: 'system', content: SYSTEM_MESSAGE }, ...messages],
        model,
        maxTokens,
        temperature,
        stream: options?.stream,
      };

      if (options?.stream && options.onChunk) {
        let fullResponse = '';
        await provider.generateStreamingResponse(request, chunk => {
          fullResponse += chunk;
          options.onChunk?.(chunk);
        });
        return fullResponse;
      }

      const result = await provider.generateResponse(request);
      return result.content;
    } catch (error) {
      this.outputChannel.appendLine(
        `Error in chat: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }
}
