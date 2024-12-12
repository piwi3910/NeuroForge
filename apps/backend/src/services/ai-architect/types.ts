export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProjectDetails {
  name: string | null;
  description: string | null;
  stack: string | null;
  status: {
    name: 'complete' | 'incomplete';
    description: 'complete' | 'incomplete';
    stack: 'complete' | 'incomplete';
  };
}

export interface AIResponse {
  message: string;
  details?: ProjectDetails;
}

export interface OpenAIService {
  chat(messages: ChatMessage[], systemPrompt: string): Promise<AIResponse>;
  generateSystemPrompt(description: string): Promise<string>;
}

export interface PromptManager {
  loadSystemPrompts(): Promise<void>;
  getSystemPrompt(name: string): string | undefined;
}
