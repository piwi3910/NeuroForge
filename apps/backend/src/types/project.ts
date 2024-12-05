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
    description: string | null;
    git_repo: string | null;
}

export interface ProjectWithDetails extends Project {
    details: ProjectDetails;
}

export interface DatabaseRow {
    [key: string]: string | number | null;
}

export interface ChatMessage {
    role: string;
    content: string;
    timestamp: Date;
}

export interface ProjectSave {
    name: string;
    data: string;
}
