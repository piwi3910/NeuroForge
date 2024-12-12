import { useState } from 'react';
import { ContextMenuState, MenuItem } from './types';

export function useContextMenu(
  onNewFile: (path?: string) => void,
  onNewFolder: (path?: string) => void,
  onRename: (path: string, defaultValue: string) => void,
  onDelete: (path: string) => void
) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    type: null,
  });

  const handleContextMenu = (
    e: React.MouseEvent,
    type: 'file' | 'folder' | 'background',
    path?: string
  ) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      targetPath: path,
    });
  };

  const getContextMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      {
        label: 'New File',
        icon: '📄',
        onClick: () => onNewFile(contextMenu.targetPath),
      },
      {
        label: 'New Folder',
        icon: '📁',
        onClick: () => onNewFolder(contextMenu.targetPath),
      },
    ];

    if (contextMenu.type === 'file' || contextMenu.type === 'folder') {
      return [
        ...baseItems,
        { 
          label: 'Rename', 
          icon: '✏️', 
          onClick: () => contextMenu.targetPath && 
            onRename(
              contextMenu.targetPath,
              contextMenu.targetPath.split('/').pop() || ''
            ),
          divider: true 
        },
        { 
          label: 'Delete', 
          icon: '🗑️', 
          onClick: () => contextMenu.targetPath && onDelete(contextMenu.targetPath)
        },
      ];
    }

    return baseItems;
  };

  const closeContextMenu = () => setContextMenu({ ...contextMenu, show: false });

  return {
    contextMenu,
    handleContextMenu,
    getContextMenuItems,
    closeContextMenu,
  };
}
