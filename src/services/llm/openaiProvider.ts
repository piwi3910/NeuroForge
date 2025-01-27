import * as vscode from 'vscode';

import { LLMModel, LLMProvider, LLMProviderSettings, LLMRequest, LLMResponse } from './types';

interface OpenAIError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}

interface OpenAIModelsResponse {
  data: Array<{
    id: string;
    created: number;
    owned_by: string;
    permission: unknown[];
    root: string;
    parent: string | null;
  }>;
}

interface OpenAIChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIProvider implements LLMProvider {
  public readonly id = 'openai';
  public readonly name = 'OpenAI';
  public readonly description = "OpenAI's GPT models";

  private readonly outputChannel: vscode.OutputChannel;
  private modelList: LLMModel[] | null = null;
  private modelOptions: Array<{ label: string; value: string }> | null = null;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge OpenAI');
  }

  public get settings(): LLMProviderSettings[] {
    // Get the current model options, or use defaults if not yet loaded
    const options = this.modelOptions || [];

    return [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        description: 'Your OpenAI API key',
        required: true,
      },
      {
        key: 'apiUrl',
        label: 'API URL',
        type: 'text',
        default: 'https://api.openai.com/v1',
        description: 'OpenAI API endpoint URL',
        required: true,
      },
      {
        key: 'organization',
        label: 'Organization ID',
        type: 'text',
        description: 'Your OpenAI organization ID (optional)',
        required: false,
      },
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        description: 'The GPT model to use',
        required: true,
        options,
        default: options[0]?.value,
      },
      {
        key: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        description: 'Maximum number of tokens to generate',
        default: 4096,
        required: true,
        validation: {
          min: 1,
          max: 32768,
        },
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        description: 'Controls randomness in responses (0.0 to 1.0)',
        default: 0.7,
        required: true,
        validation: {
          min: 0,
          max: 1,
        },
      },
    ];
  }

  public async getModels(): Promise<LLMModel[]> {
    // Return cached models if available
    if (this.modelList) {
      return this.modelList;
    }

    const config = vscode.workspace.getConfiguration('neuroforge.openai');
    const apiKey = config.get<string>('apiKey');
    const apiUrl = config.get<string>('apiUrl');
    const organization = config.get<string>('organization');

    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      if (organization) {
        headers['OpenAI-Organization'] = organization;
      }

      const response = await fetch(`${apiUrl}/models`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as OpenAIError;
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const result = (await response.json()) as OpenAIModelsResponse;

      // Filter for GPT models and map to LLMModel format
      const models = result.data
        .filter(model => model.id.startsWith('gpt-'))
        .map(model => ({
          id: model.id,
          name: this.formatModelName(model.id),
          description: `OpenAI ${this.formatModelName(model.id)} model`,
          // Get context length from model ID (e.g., gpt-3.5-turbo-16k has 16k context)
          contextLength: this.getContextLength(model.id),
          available: true,
        }))
        // Sort by newest first (based on model ID)
        .sort((a, b) => b.id.localeCompare(a.id));

      // Update model options for settings
      this.modelOptions = models.map(model => ({
        label: model.name,
        value: model.id,
      }));

      this.modelList = models;
      return models;
    } catch (error) {
      this.outputChannel.appendLine(
        `OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const config = vscode.workspace.getConfiguration('neuroforge.openai');
    const apiKey = config.get<string>('apiKey');
    const apiUrl = config.get<string>('apiUrl');
    const organization = config.get<string>('organization');

    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      this.outputChannel.appendLine(
        `Sending request to OpenAI API: ${JSON.stringify(request, null, 2)}`
      );

      const headers: Record<string, string> = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      if (organization) {
        headers['OpenAI-Organization'] = organization;
      }

      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          max_tokens: request.maxTokens,
          temperature: request.temperature,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as OpenAIError;
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const result = (await response.json()) as OpenAIChatResponse;

      return {
        content: result.choices[0].message.content,
        model: result.model,
        usage: {
          promptTokens: result.usage.prompt_tokens,
          completionTokens: result.usage.completion_tokens,
          totalTokens: result.usage.total_tokens,
        },
      };
    } catch (error) {
      this.outputChannel.appendLine(
        `OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async validateConfig(config: Record<string, unknown>): Promise<string[]> {
    const errors: string[] = [];

    // Check required fields
    if (!config.apiKey) {
      errors.push('API key is required');
    }

    if (!config.apiUrl) {
      errors.push('API URL is required');
    }

    if (!config.model) {
      errors.push('Model selection is required');
    }

    // Validate numeric fields
    const maxTokens = config.maxTokens as number;
    if (typeof maxTokens !== 'number' || maxTokens < 1 || maxTokens > 32768) {
      errors.push('Max tokens must be between 1 and 32768');
    }

    const temperature = config.temperature as number;
    if (typeof temperature !== 'number' || temperature < 0 || temperature > 1) {
      errors.push('Temperature must be between 0 and 1');
    }

    return errors;
  }

  private formatModelName(modelId: string): string {
    return modelId
      .replace('gpt-', 'GPT-')
      .split('-')
      .map(part =>
        part === 'turbo' ? 'Turbo' : part === 'preview' ? 'Preview' : part.toUpperCase()
      )
      .join(' ');
  }

  private getContextLength(modelId: string): number {
    // Extract context length from model ID if available (e.g., gpt-3.5-turbo-16k)
    const match = modelId.match(/(\d+)k/);
    if (match) {
      return parseInt(match[1], 10) * 1024;
    }

    // Use known context lengths for specific models
    if (modelId.includes('turbo-preview')) {
      return 128 * 1024; // 128k tokens
    }

    // Default context length for unknown models
    return 4096;
  }
}
