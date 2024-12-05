export interface ProjectConfig {
  name: string;
  path: string;
  description: string;
  systemPrompt: string;
  gitRepo: string;
  status: 'defining' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectChat {
  id: string;
  projectId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
