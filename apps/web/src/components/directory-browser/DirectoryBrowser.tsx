"use client";

import { Dialog } from '../Dialog';
import { DirectoryList } from './DirectoryList';
import { NewDirectoryDialog } from './NewDirectoryDialog';
import { useDirectoryBrowser } from './useDirectoryBrowser';
import { DirectoryBrowserProps } from './types';
import { PathDisplay } from './PathDisplay';
import { ErrorDisplay } from './ErrorDisplay';
import { NavigationButtons } from './NavigationButtons';
import { DialogFooter } from './DialogFooter';

export function DirectoryBrowser({ 
  isOpen, 
  onClose, 
  onSelect: onSelectProp, 
  initialPath 
}: DirectoryBrowserProps) {
  const {
    currentPath,
    entries,
    error,
    isLoading,
    isNewDirDialogOpen,
    setIsNewDirDialogOpen,
    handleSelect,
    handleNavigateUp,
    handleCreateDirectory,
    canNavigateUp,
  } = useDirectoryBrowser(initialPath, isOpen);

  const handleConfirm = () => {
    onSelectProp(currentPath);
    onClose();
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Select Directory"
      >
        <div className="space-y-4">
          <PathDisplay path={currentPath} />
          <ErrorDisplay error={error} />
          <NavigationButtons
            onNavigateUp={handleNavigateUp}
            onNewDirectory={() => setIsNewDirDialogOpen(true)}
            canNavigateUp={canNavigateUp}
          />

          <div className="h-60 overflow-auto bg-[#1e1e1e] rounded border border-[#3e3e3e]">
            <DirectoryList
              entries={entries}
              isLoading={isLoading}
              error={error}
              onSelect={handleSelect}
            />
          </div>

          <DialogFooter
            onCancel={onClose}
            onConfirm={handleConfirm}
          />
        </div>
      </Dialog>

      <NewDirectoryDialog
        isOpen={isNewDirDialogOpen}
        onClose={() => setIsNewDirDialogOpen(false)}
        onConfirm={handleCreateDirectory}
      />
    </>
  );
}
