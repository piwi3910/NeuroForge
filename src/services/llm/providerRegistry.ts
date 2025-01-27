import * as vscode from 'vscode';

import { AnthropicProvider } from './anthropicProvider';
import { OpenAIProvider } from './openaiProvider';
import { LLMProvider } from './types';

export class LLMProviderRegistry {
  private static instance: LLMProviderRegistry;
  private providers: Map<string, LLMProvider>;
  private outputChannel: vscode.OutputChannel;
  private initialized: boolean = false;

  private constructor() {
    this.providers = new Map();
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge LLM');
  }

  public static getInstance(): LLMProviderRegistry {
    if (!LLMProviderRegistry.instance) {
      LLMProviderRegistry.instance = new LLMProviderRegistry();
    }
    return LLMProviderRegistry.instance;
  }

  private async registerDefaultProviders(): Promise<void> {
    try {
      // Register Anthropic provider
      const anthropicProvider = new AnthropicProvider();
      await this.registerProvider(anthropicProvider);

      // Register OpenAI provider
      const openaiProvider = new OpenAIProvider();
      await this.registerProvider(openaiProvider);

      this.outputChannel.appendLine('Default LLM providers registered successfully');
    } catch (error) {
      this.outputChannel.appendLine(
        `Error registering default providers: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async registerProvider(provider: LLMProvider): Promise<void> {
    try {
      if (this.providers.has(provider.id)) {
        throw new Error(`Provider with ID ${provider.id} is already registered`);
      }

      // Ensure provider configuration section exists
      const config = vscode.workspace.getConfiguration();
      const providerSection = `neuroforge.${provider.id}`;

      // Initialize provider settings if they don't exist
      for (const setting of provider.settings) {
        const settingPath = `${providerSection}.${setting.key}`;
        if (config.get(settingPath) === undefined) {
          await config.update(settingPath, setting.default, vscode.ConfigurationTarget.Global);
        }
      }

      this.providers.set(provider.id, provider);
      this.outputChannel.appendLine(`Registered LLM provider: ${provider.name} (${provider.id})`);
    } catch (error) {
      this.outputChannel.appendLine(
        `Error registering provider ${provider.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public getProvider(id: string): LLMProvider {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

    const provider = this.providers.get(id);
    if (!provider) {
      throw new Error(`Provider with ID ${id} not found`);
    }
    return provider;
  }

  public getAllProviders(): LLMProvider[] {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }
    return Array.from(this.providers.values());
  }

  public getProviderIds(): string[] {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }
    return Array.from(this.providers.keys());
  }

  public getProviderSettings(id: string): vscode.WorkspaceConfiguration {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

    const provider = this.getProvider(id);
    return vscode.workspace.getConfiguration(`neuroforge.${provider.id}`);
  }

  public async validateProviderConfig(id: string): Promise<string[]> {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

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
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

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
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

    // Get the first registered provider as default
    const firstProvider = this.providers.keys().next().value;
    if (!firstProvider) {
      throw new Error('No LLM providers registered');
    }
    return firstProvider;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await this.registerDefaultProviders();
      this.initialized = true;
      this.outputChannel.appendLine('LLM provider registry initialized successfully');
    } catch (error) {
      this.outputChannel.appendLine(
        `Error initializing provider registry: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async initializeProvider(id: string): Promise<void> {
    if (!this.initialized) {
      throw new Error('Provider registry not initialized. Call initialize() first.');
    }

    const provider = this.getProvider(id);
    const errors = await this.validateProviderConfig(id);

    if (errors.length > 0) {
      const errorMessage = `Provider ${provider.name} configuration errors:\n${errors.join('\n')}`;
      this.outputChannel.appendLine(errorMessage);
      throw new Error(errorMessage);
    }

    this.outputChannel.appendLine(`Initialized LLM provider: ${provider.name} (${provider.id})`);
  }

  public dispose(): void {
    this.providers.clear();
    this.outputChannel.dispose();
    this.initialized = false;
  }
}

// Export a function to get the singleton instance
export function getLLMProviderRegistry(): LLMProviderRegistry {
  return LLMProviderRegistry.getInstance();
}
