import { Project } from '../../types/api';
import { BaseApiClient } from './base';

export class StateOperations extends BaseApiClient {
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

    async getTotalSavedProjects(): Promise<number> {
        const response = await this.request<{ count: number }>('/projects/saves/count');
        return response.count;
    }
}
