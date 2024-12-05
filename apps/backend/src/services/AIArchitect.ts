import fs from 'fs/promises';
import path from 'path';

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
}

export class AIArchitectService {
  private systemPrompts: Map<string, string> = new Map();

  constructor() {
    this.loadSystemPrompts();
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
      // TODO: Integrate with actual AI service
      // For now, return a mock response that demonstrates the expected behavior
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.content.toLowerCase().includes('task') || lastMessage.content.toLowerCase().includes('project')) {
        return JSON.stringify({
          name: null,
          description: null,
          stack: null,
          status: {
            name: 'incomplete',
            description: 'incomplete',
            stack: 'incomplete'
          },
          message: "I'll help you define your project. Let's start with the name. What would you like to call this project?"
        });
      }

      // Mock response for project name input
      if (!this.hasProjectName(messages)) {
        return JSON.stringify({
          name: lastMessage.content,
          description: null,
          stack: null,
          status: {
            name: 'complete',
            description: 'incomplete',
            stack: 'incomplete'
          },
          message: "Great name! Now, could you describe the main purpose and features of your project?"
        });
      }

      // Mock response for project description input
      if (!this.hasProjectDescription(messages)) {
        return JSON.stringify({
          name: this.getProjectName(messages),
          description: lastMessage.content,
          stack: null,
          status: {
            name: 'complete',
            description: 'complete',
            stack: 'incomplete'
          },
          message: "Thanks for the description! Finally, what technology stack would you like to use for this project?"
        });
      }

      // Mock response for technology stack input
      return JSON.stringify({
        name: this.getProjectName(messages),
        description: this.getProjectDescription(messages),
        stack: lastMessage.content,
        status: {
          name: 'complete',
          description: 'complete',
          stack: 'complete'
        },
        message: "Perfect! I have all the information needed. Your project is now fully defined and ready for the next phase."
      });

    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  async generateSystemPrompt(description: string): Promise<string> {
    // TODO: Integrate with actual AI service
    return "Generated system prompt based on: " + description;
  }

  private hasProjectName(messages: ChatMessage[]): boolean {
    // Simple mock implementation
    return messages.length > 2;
  }

  private hasProjectDescription(messages: ChatMessage[]): boolean {
    // Simple mock implementation
    return messages.length > 4;
  }

  private getProjectName(messages: ChatMessage[]): string {
    // Simple mock implementation
    return messages[2].content;
  }

  private getProjectDescription(messages: ChatMessage[]): string {
    // Simple mock implementation
    return messages[4].content;
  }
}
