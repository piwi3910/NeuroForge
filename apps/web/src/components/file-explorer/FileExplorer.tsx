"use client";

import { ContextMenu } from '../ContextMenu';
import { FileDialog } from './FileDialog';
import { useFileExplorer } from './useFileExplorer';
import { Header } from './Header';
import { FileList } from './FileList';
import { getDialogTitle } from './utils';

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

  return (
    <div 
      className="h-full w-full text-white"
      onContextMenu={(e) => handleContextMenu(e, 'background')}
    >
      <Header title="EXPLORER" subtitle="NeuroForge" />
      <FileList files={files} onContextMenu={handleContextMenu} />
      
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
        title={getDialogTitle(dialog.type)}
        defaultValue={dialog.defaultValue}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
}
