import { MikroORM, EntityManager } from '@mikro-orm/core';
import { Project, ProjectSave, ChatMessage as ChatMessageEntity } from '../entities';
import { ProjectWithDetails, ProjectDetails } from '../types/project';
import { ChatMessage } from './project-service/types';
import config from '../mikro-orm.config';

class DatabaseService {
    private orm!: MikroORM;
    private em!: EntityManager;

    async initialize() {
        this.orm = await MikroORM.init(config);
        this.em = this.orm.em;
        await this.orm.getMigrator().up();
    }

    async createProject(id: string, name: string, path: string, description: string, gitRepo?: string): Promise<void> {
        const project = new Project();
        project.id = id;
        project.name = name;
        project.path = path;
        project.description = description;
        project.gitRepo = gitRepo;

        await this.em.persistAndFlush(project);
    }

    async getProjectDetails(id: string): Promise<ProjectWithDetails | null> {
        const project = await this.em.findOne(Project, { id });
        if (!project) return null;

        const defaultDetails: ProjectDetails = {
            name: project.name,
            description: project.description || null,
            stack: null,
            status: {
                name: 'incomplete',
                description: 'incomplete',
                stack: 'incomplete'
            }
        };

        return {
            id: project.id,
            name: project.name,
            path: project.path,
            description: project.description || null,
            git_repo: project.gitRepo || null,
            details: defaultDetails
        };
    }

    async updateProjectDetails(id: string, details: Partial<ProjectWithDetails>): Promise<void> {
        const project = await this.em.findOne(Project, { id });
        if (!project) throw new Error('Project not found');

        if (details.description !== undefined) {
            project.description = details.description || undefined;
        }
        if (details.git_repo !== undefined) {
            project.gitRepo = details.git_repo || undefined;
        }

        await this.em.flush();
    }

    async deleteProject(id: string): Promise<void> {
        const project = await this.em.findOne(Project, { id });
        if (project) {
            await this.em.removeAndFlush(project);
        }
    }

    async clearChatHistory(id: string): Promise<void> {
        const project = await this.em.findOne(Project, { id });
        if (!project) throw new Error('Project not found');

        await this.em.nativeDelete(ChatMessageEntity, { project });
    }

    async getChatMessages(id: string): Promise<ChatMessage[]> {
        const project = await this.em.findOne(Project, { id });
        if (!project) return [];

        const messages = await this.em.find(ChatMessageEntity, { project });
        return messages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            timestamp: msg.timestamp
        }));
    }

    async saveChatMessage(id: string, role: 'user' | 'assistant', content: string): Promise<void> {
        const project = await this.em.findOne(Project, { id });
        if (!project) throw new Error('Project not found');

        const message = new ChatMessageEntity();
        message.project = project;
        message.role = role;
        message.content = content;
        message.timestamp = new Date();

        await this.em.persistAndFlush(message);
    }

    async saveProjectState(id: string, name: string, data: string): Promise<void> {
        const project = await this.em.findOne(Project, { id });
        if (!project) throw new Error('Project not found');

        const save = new ProjectSave();
        save.project = project;
        save.name = name;
        save.data = data;
        save.createdAt = new Date();

        await this.em.persistAndFlush(save);
    }

    async loadProjectState(id: string, name: string): Promise<string | null> {
        const project = await this.em.findOne(Project, { id });
        if (!project) return null;

        const save = await this.em.findOne(ProjectSave, { project, name });
        return save?.data || null;
    }

    async listProjectSaves(id: string): Promise<string[]> {
        const project = await this.em.findOne(Project, { id });
        if (!project) return [];

        const saves = await this.em.find(ProjectSave, { project });
        return saves.map(save => save.name);
    }

    async getAllProjectSaves(): Promise<number> {
        return await this.em.count(ProjectSave);
    }
}

export const dbService = new DatabaseService();
