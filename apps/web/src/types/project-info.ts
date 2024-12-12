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

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
