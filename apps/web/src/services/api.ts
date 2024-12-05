import { ProjectConfig, ChatMessage, BacklogItem } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface DirectoryEntry {
  path: string;
  name: string;
  type: 'directory' | 'parent';
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Making API request to: ${url}`, {
        method: options.method || 'GET',
        headers: options.headers,
        body: options.body ? JSON.parse(options.body as string) : undefined
      });

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If parsing JSON fails, use status text
          errorMessage = response.statusText || errorMessage;
        }
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          message: errorMessage
        });
        throw new ApiError(response.status, errorMessage);
      }

      const data = await response.json();
      console.log('API response:', data);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('API request error:', error);
      throw new Error(
        error instanceof Error 
          ? `API request failed: ${error.message}`
          : 'Unknown API error occurred'
      );
    }
  }

  // File system endpoints
  async listDirectories(path: string): Promise<DirectoryEntry[]> {
    return this.request(`/files/browse?path=${encodeURIComponent(path)}`);
  }

  async createDirectory(path: string): Promise<{ success: boolean }> {
    return this.request('/files/directory', {
      method: 'POST',
      body: JSON.stringify({ path })
    });
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
    try {
      return await this.request(`/projects/${projectId}/chat`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Chat with AI failed:', error);
      throw new Error(
        error instanceof Error 
          ? `Chat failed: ${error.message}`
          : 'Failed to communicate with AI'
      );
    }
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
