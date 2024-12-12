import { useState } from 'react';
import { FileNode } from './types';

interface FileTreeNodeProps {
  node: FileNode;
  depth?: number;
  path?: string;
  onContextMenu: (e: React.MouseEvent, type: 'file' | 'folder', path: string) => void;
}

export function FileTreeNode({ 
  node, 
  depth = 0, 
  path = '', 
  onContextMenu 
}: FileTreeNodeProps) {
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
        onContextMenu={(e) => onContextMenu(e, node.type, currentPath)}
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
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
}
