import * as vscode from 'vscode';

import { AnthropicProvider } from './anthropicProvider';
import { OpenAIProvider } from './openaiProvider';
import { LLMProvider } from './types';

export class LLMProviderRegistry {
  private static instance: LLMProviderRegistry;
  private providers: Map<string, LLMProvider>;
  private outputChannel: vscode.OutputChannel;

  private constructor() {
    this.providers = new Map();
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge LLM');
    this.registerDefaultProviders();
  }

  public static getInstance(): LLMProviderRegistry {
    if (!LLMProviderRegistry.instance) {
      LLMProviderRegistry.instance = new LLMProviderRegistry();
    }
    return LLMProviderRegistry.instance;
  }

  private registerDefaultProviders(): void {
    try {
      // Register Anthropic provider
      const anthropicProvider = new AnthropicProvider();
      this.registerProvider(anthropicProvider);

      // Register OpenAI provider
      const openaiProvider = new OpenAIProvider();
      this.registerProvider(openaiProvider);

      this.outputChannel.appendLine('Default LLM providers registered successfully');
    } catch (error) {
      this.outputChannel.appendLine(
        `Error registering default providers: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public registerProvider(provider: LLMProvider): void {
    if (this.providers.has(provider.id)) {
      throw new Error(`Provider with ID ${provider.id} is already registered`);
    }
    this.providers.set(provider.id, provider);
    this.outputChannel.appendLine(`Registered LLM provider: ${provider.name} (${provider.id})`);
  }

  public getProvider(id: string): LLMProvider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new Error(`Provider with ID ${id} not found`);
    }
    return provider;
  }

  public getAllProviders(): LLMProvider[] {
    return Array.from(this.providers.values());
  }

  public getProviderIds(): string[] {
    return Array.from(this.providers.keys());
  }

  public getProviderSettings(id: string): vscode.WorkspaceConfiguration {
    const provider = this.getProvider(id);
    return vscode.workspace.getConfiguration(`neuroforge.${provider.id}`);
  }

  public async validateProviderConfig(id: string): Promise<string[]> {
    const provider = this.getProvider(id);
    const config = this.getProviderSettings(id);

    const configObject: Record<string, unknown> = {};
    for (const setting of provider.settings) {
      configObject[setting.key] = config.get(setting.key);
    }

    return provider.validateConfig(configObject);
  }

  public async getAvailableModels(id: string): Promise<
    Array<{
      label: string;
      value: string;
      description: string;
    }>
  > {
    const provider = this.getProvider(id);
    try {
      const models = await provider.getModels();
      return models
        .filter(model => model.available)
        .map(model => ({
          label: model.name,
          value: model.id,
          description: model.description,
        }));
    } catch (error) {
      this.outputChannel.appendLine(
        `Error fetching models for provider ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public getDefaultProvider(): string {
    // Get the first registered provider as default
    const firstProvider = this.providers.keys().next().value;
    if (!firstProvider) {
      throw new Error('No LLM providers registered');
    }
    return firstProvider;
  }

  public async initializeProvider(id: string): Promise<void> {
    const provider = this.getProvider(id);
    const errors = await this.validateProviderConfig(id);

    if (errors.length > 0) {
      throw new Error(`Provider ${provider.name} configuration errors:\n${errors.join('\n')}`);
    }

    this.outputChannel.appendLine(`Initialized LLM provider: ${provider.name} (${provider.id})`);
  }

  public dispose(): void {
    this.providers.clear();
    this.outputChannel.dispose();
  }
}

// Export a function to get the singleton instance
export function getLLMProviderRegistry(): LLMProviderRegistry {
  return LLMProviderRegistry.getInstance();
}
