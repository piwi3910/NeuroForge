import { ProjectWithDetails } from '../../types/project';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ProjectCreationService {
  createProject(name: string, description: string, gitRepo?: string): Promise<ProjectWithDetails>;
  resetProject(projectId: string): Promise<void>;
}

export interface ProjectStateService {
  listProjectSaves(projectId: string): Promise<string[]>;
  getTotalSavedProjects(): Promise<number>;
  saveProjectState(projectId: string, saveName: string): Promise<void>;
  loadProjectState(projectId: string, saveName: string): Promise<ProjectWithDetails>;
}

export interface ProjectUpdateService {
  updateProjectDescription(projectId: string, description: string): Promise<ProjectWithDetails>;
  generateSystemPrompt(projectId: string): Promise<ProjectWithDetails>;
  getProject(projectId: string): Promise<ProjectWithDetails>;
  commitProjectChanges(projectId: string, message: string): Promise<void>;
}

export interface ProjectServiceDependencies {
  basePath: string;
  gitService: GitService;
  aiService: AIService;
  dbService: DatabaseService;
}

export interface GitService {
  initRepository(path: string): Promise<void>;
  createInitialCommit(path: string): Promise<void>;
  commitChanges(path: string, message: string): Promise<void>;
  createTag(path: string, tag: string): Promise<void>;
  checkoutTag(path: string, tag: string): Promise<void>;
}

export interface AIService {
  generateSystemPrompt(description: string): Promise<string>;
}

export interface DatabaseService {
  createProject(id: string, name: string, path: string, description: string, gitRepo?: string): Promise<void>;
  getProjectDetails(id: string): Promise<ProjectWithDetails | null>;
  updateProjectDetails(id: string, details: Partial<ProjectWithDetails>): Promise<void>;
  deleteProject(id: string): Promise<void>;
  clearChatHistory(id: string): Promise<void>;
  getChatMessages(id: string): Promise<ChatMessage[]>;
  saveChatMessage(id: string, role: string, content: string): Promise<void>;
  saveProjectState(id: string, name: string, data: string): Promise<void>;
  loadProjectState(id: string, name: string): Promise<string | null>;
  listProjectSaves(id: string): Promise<string[]>;
  getAllProjectSaves(): Promise<number>;
}
