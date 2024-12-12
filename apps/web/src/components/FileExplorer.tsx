"use client";

import { ContextMenu } from './ContextMenu';
import { FileTreeNode } from './file-explorer/FileTreeNode';
import { FileDialog } from './file-explorer/FileDialog';
import { useFileExplorer } from './file-explorer/useFileExplorer';

export function FileExplorer() {
  const {
    files,
    contextMenu,
    dialog,
    handleContextMenu,
    getContextMenuItems,
    handleDialogConfirm,
    closeContextMenu,
    closeDialog,
  } = useFileExplorer();

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
          <FileTreeNode 
            key={file.name + index} 
            node={file}
            onContextMenu={handleContextMenu}
          />
        ))}
      </div>
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={getContextMenuItems()}
          onClose={closeContextMenu}
        />
      )}
      <FileDialog
        isOpen={dialog.show}
        onClose={closeDialog}
        title={getDialogTitle()}
        defaultValue={dialog.defaultValue}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
}
