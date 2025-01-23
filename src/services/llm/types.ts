/**
 * Configuration settings for an LLM provider
 */
export interface LLMProviderSettings {
  /** Unique identifier for the setting */
  key: string;
  /** Display name for the setting */
  label: string;
  /** Type of the setting (text, password, number, etc.) */
  type: 'text' | 'password' | 'number' | 'select';
  /** Default value for the setting */
  default?: string | number;
  /** Description of the setting */
  description: string;
  /** For select type, the available options */
  options?: Array<{
    label: string;
    value: string;
  }>;
  /** Whether the setting is required */
  required: boolean;
  /** Validation rules */
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

/**
 * Model information from a provider
 */
export interface LLMModel {
  /** Unique identifier for the model */
  id: string;
  /** Display name for the model */
  name: string;
  /** Description of the model's capabilities */
  description: string;
  /** Maximum context length in tokens */
  contextLength: number;
  /** Whether the model is currently available */
  available: boolean;
}

/**
 * Response from an LLM provider
 */
export interface LLMResponse {
  /** The generated text */
  content: string;
  /** Usage information */
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  /** Model used for the response */
  model: string;
}

/**
 * Request parameters for an LLM provider
 */
export interface LLMRequest {
  /** The prompt or messages to send */
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  /** The model to use */
  model: string;
  /** Temperature for response generation */
  temperature?: number;
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Additional provider-specific parameters */
  options?: Record<string, unknown>;
}

/**
 * Interface that all LLM providers must implement
 */
export interface LLMProvider {
  /** Unique identifier for the provider */
  readonly id: string;
  /** Display name for the provider */
  readonly name: string;
  /** Description of the provider */
  readonly description: string;
  /** Required configuration settings */
  readonly settings: LLMProviderSettings[];
  /** Get available models */
  getModels(): Promise<LLMModel[]>;
  /** Generate a response */
  generateResponse(request: LLMRequest): Promise<LLMResponse>;
  /** Validate provider configuration */
  validateConfig(config: Record<string, unknown>): Promise<string[]>;
}
