import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProjectWithDetails } from '../../types/project';
import { ProjectCreationService, ProjectServiceDependencies } from './types';

export class ProjectCreationServiceImpl implements ProjectCreationService {
    private basePath: string;
    private gitService: ProjectServiceDependencies['gitService'];
    private dbService: ProjectServiceDependencies['dbService'];

    constructor(deps: ProjectServiceDependencies) {
        this.basePath = deps.basePath;
        this.gitService = deps.gitService;
        this.dbService = deps.dbService;
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
            await this.dbService.createProject(projectId, name, projectPath, description, gitRepo);
            const projectDetails = await this.dbService.getProjectDetails(projectId);

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
            const project = await this.dbService.getProjectDetails(projectId);
            let projectPath = '';

            if (project) {
                projectPath = project.path;
                // Clear database records
                await this.dbService.deleteProject(projectId);
                await this.dbService.clearChatHistory(projectId);
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
}
