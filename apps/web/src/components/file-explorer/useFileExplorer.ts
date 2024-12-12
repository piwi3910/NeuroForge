import { useState } from 'react';
import { FileNode } from './types';
import { INITIAL_FILES } from './constants';
import { deleteItem } from './fileOperations';
import { useContextMenu } from './useContextMenu';
import { useDialog } from './useDialog';

export function useFileExplorer() {
  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);

  const {
    dialog,
    handleNewFile,
    handleNewFolder,
    handleRename,
    handleDialogConfirm,
    closeDialog,
  } = useDialog(files, setFiles);

  const {
    contextMenu,
    handleContextMenu,
    getContextMenuItems,
    closeContextMenu,
  } = useContextMenu(
    handleNewFile,
    handleNewFolder,
    handleRename,
    (path) => setFiles(deleteItem(files, path))
  );

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
