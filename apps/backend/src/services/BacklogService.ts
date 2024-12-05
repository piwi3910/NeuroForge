import { BacklogItem, BacklogFilter, BacklogUpdate, ItemType, ItemStatus } from '../types/backlog';
import { AIArchitectService } from './AIArchitect';

export class BacklogService {
  private items: Map<string, BacklogItem>;
  private aiArchitect: AIArchitectService;

  constructor() {
    this.items = new Map();
    this.aiArchitect = new AIArchitectService();
  }

  async generateBacklogItems(
    projectId: string,
    projectDescription: string,
    systemPrompt: string
  ): Promise<BacklogItem[]> {
    try {
      const generatedItems = await this.aiArchitect.generateBacklogItems(
        projectDescription,
        systemPrompt
      );

      // Store the generated items
      generatedItems.forEach(item => {
        const backlogItem: BacklogItem = {
          ...item,
          id: this.generateId(),
          projectId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'AI-Architect',
          order: this.getNextOrder(),
          status: 'Backlog'
        };
        this.items.set(backlogItem.id, backlogItem);
      });

      return generatedItems;
    } catch (error) {
      console.error('Failed to generate backlog items:', error);
      throw new Error('Failed to generate backlog items');
    }
  }

  createItem(
    projectId: string,
    type: ItemType,
    title: string,
    description: string,
    priority: BacklogItem['priority'],
    epicId?: string,
    storyId?: string
  ): BacklogItem {
    const item: BacklogItem = {
      id: this.generateId(),
      projectId,
      type,
      title,
      description,
      priority,
      status: 'Backlog',
      epicId,
      storyId,
      order: this.getNextOrder(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user'
    };

    this.items.set(item.id, item);
    return item;
  }

  getItems(filter: BacklogFilter): BacklogItem[] {
    let filteredItems = Array.from(this.items.values());

    if (filter.projectId) {
      filteredItems = filteredItems.filter(item => item.projectId === filter.projectId);
    }

    if (filter.type) {
      filteredItems = filteredItems.filter(item => item.type === filter.type);
    }

    if (filter.status) {
      filteredItems = filteredItems.filter(item => item.status === filter.status);
    }

    if (filter.epicId) {
      filteredItems = filteredItems.filter(item => item.epicId === filter.epicId);
    }

    if (filter.storyId) {
      filteredItems = filteredItems.filter(item => item.storyId === filter.storyId);
    }

    if (filter.assignedTo) {
      filteredItems = filteredItems.filter(item => item.assignedTo === filter.assignedTo);
    }

    if (filter.labels) {
      filteredItems = filteredItems.filter(item => 
        item.labels?.some(label => filter.labels?.includes(label))
      );
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    return filteredItems.sort((a, b) => a.order - b.order);
  }

  updateItem(id: string, update: BacklogUpdate): BacklogItem {
    const item = this.items.get(id);
    if (!item) {
      throw new Error('Item not found');
    }

    const updatedItem = {
      ...item,
      ...update,
      updatedAt: new Date()
    };

    this.items.set(id, updatedItem);
    return updatedItem;
  }

  updateStatus(id: string, status: ItemStatus): BacklogItem {
    return this.updateItem(id, { status });
  }

  deleteItem(id: string): void {
    if (!this.items.delete(id)) {
      throw new Error('Item not found');
    }
  }

  getItemHierarchy(projectId: string): {
    epics: BacklogItem[];
    stories: Record<string, BacklogItem[]>;
    tasks: Record<string, BacklogItem[]>;
  } {
    const items = this.getItems({ projectId });
    const epics = items.filter(item => item.type === 'epic');
    const stories: Record<string, BacklogItem[]> = {};
    const tasks: Record<string, BacklogItem[]> = {};

    items
      .filter(item => item.type === 'story')
      .forEach(story => {
        if (story.epicId) {
          if (!stories[story.epicId]) {
            stories[story.epicId] = [];
          }
          stories[story.epicId].push(story);
        }
      });

    items
      .filter(item => item.type === 'task')
      .forEach(task => {
        if (task.storyId) {
          if (!tasks[task.storyId]) {
            tasks[task.storyId] = [];
          }
          tasks[task.storyId].push(task);
        }
      });

    return { epics, stories, tasks };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getNextOrder(): number {
    const items = Array.from(this.items.values());
    return items.length > 0 
      ? Math.max(...items.map(item => item.order)) + 1 
      : 0;
  }
}
