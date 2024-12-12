import { ProjectWithDetails } from '../../types/project';
import { ProjectStateService, ProjectServiceDependencies } from './types';

export class ProjectStateServiceImpl implements ProjectStateService {
    private gitService: ProjectServiceDependencies['gitService'];
    private dbService: ProjectServiceDependencies['dbService'];

    constructor(deps: ProjectServiceDependencies) {
        this.gitService = deps.gitService;
        this.dbService = deps.dbService;
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        try {
            return await this.dbService.listProjectSaves(projectId);
        } catch (error) {
            console.error('Failed to list project saves:', error);
            return [];
        }
    }

    async getTotalSavedProjects(): Promise<number> {
        try {
            return await this.dbService.getAllProjectSaves();
        } catch (error) {
            console.error('Failed to get total saved projects:', error);
            return 0;
        }
    }

    async saveProjectState(projectId: string, saveName: string): Promise<void> {
        try {
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Get current project state
            const messages = await this.dbService.getChatMessages(projectId);
            const saveData = {
                project,
                messages,
                timestamp: new Date()
            };

            // Save state to database
            await this.dbService.saveProjectState(projectId, saveName, JSON.stringify(saveData));

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
            const project = await this.dbService.getProjectDetails(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            // Load save data from database
            const saveData = await this.dbService.loadProjectState(projectId, saveName);
            if (!saveData) {
                throw new Error('Save state not found');
            }

            const parsedData = JSON.parse(saveData);

            // Restore project state in database
            await this.dbService.deleteProject(projectId);
            await this.dbService.clearChatHistory(projectId);

            await this.dbService.createProject(
                projectId,
                parsedData.project.name,
                parsedData.project.path,
                parsedData.project.description,
                parsedData.project.git_repo
            );

            // Restore chat messages
            for (const message of parsedData.messages) {
                await this.dbService.saveChatMessage(projectId, message.role, message.content);
            }

            // Checkout git tag
            await this.gitService.checkoutTag(project.path, `save-${saveName}`);

            const updatedProject = await this.dbService.getProjectDetails(projectId);
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
