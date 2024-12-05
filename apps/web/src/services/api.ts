import { ProjectConfig, ChatMessage, BacklogItem } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Project endpoints
  async createProject(
    name: string,
    description: string,
    gitRepo?: string
  ): Promise<ProjectConfig> {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description, gitRepo }),
    });
  }

  async updateProjectDescription(
    projectId: string,
    description: string
  ): Promise<ProjectConfig> {
    return this.request(`/projects/${projectId}/description`, {
      method: 'PUT',
      body: JSON.stringify({ description }),
    });
  }

  async generateSystemPrompt(projectId: string): Promise<ProjectConfig> {
    return this.request(`/projects/${projectId}/system-prompt`, {
      method: 'POST',
    });
  }

  async chatWithAI(projectId: string, message: string): Promise<ChatMessage> {
    return this.request(`/projects/${projectId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getProject(projectId: string): Promise<ProjectConfig> {
    return this.request(`/projects/${projectId}`);
  }

  async commitProjectChanges(
    projectId: string,
    message: string
  ): Promise<{ success: boolean }> {
    return this.request(`/projects/${projectId}/commit`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Backlog endpoints
  async createBacklogItem(
    projectId: string,
    item: Partial<BacklogItem>
  ): Promise<BacklogItem> {
    return this.request('/backlog', {
      method: 'POST',
      body: JSON.stringify({ projectId, ...item }),
    });
  }

  async getBacklogItems(projectId: string): Promise<BacklogItem[]> {
    return this.request(`/backlog?projectId=${projectId}`);
  }

  async updateBacklogItem(
    itemId: string,
    update: Partial<BacklogItem>
  ): Promise<BacklogItem> {
    return this.request(`/backlog/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }

  async updateItemStatus(
    itemId: string,
    status: BacklogItem['status']
  ): Promise<BacklogItem> {
    return this.request(`/backlog/${itemId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteBacklogItem(itemId: string): Promise<{ success: boolean }> {
    return this.request(`/backlog/${itemId}`, {
      method: 'DELETE',
    });
  }

  async getItemHierarchy(projectId: string): Promise<{
    epics: BacklogItem[];
    stories: Record<string, BacklogItem[]>;
    tasks: Record<string, BacklogItem[]>;
  }> {
    return this.request(`/backlog/hierarchy/${projectId}`);
  }

  async generateBacklogItems(
    projectId: string,
    projectDescription: string,
    systemPrompt: string
  ): Promise<BacklogItem[]> {
    return this.request('/backlog/generate', {
      method: 'POST',
      body: JSON.stringify({
        projectId,
        projectDescription,
        systemPrompt,
      }),
    });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
