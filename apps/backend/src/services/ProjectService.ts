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

    async saveProjectState(projectId: string, saveName: string): Promise<void> {
        try {
            const project = dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Create saves directory if it doesn't exist
            const savesDir = path.join(project.path, '.saves');
            await fs.mkdir(savesDir, { recursive: true });

            // Save project state
            const saveData = {
                project,
                messages: dbService.getChatMessages(projectId),
                timestamp: new Date()
            };

            await fs.writeFile(
                path.join(savesDir, `${saveName}.json`),
                JSON.stringify(saveData, null, 2)
            );

            // Create git tag for the save
            await this.gitService.commitChanges(project.path, `Save state: ${saveName}`);
            await this.gitService.createTag(project.path, `save-${saveName}`);
        } catch (error) {
            console.error('Failed to save project state:', error);
            throw error;
        }
    }

    async loadProjectState(projectId: string, saveName: string): Promise<ProjectWithDetails> {
        try {
            const project = dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Load save file
            const savePath = path.join(project.path, '.saves', `${saveName}.json`);
            const saveContent = await fs.readFile(savePath, 'utf-8');
            const saveData = JSON.parse(saveContent);

            // Restore project state in database
            dbService.deleteProject(projectId);
            dbService.clearChatHistory(projectId);

            dbService.createProject(
                projectId,
                saveData.project.name,
                saveData.project.path,
                saveData.project.description,
                saveData.project.git_repo
            );

            // Restore chat messages
            for (const message of saveData.messages) {
                dbService.saveChatMessage(projectId, message.role, message.content);
            }

            // Checkout git tag
            await this.gitService.checkoutTag(project.path, `save-${saveName}`);

            return dbService.getProjectDetails(projectId) as ProjectWithDetails;
        } catch (error) {
            console.error('Failed to load project state:', error);
            throw error;
        }
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        try {
            const project = dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const savesDir = path.join(project.path, '.saves');
            try {
                const files = await fs.readdir(savesDir);
                return files
                    .filter(file => file.endsWith('.json'))
                    .map(file => file.replace('.json', ''));
            } catch (error) {
                // Directory doesn't exist, return empty list
                return [];
            }
        } catch (error) {
            console.error('Failed to list project saves:', error);
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
