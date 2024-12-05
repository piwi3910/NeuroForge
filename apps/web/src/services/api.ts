import { ApiClient, ChatResponse, Project } from '@/types/api';

class ApiClientImpl implements ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API request failed');
        }

        return response.json();
    }

    async createProject(name: string, description: string, gitRepo?: string): Promise<Project> {
        return this.request<Project>('/projects', {
            method: 'POST',
            body: JSON.stringify({ name, description, gitRepo }),
        });
    }

    async resetProject(projectId: string): Promise<void> {
        await this.request(`/projects/${projectId}`, {
            method: 'DELETE',
        });
    }

    async updateProjectDescription(projectId: string, description: string): Promise<Project> {
        return this.request<Project>(`/projects/${projectId}/description`, {
            method: 'PUT',
            body: JSON.stringify({ description }),
        });
    }

    async generateSystemPrompt(projectId: string): Promise<Project> {
        return this.request<Project>(`/projects/${projectId}/system-prompt`, {
            method: 'POST',
        });
    }

    async chatWithAI(projectId: string, message: string): Promise<ChatResponse> {
        return this.request<ChatResponse>(`/projects/${projectId}/chat`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    }

    async getProject(projectId: string): Promise<Project> {
        return this.request<Project>(`/projects/${projectId}`);
    }

    async commitProjectChanges(projectId: string, message: string): Promise<void> {
        await this.request(`/projects/${projectId}/commit`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    }

    async saveProjectState(projectId: string, saveName: string): Promise<void> {
        await this.request(`/projects/${projectId}/save`, {
            method: 'POST',
            body: JSON.stringify({ name: saveName }),
        });
    }

    async loadProjectState(projectId: string, saveName: string): Promise<Project> {
        return this.request<Project>(`/projects/${projectId}/load`, {
            method: 'POST',
            body: JSON.stringify({ name: saveName }),
        });
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        return this.request<string[]>(`/projects/${projectId}/saves`);
    }
}

export const apiClient = new ApiClientImpl(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
