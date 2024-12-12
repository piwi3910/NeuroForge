import { useState } from 'react';
import { DialogState, FileNode } from './types';
import { createItem, renameItem } from './fileOperations';

export function useDialog(
  files: FileNode[],
  setFiles: (files: FileNode[]) => void
) {
  const [dialog, setDialog] = useState<DialogState>({
    show: false,
    type: null,
  });

  const handleNewFile = (path?: string) => {
    setDialog({
      show: true,
      type: 'new-file',
      path,
    });
  };

  const handleNewFolder = (path?: string) => {
    setDialog({
      show: true,
      type: 'new-folder',
      path,
    });
  };

  const handleRename = (path: string, defaultValue: string) => {
    setDialog({
      show: true,
      type: 'rename',
      path,
      defaultValue,
    });
  };

  const handleDialogConfirm = (value: string) => {
    switch (dialog.type) {
      case 'new-file':
        setFiles(createItem(files, value, dialog.path, 'file'));
        break;
      case 'new-folder':
        setFiles(createItem(files, value, dialog.path, 'folder'));
        break;
      case 'rename':
        if (dialog.path) {
          setFiles(renameItem(files, dialog.path, value));
        }
        break;
    }
    closeDialog();
  };

  const closeDialog = () => setDialog({ show: false, type: null });

  return {
    dialog,
    handleNewFile,
    handleNewFolder,
    handleRename,
    handleDialogConfirm,
    closeDialog,
  };
}
