import path from 'path';
import { GitService } from './GitService';
import { AIArchitectService } from './AIArchitect';
import { dbService } from './DatabaseService';
import { ProjectWithDetails } from '../types/project';
import { ProjectCreationServiceImpl } from './project-service/ProjectCreationService';
import { ProjectStateServiceImpl } from './project-service/ProjectStateService';
import { ProjectUpdateServiceImpl } from './project-service/ProjectUpdateService';
import { ProjectServiceDependencies } from './project-service/types';

class ProjectService {
    private creationService: ProjectCreationServiceImpl;
    private stateService: ProjectStateServiceImpl;
    private updateService: ProjectUpdateServiceImpl;

    constructor(basePath: string) {
        const dependencies: ProjectServiceDependencies = {
            basePath,
            gitService: new GitService(),
            aiService: new AIArchitectService(),
            dbService
        };

        this.creationService = new ProjectCreationServiceImpl(dependencies);
        this.stateService = new ProjectStateServiceImpl(dependencies);
        this.updateService = new ProjectUpdateServiceImpl(dependencies);
    }

    // Project Creation
    async createProject(name: string, description: string, gitRepo?: string): Promise<ProjectWithDetails> {
        return this.creationService.createProject(name, description, gitRepo);
    }

    async resetProject(projectId: string): Promise<void> {
        return this.creationService.resetProject(projectId);
    }

    // Project State Management
    async listProjectSaves(projectId: string): Promise<string[]> {
        return this.stateService.listProjectSaves(projectId);
    }

    async getTotalSavedProjects(): Promise<number> {
        return this.stateService.getTotalSavedProjects();
    }

    async saveProjectState(projectId: string, saveName: string): Promise<void> {
        return this.stateService.saveProjectState(projectId, saveName);
    }

    async loadProjectState(projectId: string, saveName: string): Promise<ProjectWithDetails> {
        return this.stateService.loadProjectState(projectId, saveName);
    }

    // Project Updates
    async updateProjectDescription(projectId: string, description: string): Promise<ProjectWithDetails> {
        return this.updateService.updateProjectDescription(projectId, description);
    }

    async generateSystemPrompt(projectId: string): Promise<ProjectWithDetails> {
        return this.updateService.generateSystemPrompt(projectId);
    }

    async getProject(projectId: string): Promise<ProjectWithDetails> {
        return this.updateService.getProject(projectId);
    }

    async commitProjectChanges(projectId: string, message: string): Promise<void> {
        return this.updateService.commitProjectChanges(projectId, message);
    }
}

export const projectService = new ProjectService(process.env.BASE_PROJECTS_PATH || path.join(process.cwd(), '../../projects'));
