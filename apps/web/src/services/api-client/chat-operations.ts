import { ChatResponse } from '../../types/api';
import { BaseApiClient } from './base';

export class ChatOperations extends BaseApiClient {
    async chatWithAI(projectId: string, message: string): Promise<ChatResponse> {
        return this.request<ChatResponse>(`/projects/${projectId}/chat`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    }
}
