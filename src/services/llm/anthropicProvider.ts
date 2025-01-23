import * as vscode from 'vscode';

import { LLMModel, LLMProvider, LLMProviderSettings, LLMRequest, LLMResponse } from './types';

interface AnthropicError {
  error: {
    type: string;
    message: string;
  };
}

interface AnthropicResponse {
  id: string;
  model: string;
  content: Array<{
    type: 'text';
    text: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export class AnthropicProvider implements LLMProvider {
  public readonly id = 'anthropic';
  public readonly name = 'Anthropic';
  public readonly description = "Anthropic's Claude AI models";

  public readonly settings: LLMProviderSettings[] = [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'password',
      description: 'Your Anthropic API key',
      required: true,
    },
    {
      key: 'apiUrl',
      label: 'API URL',
      type: 'text',
      default: 'https://api.anthropic.com/v1',
      description: 'Anthropic API endpoint URL',
      required: true,
    },
    {
      key: 'model',
      label: 'Model',
      type: 'select',
      description: 'The Claude model to use',
      required: true,
      options: [
        {
          label: 'Claude 3 Opus',
          value: 'claude-3-opus-20240229',
        },
        {
          label: 'Claude 3 Sonnet',
          value: 'claude-3-sonnet-20240229',
        },
        {
          label: 'Claude 2.1',
          value: 'claude-2.1',
        },
        {
          label: 'Claude 2.0',
          value: 'claude-2.0',
        },
      ],
      default: 'claude-3-opus-20240229',
    },
    {
      key: 'maxTokens',
      label: 'Max Tokens',
      type: 'number',
      description: 'Maximum number of tokens to generate',
      default: 8192,
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

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge Anthropic');
  }

  public async getModels(): Promise<LLMModel[]> {
    // Anthropic doesn't have a models endpoint, so we return the hardcoded list
    return [
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        description: 'Most capable model for highly complex tasks',
        contextLength: 32768,
        available: true,
      },
      {
        id: 'claude-3-sonnet-20240229',
        name: 'Claude 3 Sonnet',
        description: 'Ideal balance of intelligence and speed',
        contextLength: 32768,
        available: true,
      },
      {
        id: 'claude-2.1',
        name: 'Claude 2.1',
        description: 'Previous generation model with strong capabilities',
        contextLength: 16384,
        available: true,
      },
      {
        id: 'claude-2.0',
        name: 'Claude 2.0',
        description: 'Legacy model for basic tasks',
        contextLength: 16384,
        available: true,
      },
    ];
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const config = vscode.workspace.getConfiguration('neuroforge.anthropic');
    const apiKey = config.get<string>('apiKey');
    const apiUrl = config.get<string>('apiUrl');

    if (!apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      this.outputChannel.appendLine(
        `Sending request to Anthropic API: ${JSON.stringify(request, null, 2)}`
      );

      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
          max_tokens: request.maxTokens,
          temperature: request.temperature,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as AnthropicError;
        throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
      }

      const result = (await response.json()) as AnthropicResponse;

      return {
        content: result.content[0].text,
        model: result.model,
        usage: {
          promptTokens: result.usage.input_tokens,
          completionTokens: result.usage.output_tokens,
          totalTokens: result.usage.input_tokens + result.usage.output_tokens,
        },
      };
    } catch (error) {
      this.outputChannel.appendLine(
        `Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`
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
}
