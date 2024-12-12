import { EntityManager } from '@mikro-orm/core';
import { ChatMessage as ChatMessageEntity } from '../../entities';
import { ChatMessage } from '../project-service/types';
import { ProjectDatabaseService } from './ProjectDatabaseService';

export class ChatDatabaseService {
    private projectService: ProjectDatabaseService;

    constructor(private em: EntityManager) {
        this.projectService = new ProjectDatabaseService(em);
    }

    async clearChatHistory(id: string): Promise<void> {
        const project = await this.projectService.getProject(id);
        if (!project) throw new Error('Project not found');

        await this.em.nativeDelete(ChatMessageEntity, { project });
    }

    async getChatMessages(id: string): Promise<ChatMessage[]> {
        const project = await this.projectService.getProject(id);
        if (!project) return [];

        const messages = await this.em.find(ChatMessageEntity, { project });
        return messages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
            timestamp: msg.timestamp
        }));
    }

    async saveChatMessage(id: string, role: 'user' | 'assistant', content: string): Promise<void> {
        const project = await this.projectService.getProject(id);
        if (!project) throw new Error('Project not found');

        const message = new ChatMessageEntity();
        message.project = project;
        message.role = role;
        message.content = content;
        message.timestamp = new Date();

        await this.em.persistAndFlush(message);
    }
}
