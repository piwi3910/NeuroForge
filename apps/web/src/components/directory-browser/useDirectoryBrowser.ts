import { useState, useEffect } from 'react';
import { DirectoryEntry } from './types';

export function useDirectoryBrowser(initialPath: string, isOpen: boolean) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewDirDialogOpen, setIsNewDirDialogOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDirectory(currentPath);
    }
  }, [isOpen, currentPath]);

  const loadDirectory = async (path: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Loading directory:', path);
      const response = await fetch(`http://localhost:3001/api/files/browse?path=${encodeURIComponent(path)}`);
      if (!response.ok) {
        throw new Error('Failed to load directory');
      }
      const data = await response.json();
      console.log('Directory contents:', data);
      setEntries(data);
    } catch (error) {
      console.error('Failed to load directories:', error);
      setError('Failed to load directory contents');
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (entry: DirectoryEntry) => {
    if (entry.type === 'directory') {
      setCurrentPath(entry.path);
    }
  };

  const handleNavigateUp = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    if (parentPath) {
      setCurrentPath(parentPath);
    }
  };

  const handleCreateDirectory = async (newDirName: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/files/directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: `${currentPath}/${newDirName}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create directory');
      }

      setIsNewDirDialogOpen(false);
      loadDirectory(currentPath);
    } catch (error) {
      console.error('Failed to create directory:', error);
      setError('Failed to create directory');
    }
  };

  return {
    currentPath,
    entries,
    error,
    isLoading,
    isNewDirDialogOpen,
    setIsNewDirDialogOpen,
    handleSelect,
    handleNavigateUp,
    handleCreateDirectory,
    canNavigateUp: currentPath !== initialPath,
  };
}
