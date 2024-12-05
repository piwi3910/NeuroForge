"use client";

import { useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { Dialog } from './Dialog';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  type: 'file' | 'folder' | 'background' | null;
  targetPath?: string;
}

interface DialogState {
  show: boolean;
  type: 'new-file' | 'new-folder' | 'rename' | null;
  path?: string;
  defaultValue?: string;
}

export function FileExplorer() {
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

  const getContextMenuItems = () => {
    const baseItems = [
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

  function FileTreeNode({ node, depth = 0, path = '' }: { node: FileNode; depth?: number; path?: string }) {
    const [expanded, setExpanded] = useState(node.expanded || false);
    const currentPath = path ? `${path}/${node.name}` : node.name;

    const toggleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (node.type === 'folder') {
        setExpanded(!expanded);
      }
    };

    const getFileIcon = (type: string, name: string) => {
      if (type === 'folder') return expanded ? '📂' : '📁';
      
      const extension = name.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'tsx':
        case 'ts':
          return '📄';
        case 'css':
          return '🎨';
        case 'json':
          return '📋';
        default:
          return '📄';
      }
    };

    return (
      <div>
        <div
          className="flex items-center hover:bg-[#2d2d2d] cursor-pointer py-[2px] px-2"
          style={{ paddingLeft: `${depth * 16}px` }}
          onClick={toggleExpand}
          onContextMenu={(e) => handleContextMenu(e, node.type, currentPath)}
        >
          <span className="mr-2">{getFileIcon(node.type, node.name)}</span>
          <span className="text-sm select-none">{node.name}</span>
        </div>
        {expanded && node.children && (
          <div>
            {node.children.map((child, index) => (
              <FileTreeNode 
                key={child.name + index} 
                node={child} 
                depth={depth + 1} 
                path={currentPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const getDialogTitle = () => {
    switch (dialog.type) {
      case 'new-file':
        return 'New File';
      case 'new-folder':
        return 'New Folder';
      case 'rename':
        return 'Rename';
      default:
        return '';
    }
  };

  return (
    <div 
      className="h-full w-full text-white"
      onContextMenu={(e) => handleContextMenu(e, 'background')}
    >
      <div className="p-2 border-b border-[#2d2d2d]">
        <div className="text-sm font-medium mb-1">EXPLORER</div>
        <div className="text-xs text-gray-400">NeuroForge</div>
      </div>
      <div className="p-2">
        {files.map((file, index) => (
          <FileTreeNode key={file.name + index} node={file} />
        ))}
      </div>
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={getContextMenuItems()}
          onClose={() => setContextMenu({ ...contextMenu, show: false })}
        />
      )}
      {dialog.show && (
        <Dialog
          title={getDialogTitle()}
          defaultValue={dialog.defaultValue}
          onConfirm={handleDialogConfirm}
          onCancel={() => setDialog({ show: false, type: null })}
        />
      )}
    </div>
  );
}
