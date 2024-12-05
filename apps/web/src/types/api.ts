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

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ProjectChat {
  id: string;
  projectId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type ItemType = 'epic' | 'story' | 'task';
export type ItemPriority = 'High' | 'Medium' | 'Low';
export type ItemStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Done';

export interface BacklogItem {
  id: string;
  projectId: string;
  type: ItemType;
  title: string;
  description: string;
  priority: ItemPriority;
  status: ItemStatus;
  epicId?: string;
  storyId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string;
  estimatedEffort?: number;
  labels?: string[];
}
