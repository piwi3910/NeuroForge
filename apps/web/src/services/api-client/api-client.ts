import { ApiClient as IApiClient } from '../../types/api';
import { BaseApiClient } from './base';
import { ProjectOperations } from './project-operations';
import { ChatOperations } from './chat-operations';
import { StateOperations } from './state-operations';

export class ApiClient extends BaseApiClient implements IApiClient {
    private projectOps: ProjectOperations;
    private chatOps: ChatOperations;
    private stateOps: StateOperations;

    constructor(baseUrl: string) {
        super(baseUrl);
        this.projectOps = new ProjectOperations(baseUrl);
        this.chatOps = new ChatOperations(baseUrl);
        this.stateOps = new StateOperations(baseUrl);
    }

    // Project Operations
    async createProject(name: string, description: string, gitRepo?: string) {
        return this.projectOps.createProject(name, description, gitRepo);
    }

    async resetProject(projectId: string) {
        return this.projectOps.resetProject(projectId);
    }

    async updateProjectDescription(projectId: string, description: string) {
        return this.projectOps.updateProjectDescription(projectId, description);
    }

    async generateSystemPrompt(projectId: string) {
        return this.projectOps.generateSystemPrompt(projectId);
    }

    async getProject(projectId: string) {
        return this.projectOps.getProject(projectId);
    }

    async commitProjectChanges(projectId: string, message: string) {
        return this.projectOps.commitProjectChanges(projectId, message);
    }

    // Chat Operations
    async chatWithAI(projectId: string, message: string) {
        return this.chatOps.chatWithAI(projectId, message);
    }

    // State Operations
    async saveProjectState(projectId: string, saveName: string) {
        return this.stateOps.saveProjectState(projectId, saveName);
    }

    async loadProjectState(projectId: string, saveName: string) {
        return this.stateOps.loadProjectState(projectId, saveName);
    }

    async listProjectSaves(projectId: string) {
        return this.stateOps.listProjectSaves(projectId);
    }

    async getTotalSavedProjects() {
        return this.stateOps.getTotalSavedProjects();
    }
}
