import { BacklogItem, ItemStatus, ItemPriority, ItemType } from '../types/backlog';
import { AIArchitectService } from './AIArchitect';

export class BacklogService {
  private backlogItems: Map<string, BacklogItem>;
  private aiArchitect: AIArchitectService;

  constructor(aiArchitect: AIArchitectService) {
    this.backlogItems = new Map();
    this.aiArchitect = aiArchitect;
  }

  async createItem(item: Partial<BacklogItem>): Promise<BacklogItem> {
    const newItem: BacklogItem = {
      id: this.generateId(),
      projectId: item.projectId!,
      type: item.type!,
      title: item.title!,
      description: item.description!,
      status: item.status || 'To Do',
      priority: item.priority!,
      order: item.order || 0,
      parentId: item.parentId,
      createdBy: item.createdBy!,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.backlogItems.set(newItem.id, newItem);
    return newItem;
  }

  async generateBacklogItems(
    projectId: string,
    projectDescription: string,
    systemPrompt: string
  ): Promise<BacklogItem[]> {
    try {
      // For now, return a mock backlog item
      const mockItem: BacklogItem = {
        id: this.generateId(),
        projectId,
        type: 'Epic',
        title: 'Initial Project Setup',
        description: 'Set up the basic project structure and dependencies',
        status: 'To Do',
        priority: 'High',
        order: 0,
        createdBy: 'system',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return [mockItem];
    } catch (error) {
      console.error('Failed to generate backlog items:', error);
      throw error;
    }
  }

  getItem(id: string): BacklogItem {
    const item = this.backlogItems.get(id);
    if (!item) {
      throw new Error('Backlog item not found');
    }
    return item;
  }

  getItems(projectId: string): BacklogItem[] {
    return Array.from(this.backlogItems.values())
      .filter(item => item.projectId === projectId);
  }

  async updateItem(id: string, update: Partial<BacklogItem>): Promise<BacklogItem> {
    const item = this.getItem(id);
    const updatedItem = {
      ...item,
      ...update,
      updatedAt: new Date()
    };
    this.backlogItems.set(id, updatedItem);
    return updatedItem;
  }

  async updateStatus(id: string, status: ItemStatus): Promise<BacklogItem> {
    return this.updateItem(id, { status });
  }

  async deleteItem(id: string): Promise<void> {
    if (!this.backlogItems.has(id)) {
      throw new Error('Backlog item not found');
    }
    this.backlogItems.delete(id);
  }

  async getItemHierarchy(projectId: string): Promise<{
    epics: BacklogItem[];
    stories: Record<string, BacklogItem[]>;
    tasks: Record<string, BacklogItem[]>;
  }> {
    const items = this.getItems(projectId);
    const epics = items.filter(item => item.type === 'Epic');
    const stories = items.filter(item => item.type === 'Story');
    const tasks = items.filter(item => item.type === 'Task');

    const storiesByEpic: Record<string, BacklogItem[]> = {};
    const tasksByStory: Record<string, BacklogItem[]> = {};

    epics.forEach(epic => {
      storiesByEpic[epic.id] = stories.filter(story => story.parentId === epic.id);
    });

    stories.forEach(story => {
      tasksByStory[story.id] = tasks.filter(task => task.parentId === story.id);
    });

    return {
      epics,
      stories: storiesByEpic,
      tasks: tasksByStory
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
