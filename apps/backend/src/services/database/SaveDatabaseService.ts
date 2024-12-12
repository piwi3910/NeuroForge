import { EntityManager } from '@mikro-orm/core';
import { ProjectSave } from '../../entities';
import { ProjectDatabaseService } from './ProjectDatabaseService';

export class SaveDatabaseService {
    private projectService: ProjectDatabaseService;

    constructor(private em: EntityManager) {
        this.projectService = new ProjectDatabaseService(em);
    }

    async saveProjectState(id: string, name: string, data: string): Promise<void> {
        const project = await this.projectService.getProject(id);
        if (!project) throw new Error('Project not found');

        const save = new ProjectSave();
        save.project = project;
        save.name = name;
        save.data = data;
        save.createdAt = new Date();

        await this.em.persistAndFlush(save);
    }

    async loadProjectState(id: string, name: string): Promise<string | null> {
        const project = await this.projectService.getProject(id);
        if (!project) return null;

        const save = await this.em.findOne(ProjectSave, { project, name });
        return save?.data || null;
    }

    async listProjectSaves(id: string): Promise<string[]> {
        const project = await this.projectService.getProject(id);
        if (!project) return [];

        const saves = await this.em.find(ProjectSave, { project });
        return saves.map(save => save.name);
    }

    async getAllProjectSaves(): Promise<number> {
        return await this.em.count(ProjectSave);
    }
}
