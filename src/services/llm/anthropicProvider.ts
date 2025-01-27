import * as vscode from 'vscode';

import {
  LLMModel,
  LLMProvider,
  LLMProviderSettings,
  LLMRequest,
  LLMResponse,
  LLMStreamCallback,
} from './types';

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

interface AnthropicStreamChunk {
  type:
    | 'message_start'
    | 'content_block_start'
    | 'content_block_delta'
    | 'message_delta'
    | 'message_stop';
  message?: {
    id: string;
    model: string;
    content: Array<{
      type: 'text';
      text: string;
    }>;
    usage?: {
      input_tokens: number;
      output_tokens: number;
    };
  };
  delta?: {
    type: 'text';
    text: string;
  };
}

interface AnthropicModelsResponse {
  data: Array<{
    id: string;
    display_name: string;
    created_at: string;
  }>;
  has_more: boolean;
  first_id: string;
  last_id: string;
}

export class AnthropicProvider implements LLMProvider {
  public readonly id = 'anthropic';
  public readonly name = 'Anthropic';
  public readonly description = "Anthropic's Claude AI models";

  private readonly outputChannel: vscode.OutputChannel;
  private modelList: LLMModel[] | null = null;
  private modelOptions: Array<{ label: string; value: string }> | null = null;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('NeuroForge Anthropic');
  }

  public get settings(): LLMProviderSettings[] {
    // Get the current model options, or use empty array if not yet loaded
    const options = this.modelOptions || [];

    return [
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
        options,
        default: options[0]?.value,
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
  }

  public async getModels(): Promise<LLMModel[]> {
    // Return cached models if available
    if (this.modelList) {
      return this.modelList;
    }

    const config = vscode.workspace.getConfiguration('neuroforge.anthropic');
    const apiKey = config.get<string>('apiKey');
    const apiUrl = config.get<string>('apiUrl');

    if (!apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await fetch(`${apiUrl}/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as AnthropicError;
        throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
      }

      const result = (await response.json()) as AnthropicModelsResponse;

      // Filter and map models to LLMModel format
      const models = result.data
        .filter(model => model.id.startsWith('claude-'))
        .map(model => ({
          id: model.id,
          name: model.display_name,
          description: `Anthropic ${model.display_name} model`,
          contextLength: this.getContextLength(model.id),
          available: true,
        }))
        // Sort by newest first (based on created_at)
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
        `Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    if (request.stream) {
      throw new Error('Use generateStreamingResponse for streaming requests');
    }

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
          stream: false,
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

  public async generateStreamingResponse(
    request: LLMRequest,
    callback: LLMStreamCallback
  ): Promise<void> {
    const config = vscode.workspace.getConfiguration('neuroforge.anthropic');
    const apiKey = config.get<string>('apiKey');
    const apiUrl = config.get<string>('apiUrl');

    if (!apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      this.outputChannel.appendLine(
        `Sending streaming request to Anthropic API: ${JSON.stringify(request, null, 2)}`
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
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as AnthropicError;
        throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let model = '';
      const tokens = {
        input: 0,
        output: 0,
      };

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine === 'event: done') continue;

            try {
              const data = JSON.parse(trimmedLine.slice(6)); // Remove 'data: ' prefix
              const chunk = data as AnthropicStreamChunk;

              switch (chunk.type) {
                case 'message_start':
                  if (chunk.message) {
                    model = chunk.message.model;
                  }
                  break;

                case 'content_block_delta':
                  if (chunk.delta) {
                    callback({
                      content: chunk.delta.text,
                      done: false,
                    });
                  }
                  break;

                case 'message_delta':
                  if (chunk.message?.usage) {
                    tokens.input = chunk.message.usage.input_tokens;
                    tokens.output = chunk.message.usage.output_tokens;
                  }
                  break;

                case 'message_stop':
                  callback({
                    content: '',
                    done: true,
                    model,
                    usage: {
                      promptTokens: tokens.input,
                      completionTokens: tokens.output,
                      totalTokens: tokens.input + tokens.output,
                    },
                  });
                  break;
              }
            } catch (error) {
              this.outputChannel.appendLine(
                `Error parsing chunk: ${error instanceof Error ? error.message : 'Unknown error'}`
              );
              continue;
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
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

  private getContextLength(modelId: string): number {
    // Extract context length from model ID if available (e.g., claude-3-opus-32k)
    const match = modelId.match(/(\d+)k/);
    if (match) {
      return parseInt(match[1], 10) * 1024;
    }

    // Use known context lengths for specific model families
    if (modelId.startsWith('claude-3')) {
      return 32 * 1024; // 32k tokens for Claude 3 models
    } else if (modelId.startsWith('claude-2')) {
      return 16 * 1024; // 16k tokens for Claude 2 models
    }

    // Default context length for unknown models
    return 8192;
  }
}
