export type ItemType = 'epic' | 'story' | 'task';
export type ItemPriority = 'High' | 'Medium' | 'Low';
export type ItemStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Done';

export interface BacklogItem {
  id: string;
  projectId: string;
  type: ItemType;
  title: string;
  description: string;
  priority: ItemPriority;
  status: ItemStatus;
  epicId?: string;    // For stories and tasks
  storyId?: string;   // For tasks
  order: number;      // For sorting within the same level
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;  // User ID or 'AI-Architect'
  assignedTo?: string;
  estimatedEffort?: number;
  labels?: string[];
}

export interface Epic extends BacklogItem {
  type: 'epic';
}

export interface Story extends BacklogItem {
  type: 'story';
  epicId: string;
  acceptanceCriteria?: string[];
}

export interface Task extends BacklogItem {
  type: 'task';
  epicId: string;
  storyId: string;
  checklist?: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

export interface BacklogFilter {
  projectId?: string;
  type?: ItemType;
  priority?: ItemPriority;
  status?: ItemStatus;
  epicId?: string;
  storyId?: string;
  assignedTo?: string;
  labels?: string[];
  search?: string;
}

export interface BacklogUpdate {
  title?: string;
  description?: string;
  priority?: ItemPriority;
  status?: ItemStatus;
  epicId?: string;
  storyId?: string;
  order?: number;
  assignedTo?: string;
  estimatedEffort?: number;
  labels?: string[];
  acceptanceCriteria?: string[];  // For stories
  checklist?: {                   // For tasks
    id: string;
    text: string;
    completed: boolean;
  }[];
}
