import fs from 'fs/promises';
import path from 'path';
import { ProjectWithDetails } from '../../types/project';
import { ProjectUpdateService, ProjectServiceDependencies } from './types';

export class ProjectUpdateServiceImpl implements ProjectUpdateService {
    private gitService: ProjectServiceDependencies['gitService'];
    private aiService: ProjectServiceDependencies['aiService'];
    private dbService: ProjectServiceDependencies['dbService'];

    constructor(deps: ProjectServiceDependencies) {
        this.gitService = deps.gitService;
        this.aiService = deps.aiService;
        this.dbService = deps.dbService;
    }

    async updateProjectDescription(projectId: string, description: string): Promise<ProjectWithDetails> {
        try {
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Update README.md
            const readmePath = path.join(project.path, 'README.md');
            await fs.writeFile(readmePath, `# ${project.name}\n\n${description}\n`);

            // Update database
            await this.dbService.updateProjectDetails(projectId, { description });

            const updatedProject = await this.dbService.getProjectDetails(projectId);
            if (!updatedProject) {
                throw new Error('Failed to get updated project details');
            }

            return updatedProject;
        } catch (error) {
            console.error('Failed to update project description:', error);
            throw error;
        }
    }

    async generateSystemPrompt(projectId: string): Promise<ProjectWithDetails> {
        try {
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const systemPrompt = await this.aiService.generateSystemPrompt(project.description || '');
            await this.dbService.updateProjectDetails(projectId, { description: systemPrompt });

            const updatedProject = await this.dbService.getProjectDetails(projectId);
            if (!updatedProject) {
                throw new Error('Failed to get updated project details');
            }

            return updatedProject;
        } catch (error) {
            console.error('Failed to generate system prompt:', error);
            throw error;
        }
    }

    async getProject(projectId: string): Promise<ProjectWithDetails> {
        try {
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            console.error('Failed to get project:', error);
            throw error;
        }
    }

    async commitProjectChanges(projectId: string, message: string): Promise<void> {
        try {
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            await this.gitService.commitChanges(project.path, message);
        } catch (error) {
            console.error('Failed to commit changes:', error);
            throw error;
        }
    }
}
