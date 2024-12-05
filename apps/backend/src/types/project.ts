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
}

export interface ProjectDetails {
    project_id: string;
    name: string | null;
    description: string | null;
    stack: string | null;
    status_name: 'complete' | 'incomplete';
    status_description: 'complete' | 'incomplete';
    status_stack: 'complete' | 'incomplete';
    created_at: Date;
    updated_at: Date;
}

export interface ProjectWithDetails extends Project {
    details: ProjectDetails;
}

export interface ChatMessage {
    id: number;
    project_id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ProjectStatus {
    name: 'complete' | 'incomplete';
    description: 'complete' | 'incomplete';
    stack: 'complete' | 'incomplete';
}

export interface ProjectDetailsUpdate {
    name?: string | null;
    description?: string | null;
    stack?: string | null;
    status_name?: 'complete' | 'incomplete';
    status_description?: 'complete' | 'incomplete';
    status_stack?: 'complete' | 'incomplete';
}
