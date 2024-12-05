export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  details?: ProjectDetails;
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

export interface ProjectConfig {
  name: string;
  path: string;
  description: string;
  systemPrompt: string;
  gitRepo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BacklogItem {
  id: string;
  projectId: string;
  type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  role: 'assistant';
  content: string;
  message?: string; // Added for backward compatibility
  timestamp: Date;
  details?: ProjectDetails;
}
