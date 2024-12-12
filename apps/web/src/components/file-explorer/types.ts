export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
}

export interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  type: 'file' | 'folder' | 'background' | null;
  targetPath?: string;
}

export interface DialogState {
  show: boolean;
  type: 'new-file' | 'new-folder' | 'rename' | null;
  path?: string;
  defaultValue?: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  onClick: () => void;
  divider?: boolean;
}
