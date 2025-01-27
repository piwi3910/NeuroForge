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

  public readonly settings: LLMProviderSettings[] = [
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
      options: [
        {
          label: 'GPT-4 Turbo',
          value: 'gpt-4-turbo-preview',
        },
        {
          label: 'GPT-4',
          value: 'gpt-4',
        },
        {
          label: 'GPT-3.5 Turbo',
          value: 'gpt-3.5-turbo',
        },
      ],
      default: 'gpt-4-turbo-preview',
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

  private readonly outputChannel: vscode.OutputChannel;
  private modelList: LLMModel[] | null = null;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge OpenAI');
  }

  private getDefaultModels(): LLMModel[] {
    return [
      {
        id: 'gpt-4-turbo-preview',
        name: 'GPT-4 Turbo',
        description: 'Most capable GPT-4 model, optimized for speed',
        contextLength: 128000,
        available: true,
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Most capable GPT-4 model',
        contextLength: 8192,
        available: true,
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        description: 'Most capable GPT-3.5 model optimized for chat',
        contextLength: 16385,
        available: true,
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

    // Return default models if API key is not configured
    if (!apiKey) {
      return this.getDefaultModels();
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
      this.modelList = result.data
        .filter(model => model.id.startsWith('gpt-'))
        .map(model => ({
          id: model.id,
          name: this.formatModelName(model.id),
          description: `OpenAI ${this.formatModelName(model.id)} model`,
          contextLength: this.getContextLength(model.id),
          available: true,
        }));

      return this.modelList;
    } catch (error) {
      this.outputChannel.appendLine(
        `OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );

      // Fallback to default models if API call fails
      return this.getDefaultModels();
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
    switch (modelId) {
      case 'gpt-4-turbo-preview':
        return 128000;
      case 'gpt-4':
      case 'gpt-4-0314':
      case 'gpt-4-0613':
        return 8192;
      case 'gpt-3.5-turbo':
      case 'gpt-3.5-turbo-16k':
        return 16385;
      default:
        return 4096;
    }
  }
}
