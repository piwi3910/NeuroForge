export type ItemType = 'Epic' | 'Story' | 'Task';
export type ItemStatus = 'To Do' | 'In Progress' | 'Done';
export type ItemPriority = 'High' | 'Medium' | 'Low';

export interface BacklogItem {
  id: string;
  projectId: string;
  type: ItemType;
  title: string;
  description: string;
  status: ItemStatus;
  priority: ItemPriority;
  order: number;
  parentId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BacklogFilter {
  projectId: string;
  type?: ItemType;
  status?: ItemStatus;
  priority?: ItemPriority;
  parentId?: string;
}
