import { ProjectDetails } from '../../../types/project-info';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatPanelProps {
  projectId: string | null;
  isGitRepo: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setProjectDetails: (details: ProjectDetails | ((prev: ProjectDetails) => ProjectDetails)) => void;
}

export interface MessageListProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  isGitRepo: boolean;
  chatInputRef: React.RefObject<HTMLInputElement>;
}
