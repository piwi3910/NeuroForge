import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { GitService } from './GitService';
import { AIArchitectService } from './AIArchitect';
import { dbService } from './DatabaseService';
import { ProjectWithDetails } from '../types/project';

class ProjectService {
    private basePath: string;
    private gitService: GitService;
    private aiService: AIArchitectService;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.gitService = new GitService();
        this.aiService = new AIArchitectService();
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        try {
            return await dbService.listProjectSaves(projectId);
        } catch (error) {
            console.error('Failed to list project saves:', error);
            return [];
        }
    }

    async getTotalSavedProjects(): Promise<number> {
        try {
            return await dbService.getAllProjectSaves();
        } catch (error) {
            console.error('Failed to get total saved projects:', error);
            return 0;
        }
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

            // Generate unique project ID
            const projectId = uuidv4();

            // Save project to database
            await dbService.createProject(projectId, name, projectPath, description, gitRepo);
            const projectDetails = await dbService.getProjectDetails(projectId);

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
            const project = await dbService.getProjectDetails(projectId);
            let projectPath = '';

            if (project) {
                projectPath = project.path;
                // Clear database records
                await dbService.deleteProject(projectId);
                await dbService.clearChatHistory(projectId);
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
            const project = await dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Update README.md
            const readmePath = path.join(project.path, 'README.md');
            await fs.writeFile(readmePath, `# ${project.name}\n\n${description}\n`);

            // Update database
            await dbService.updateProjectDetails(projectId, { description });

            const updatedProject = await dbService.getProjectDetails(projectId);
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
            const project = await dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const systemPrompt = await this.aiService.generateSystemPrompt(project.description || '');
            await dbService.updateProjectDetails(projectId, { description: systemPrompt });

            const updatedProject = await dbService.getProjectDetails(projectId);
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
            const project = await dbService.getProjectDetails(projectId);
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
            const project = await dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            await this.gitService.commitChanges(project.path, message);
        } catch (error) {
            console.error('Failed to commit changes:', error);
            throw error;
        }
    }

    async saveProjectState(projectId: string, saveName: string): Promise<void> {
        try {
            const project = await dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Get current project state
            const messages = await dbService.getChatMessages(projectId);
            const saveData = {
                project,
                messages,
                timestamp: new Date()
            };

            // Save state to database
            await dbService.saveProjectState(projectId, saveName, JSON.stringify(saveData));

            // Ensure we have a commit before creating a tag
            try {
                await this.gitService.commitChanges(project.path, `Save state: ${saveName}`);
            } catch (error) {
                // If there are no changes to commit, that's fine
                console.log('No changes to commit');
            }

            // Create git tag for the save
            await this.gitService.createTag(project.path, `save-${saveName}`);
        } catch (error) {
            console.error('Failed to save project state:', error);
            throw error;
        }
    }

    async loadProjectState(projectId: string, saveName: string): Promise<ProjectWithDetails> {
        try {
            const project = await dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Load save data from database
            const saveData = await dbService.loadProjectState(projectId, saveName);
            if (!saveData) {
                throw new Error('Save state not found');
            }

            const parsedData = JSON.parse(saveData);

            // Restore project state in database
            await dbService.deleteProject(projectId);
            await dbService.clearChatHistory(projectId);

            await dbService.createProject(
                projectId,
                parsedData.project.name,
                parsedData.project.path,
                parsedData.project.description,
                parsedData.project.git_repo
            );

            // Restore chat messages
            for (const message of parsedData.messages) {
                await dbService.saveChatMessage(projectId, message.role, message.content);
            }

            // Checkout git tag
            await this.gitService.checkoutTag(project.path, `save-${saveName}`);

            const updatedProject = await dbService.getProjectDetails(projectId);
            if (!updatedProject) {
                throw new Error('Failed to get updated project details');
            }

            return updatedProject;
        } catch (error) {
            console.error('Failed to load project state:', error);
            throw error;
        }
    }
}

export const projectService = new ProjectService(process.env.BASE_PROJECTS_PATH || path.join(process.cwd(), '../../projects'));
