import { MikroORM, EntityManager } from '@mikro-orm/core';
import config from '../../mikro-orm.config';
import { ProjectDatabaseService } from './ProjectDatabaseService';
import { ChatDatabaseService } from './ChatDatabaseService';
import { SaveDatabaseService } from './SaveDatabaseService';

class DatabaseService {
    private orm!: MikroORM;
    private em!: EntityManager;
    private projectService!: ProjectDatabaseService;
    private chatService!: ChatDatabaseService;
    private saveService!: SaveDatabaseService;

    async initialize() {
        this.orm = await MikroORM.init(config);
        this.em = this.orm.em;
        await this.orm.getMigrator().up();

        this.projectService = new ProjectDatabaseService(this.em);
        this.chatService = new ChatDatabaseService(this.em);
        this.saveService = new SaveDatabaseService(this.em);
    }

    // Project Operations
    createProject = this.projectService?.createProject.bind(this.projectService);
    getProjectDetails = this.projectService?.getProjectDetails.bind(this.projectService);
    updateProjectDetails = this.projectService?.updateProjectDetails.bind(this.projectService);
    deleteProject = this.projectService?.deleteProject.bind(this.projectService);

    // Chat Operations
    clearChatHistory = this.chatService?.clearChatHistory.bind(this.chatService);
    getChatMessages = this.chatService?.getChatMessages.bind(this.chatService);
    saveChatMessage = this.chatService?.saveChatMessage.bind(this.chatService);

    // Save Operations
    saveProjectState = this.saveService?.saveProjectState.bind(this.saveService);
    loadProjectState = this.saveService?.loadProjectState.bind(this.saveService);
    listProjectSaves = this.saveService?.listProjectSaves.bind(this.saveService);
    getAllProjectSaves = this.saveService?.getAllProjectSaves.bind(this.saveService);
}

export const dbService = new DatabaseService();
