import fs from 'fs/promises';
import path from 'path';
import { PromptManager } from './types';

export class FileSystemPromptManager implements PromptManager {
  private systemPrompts: Map<string, string> = new Map();

  async loadSystemPrompts(): Promise<void> {
    try {
      const promptsDir = path.join(__dirname, '..', '..', 'prompts');
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
      throw new Error('Failed to load system prompts');
    }
  }

  getSystemPrompt(name: string): string | undefined {
    return this.systemPrompts.get(name);
  }
}
