import { FileListProps } from './types';
import { FileTreeNode } from './FileTreeNode';

export function FileList({ files, onContextMenu }: FileListProps) {
  return (
    <div className="p-2">
      {files.map((file, index) => (
        <FileTreeNode 
          key={file.name + index} 
          node={file}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
}
