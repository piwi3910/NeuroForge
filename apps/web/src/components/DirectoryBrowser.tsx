"use client";

import { Dialog } from './Dialog';
import { DirectoryList } from './directory-browser/DirectoryList';
import { NewDirectoryDialog } from './directory-browser/NewDirectoryDialog';
import { useDirectoryBrowser } from './directory-browser/useDirectoryBrowser';
import { DirectoryBrowserProps } from './directory-browser/types';

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
          <div className="text-sm text-gray-400">
            Current Path: {currentPath}
          </div>

          {error && (
            <div className="bg-red-900/50 text-red-200 p-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleNavigateUp}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              disabled={!canNavigateUp}
            >
              Up
            </button>
            <button
              onClick={() => setIsNewDirDialogOpen(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              New Directory
            </button>
          </div>

          <div className="h-60 overflow-auto bg-[#1e1e1e] rounded border border-[#3e3e3e]">
            <DirectoryList
              entries={entries}
              isLoading={isLoading}
              error={error}
              onSelect={handleSelect}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Select
            </button>
          </div>
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
