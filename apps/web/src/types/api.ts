export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ProjectStatus {
    name: 'complete' | 'incomplete';
    description: 'complete' | 'incomplete';
    stack: 'complete' | 'incomplete';
}

export interface ProjectDetails {
    name: string | null;
    description: string | null;
    stack: string | null;
    status: ProjectStatus;
}

export interface Project {
    id: string;
    name: string;
    path: string;
    description: string;
    git_repo: string | null;
    system_prompt: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    details: ProjectDetails;
}

export interface ChatResponse {
    role: 'assistant';
    content: string;
    details?: ProjectDetails;
    timestamp: Date;
}

export interface ApiClient {
    createProject(name: string, description: string, gitRepo?: string): Promise<Project>;
    resetProject(projectId: string): Promise<void>;
    updateProjectDescription(projectId: string, description: string): Promise<Project>;
    generateSystemPrompt(projectId: string): Promise<Project>;
    chatWithAI(projectId: string, message: string): Promise<ChatResponse>;
    getProject(projectId: string): Promise<Project>;
    commitProjectChanges(projectId: string, message: string): Promise<void>;
    saveProjectState(projectId: string, saveName: string): Promise<void>;
    loadProjectState(projectId: string, saveName: string): Promise<Project>;
    listProjectSaves(projectId: string): Promise<string[]>;
}
