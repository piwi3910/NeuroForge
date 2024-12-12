export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
}

export type ContextMenuType = 'file' | 'folder' | 'background';

export interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  type: ContextMenuType | null;
  targetPath?: string;
}

export type DialogType = 'new-file' | 'new-folder' | 'rename' | null;

export interface DialogState {
  show: boolean;
  type: DialogType;
  path?: string;
  defaultValue?: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  onClick: () => void;
  divider?: boolean;
}

export interface FileListProps {
  files: FileNode[];
  onContextMenu: (e: React.MouseEvent, type: ContextMenuType, path?: string) => void;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}
