import { useState, useEffect } from 'react';
import { Dialog } from './Dialog';
import { apiClient } from '@/services/api';

interface DirectoryEntry {
  path: string;
  name: string;
  type: 'directory' | 'parent';
}

interface DirectoryBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  initialPath?: string;
}

export function DirectoryBrowser({ isOpen, onClose, onSelect, initialPath = '/' }: DirectoryBrowserProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [directories, setDirectories] = useState<DirectoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDirectories = async (path: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.listDirectories(path);
      setDirectories(response);
      setCurrentPath(path);
    } catch (error) {
      console.error('Failed to load directories:', error);
      setError('Failed to load directories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDirectories(initialPath);
    }
  }, [isOpen, initialPath]);

  const handleDirectoryClick = (entry: DirectoryEntry) => {
    loadDirectories(entry.path);
  };

  const handleSelect = () => {
    onSelect(currentPath);
    onClose();
  };

  const handleCreateDirectory = async () => {
    const name = prompt('Enter directory name:');
    if (!name) return;

    try {
      setError(null);
      await apiClient.createDirectory(`${currentPath}/${name}`);
      loadDirectories(currentPath);
    } catch (error) {
      console.error('Failed to create directory:', error);
      setError('Failed to create directory');
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Select Directory">
      <div className="flex flex-col h-[400px]">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-400">Current Path:</span>
          <span className="text-sm font-mono">{currentPath}</span>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-900/50 text-red-200 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex-1 bg-[#1e1e1e] rounded border border-[#3e3e3e] overflow-auto mb-4">
          {isLoading ? (
            <div className="p-4 text-gray-400">Loading...</div>
          ) : directories.length === 0 ? (
            <div className="p-4 text-gray-400">No directories found</div>
          ) : (
            <div className="p-2">
              {directories.map((entry) => (
                <button
                  key={entry.path}
                  onClick={() => handleDirectoryClick(entry)}
                  className="w-full text-left p-2 hover:bg-[#2d2d2d] rounded flex items-center gap-2"
                >
                  <span className="text-blue-400">
                    {entry.type === 'parent' ? '📂 ..' : '📁'}
                  </span>
                  <span>{entry.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCreateDirectory}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            New Directory
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 bg-[#3e3e3e] text-white rounded hover:bg-[#4e4e4e] text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
