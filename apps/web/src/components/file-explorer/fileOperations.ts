import { FileNode } from './types';

export function createItem(
  files: FileNode[],
  name: string,
  path: string | undefined,
  type: 'file' | 'folder'
): FileNode[] {
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
  return updateFilesRecursively(files, targetPath);
}

export function deleteItem(files: FileNode[], path: string): FileNode[] {
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
  return updateFilesRecursively(files, targetPath);
}

export function renameItem(files: FileNode[], path: string, newName: string): FileNode[] {
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
  return updateFilesRecursively(files, targetPath);
}
