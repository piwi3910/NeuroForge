import { Project } from '../../types/api';
import { BaseApiClient } from './base';

export class ProjectOperations extends BaseApiClient {
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

    async getProject(projectId: string): Promise<Project> {
        return this.request<Project>(`/projects/${projectId}`);
    }

    async commitProjectChanges(projectId: string, message: string): Promise<void> {
        await this.request(`/projects/${projectId}/commit`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    }
}
