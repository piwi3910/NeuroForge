import { useState } from 'react';
import { FileNode, ContextMenuState, DialogState, MenuItem } from './types';

export function useFileExplorer() {
  const [files, setFiles] = useState<FileNode[]>([
    {
      name: 'src',
      type: 'folder',
      expanded: true,
      children: [
        {
          name: 'components',
          type: 'folder',
          expanded: true,
          children: [
            { name: 'Editor.tsx', type: 'file' },
            { name: 'FileExplorer.tsx', type: 'file' },
            { name: 'Terminal.tsx', type: 'file' },
            { name: 'AiChat.tsx', type: 'file' },
            { name: 'Layout.tsx', type: 'file' },
          ],
        },
        {
          name: 'app',
          type: 'folder',
          expanded: true,
          children: [
            { name: 'page.tsx', type: 'file' },
            { name: 'layout.tsx', type: 'file' },
            { name: 'globals.css', type: 'file' },
          ],
        },
      ],
    },
    { name: 'package.json', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
  ]);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    type: null,
  });

  const [dialog, setDialog] = useState<DialogState>({
    show: false,
    type: null,
  });

  const createItem = (name: string, path: string | undefined, type: 'file' | 'folder') => {
    const newNode: FileNode = {
      name,
      type,
      children: type === 'folder' ? [] : undefined,
    };

    const updateFilesRecursively = (nodes: FileNode[], targetPath: string[]): FileNode[] => {
      if (targetPath.length === 0) {
        return [...nodes, newNode];
      }

      return nodes.map(node => {
        if (node.name === targetPath[0] && node.type === 'folder') {
          return {
            ...node,
            children: updateFilesRecursively(node.children || [], targetPath.slice(1))
          };
        }
        return node;
      });
    };

    const targetPath = path ? path.split('/') : [];
    const updatedFiles = updateFilesRecursively(files, targetPath);
    setFiles(updatedFiles);
  };

  const deleteItem = (path: string) => {
    const updateFilesRecursively = (nodes: FileNode[], targetPath: string[]): FileNode[] => {
      if (targetPath.length === 1) {
        return nodes.filter(node => node.name !== targetPath[0]);
      }

      return nodes.map(node => {
        if (node.name === targetPath[0] && node.type === 'folder') {
          return {
            ...node,
            children: updateFilesRecursively(node.children || [], targetPath.slice(1))
          };
        }
        return node;
      });
    };

    const targetPath = path.split('/');
    const updatedFiles = updateFilesRecursively(files, targetPath);
    setFiles(updatedFiles);
  };

  const renameItem = (path: string, newName: string) => {
    const updateFilesRecursively = (nodes: FileNode[], targetPath: string[]): FileNode[] => {
      if (targetPath.length === 1) {
        return nodes.map(node => 
          node.name === targetPath[0] ? { ...node, name: newName } : node
        );
      }

      return nodes.map(node => {
        if (node.name === targetPath[0] && node.type === 'folder') {
          return {
            ...node,
            children: updateFilesRecursively(node.children || [], targetPath.slice(1))
          };
        }
        return node;
      });
    };

    const targetPath = path.split('/');
    const updatedFiles = updateFilesRecursively(files, targetPath);
    setFiles(updatedFiles);
  };

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
        onClick: () => setDialog({
          show: true,
          type: 'new-file',
          path: contextMenu.targetPath,
        }),
      },
      {
        label: 'New Folder',
        icon: '📁',
        onClick: () => setDialog({
          show: true,
          type: 'new-folder',
          path: contextMenu.targetPath,
        }),
      },
    ];

    if (contextMenu.type === 'file' || contextMenu.type === 'folder') {
      return [
        ...baseItems,
        { 
          label: 'Rename', 
          icon: '✏️', 
          onClick: () => setDialog({
            show: true,
            type: 'rename',
            path: contextMenu.targetPath,
            defaultValue: contextMenu.targetPath?.split('/').pop() || '',
          }),
          divider: true 
        },
        { 
          label: 'Delete', 
          icon: '🗑️', 
          onClick: () => contextMenu.targetPath && deleteItem(contextMenu.targetPath)
        },
      ];
    }

    return baseItems;
  };

  const handleDialogConfirm = (value: string) => {
    switch (dialog.type) {
      case 'new-file':
        createItem(value, dialog.path, 'file');
        break;
      case 'new-folder':
        createItem(value, dialog.path, 'folder');
        break;
      case 'rename':
        if (dialog.path) {
          renameItem(dialog.path, value);
        }
        break;
    }
    setDialog({ show: false, type: null });
  };

  const closeContextMenu = () => setContextMenu({ ...contextMenu, show: false });
  const closeDialog = () => setDialog({ show: false, type: null });

  return {
    files,
    contextMenu,
    dialog,
    handleContextMenu,
    getContextMenuItems,
    handleDialogConfirm,
    closeContextMenu,
    closeDialog,
  };
}
