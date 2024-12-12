import { ChatMessage, AIResponse } from './ai-architect/types';
import { FileSystemPromptManager } from './ai-architect/PromptManager';
import { OpenAIServiceImpl } from './ai-architect/OpenAIService';

export class AIArchitectService {
  private promptManager: FileSystemPromptManager;
  private openaiService: OpenAIServiceImpl;
  private messageHistory: Map<string, ChatMessage[]> = new Map();

  constructor() {
    this.promptManager = new FileSystemPromptManager();
    this.openaiService = new OpenAIServiceImpl();
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.promptManager.loadSystemPrompts();
  }

  clearHistory(projectId: string): void {
    this.messageHistory.delete(projectId);
  }

  async chat(messages: ChatMessage[]): Promise<AIResponse> {
    const systemPrompt = this.promptManager.getSystemPrompt('project-definition');
    if (!systemPrompt) {
      throw new Error('System prompt not found');
    }

    return this.openaiService.chat(messages, systemPrompt);
  }

  async generateSystemPrompt(description: string): Promise<string> {
    return this.openaiService.generateSystemPrompt(description);
  }
}
