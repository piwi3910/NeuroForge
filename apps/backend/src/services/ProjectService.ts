import fs from 'fs/promises';
import path from 'path';
import { GitService } from './GitService';
import { AIArchitectService } from './AIArchitect';
import { dbService } from './DatabaseService';
import { ProjectWithDetails } from '../types/project';

export class ProjectService {
    private basePath: string;
    private gitService: GitService;
    private aiService: AIArchitectService;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.gitService = new GitService();
        this.aiService = new AIArchitectService();
    }

    async createProject(name: string, description: string, gitRepo?: string): Promise<ProjectWithDetails> {
        try {
            console.log('Creating project:', { name, description, gitRepo });

            // Create project directory
            const projectPath = path.join(this.basePath, name);
            await fs.mkdir(projectPath, { recursive: true });

            // Initialize git repository
            console.log('Initializing git repository at:', projectPath);
            await this.gitService.initRepository(projectPath);
            console.log('Git repository initialized');

            // Create initial files
            await fs.writeFile(path.join(projectPath, '.gitignore'), 'node_modules\n.env\n');
            await fs.writeFile(path.join(projectPath, 'README.md'), `# ${name}\n\n${description}\n`);

            // Create initial commit
            await this.gitService.createInitialCommit(projectPath);

            // Save project to database
            dbService.createProject('initial', name, projectPath, description, gitRepo);
            const projectDetails = dbService.getProjectDetails('initial');

            if (!projectDetails) {
                throw new Error('Failed to create project details');
            }

            console.log('Project created successfully:', projectDetails);
            return projectDetails;
        } catch (error) {
            console.error('Failed to create project:', error);
            throw error;
        }
    }

    async resetProject(projectId: string): Promise<void> {
        try {
            // Try to get project from database
            const project = dbService.getProjectDetails(projectId);
            let projectPath = '';

            if (project) {
                projectPath = project.path;
                // Clear database records
                dbService.deleteProject(projectId);
                dbService.clearChatHistory(projectId);
            } else {
                // If not in database, try to find directory
                projectPath = path.join(this.basePath, 'test');
            }

            // Remove project directory if it exists
            try {
                const stats = await fs.stat(projectPath);
                if (stats.isDirectory()) {
                    console.log(`Removing directory: ${projectPath}`);
                    await fs.rm(projectPath, { recursive: true, force: true });
                }
            } catch (err) {
                // Directory doesn't exist, that's fine
                console.log(`Directory ${projectPath} does not exist`);
            }

            console.log(`Project reset successfully: ${projectId}`);
        } catch (error) {
            console.error('Failed to reset project:', error);
            throw error;
        }
    }

    async updateProjectDescription(projectId: string, description: string): Promise<ProjectWithDetails> {
        try {
            const project = dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Update README.md
            const readmePath = path.join(project.path, 'README.md');
            await fs.writeFile(readmePath, `# ${project.name}\n\n${description}\n`);

            // Update database
            dbService.updateProjectDetails(projectId, { description });

            const updatedProject = dbService.getProjectDetails(projectId);
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
            const project = dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const systemPrompt = await this.aiService.generateSystemPrompt(project.description);
            dbService.updateProjectDetails(projectId, { description: systemPrompt });

            const updatedProject = dbService.getProjectDetails(projectId);
            if (!updatedProject) {
                throw new Error('Failed to get updated project details');
            }

            return updatedProject;
        } catch (error) {
            console.error('Failed to generate system prompt:', error);
            throw error;
        }
    }

    getProject(projectId: string): ProjectWithDetails {
        try {
            const project = dbService.getProjectDetails(projectId);
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
            const project = dbService.getProjectDetails(projectId);
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
