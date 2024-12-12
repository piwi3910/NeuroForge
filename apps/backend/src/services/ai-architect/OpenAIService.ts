import OpenAI from 'openai';
import { OpenAIService as IOpenAIService, ChatMessage, AIResponse } from './types';
import { ChatService } from './ChatService';
import { PromptService } from './PromptService';
import { ResponseParser } from './ResponseParser';

export class OpenAIServiceImpl implements IOpenAIService {
  private openai: OpenAI;
  private chatService: ChatService;
  private promptService: PromptService;
  private responseParser: ResponseParser;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.responseParser = new ResponseParser();
    this.chatService = new ChatService(this.openai, this.responseParser);
    this.promptService = new PromptService(this.openai);
  }

  async chat(messages: ChatMessage[], systemPrompt: string): Promise<AIResponse> {
    return this.chatService.chat(messages, systemPrompt);
  }

  async generateSystemPrompt(description: string): Promise<string> {
    return this.promptService.generateSystemPrompt(description);
  }
}
