import { EntityManager } from '@mikro-orm/core';
import { Project } from '../../entities';
import { ProjectWithDetails, ProjectDetails } from '../../types/project';

export class ProjectDatabaseService {
    constructor(private em: EntityManager) {}

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

    async getProject(id: string): Promise<Project | null> {
        return await this.em.findOne(Project, { id });
    }
}
