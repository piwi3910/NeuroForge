import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ProjectDetails {
  name: string | null;
  description: string | null;
  stack: string | null;
  status: {
    name: 'complete' | 'incomplete';
    description: 'complete' | 'incomplete';
    stack: 'complete' | 'incomplete';
  };
  message: string;
}

export class AIArchitectService {
  private systemPrompts: Map<string, string> = new Map();
  private openai: OpenAI;

  constructor() {
    this.loadSystemPrompts();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  private async loadSystemPrompts(): Promise<void> {
    try {
      const promptsDir = path.join(__dirname, '..', 'prompts');
      const files = await fs.readdir(promptsDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join(promptsDir, file), 'utf-8');
          this.systemPrompts.set(file.replace('.md', ''), content);
        }
      }
      
      console.log('Loaded system prompts:', Array.from(this.systemPrompts.keys()));
    } catch (error) {
      console.error('Error loading system prompts:', error);
    }
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const systemPrompt = this.systemPrompts.get('project-definition');
      if (!systemPrompt) {
        throw new Error('System prompt not found');
      }

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return response;
    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  async generateSystemPrompt(description: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI system prompt generator. Your task is to create a detailed system prompt based on the project description provided."
          },
          {
            role: "user",
            content: `Generate a system prompt for this project: ${description}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return response;
    } catch (error) {
      console.error('Error generating system prompt:', error);
      throw new Error('Failed to generate system prompt');
    }
  }
}
