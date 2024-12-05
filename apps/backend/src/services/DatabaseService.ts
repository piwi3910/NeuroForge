import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Project, ChatMessage, ProjectSave } from '../entities';
import config from '../mikro-orm.config';
import { ProjectWithDetails } from '../types/project';

class DatabaseService {
    private orm: MikroORM | null = null;
    private em: EntityManager | null = null;

    async initialize() {
        if (this.orm) {
            return;
        }

        try {
            this.orm = await MikroORM.init(config);
            this.em = this.orm.em.fork();

            // Run migrations
            const migrator = this.orm.getMigrator();
            await migrator.up();

            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    async createProject(id: string, name: string, projectPath: string, description?: string, gitRepo?: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = new Project();
        project.id = id;
        project.name = name;
        project.path = projectPath;
        project.description = description;
        project.gitRepo = gitRepo;

        await this.em.persistAndFlush(project);
    }

    async getProjectDetails(projectId: string): Promise<ProjectWithDetails | null> {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = await this.em.findOne(Project, { id: projectId });

        if (!project) {
            return null;
        }

        return {
            id: project.id,
            name: project.name,
            path: project.path,
            description: project.description,
            git_repo: project.gitRepo,
            details: {
                name: project.name,
                description: project.description,
                stack: null,
                status: {
                    name: 'incomplete',
                    description: 'incomplete',
                    stack: 'incomplete'
                }
            }
        };
    }

    async updateProjectDetails(projectId: string, updates: Partial<ProjectWithDetails>) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = await this.em.findOne(Project, { id: projectId });
        if (!project) {
            throw new Error('Project not found');
        }

        if (updates.name !== undefined) {
            project.name = updates.name;
        }
        if (updates.description !== undefined) {
            project.description = updates.description;
        }
        if (updates.git_repo !== undefined) {
            project.gitRepo = updates.git_repo;
        }

        await this.em.flush();
    }

    async deleteProject(projectId: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = await this.em.findOne(Project, { id: projectId });
        if (project) {
            await this.em.removeAndFlush(project);
        }
    }

    async saveChatMessage(projectId: string, role: string, content: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = await this.em.findOne(Project, { id: projectId });
        if (!project) {
            throw new Error('Project not found');
        }

        const message = new ChatMessage();
        message.project = project;
        message.role = role;
        message.content = content;

        await this.em.persistAndFlush(message);
    }

    async getChatMessages(projectId: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const messages = await this.em.find(ChatMessage, { project: projectId }, {
            orderBy: { timestamp: 'ASC' }
        });

        return messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
        }));
    }

    async clearChatHistory(projectId: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        await this.em.nativeDelete(ChatMessage, { project: projectId });
    }

    async saveProjectState(projectId: string, name: string, data: string) {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const project = await this.em.findOne(Project, { id: projectId });
        if (!project) {
            throw new Error('Project not found');
        }

        const save = new ProjectSave();
        save.project = project;
        save.name = name;
        save.data = data;

        await this.em.persistAndFlush(save);
    }

    async loadProjectState(projectId: string, name: string): Promise<string | null> {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const save = await this.em.findOne(ProjectSave, {
            project: projectId,
            name
        });

        return save ? save.data : null;
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const saves = await this.em.find(ProjectSave, { project: projectId }, {
            orderBy: { createdAt: 'DESC' }
        });

        return saves.map(save => save.name);
    }

    async getAllProjectSaves(): Promise<number> {
        if (!this.em) {
            throw new Error('Database not initialized');
        }

        const count = await this.em.count(ProjectSave);
        return count;
    }
}

export const dbService = new DatabaseService();
