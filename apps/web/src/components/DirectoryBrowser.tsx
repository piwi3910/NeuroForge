import { Dialog } from "./Dialog";
import { apiClient } from "@/services/api";
import { useState, useEffect } from "react";

interface DirectoryEntry {
  path: string;
  name: string;
  type: 'directory' | 'parent';
}

interface DirectoryBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  initialPath: string;
}

export function DirectoryBrowser({ isOpen, onClose, onSelect, initialPath }: DirectoryBrowserProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [directories, setDirectories] = useState<DirectoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadDirectories(currentPath);
    }
  }, [isOpen, currentPath]);

  const loadDirectories = async (path: string) => {
    try {
      setError(null);
      const dirs = await apiClient.listDirectories(path);
      setDirectories(dirs);
    } catch (error) {
      console.error('Failed to load directories:', error);
      setError('Failed to load directories');
      setDirectories([]);
    }
  };

  const handleCreateDirectory = async () => {
    const name = prompt('Enter directory name:');
    if (!name) return;

    try {
      setError(null);
      const newPath = `${currentPath}/${name}`;
      await apiClient.createDirectory(newPath);
      await loadDirectories(currentPath);
    } catch (error) {
      console.error('Failed to create directory:', error);
      setError('Failed to create directory');
    }
  };

  const handleSelect = (entry: DirectoryEntry) => {
    if (entry.type === 'parent' || entry.type === 'directory') {
      setCurrentPath(entry.path);
    }
  };

  const handleConfirm = () => {
    onSelect(currentPath);
    onClose();
  };

  return (
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
          <div className="bg-red-900/50 text-red-400 p-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-[#1e1e1e] border border-[#3e3e3e] rounded min-h-[300px] max-h-[300px] overflow-auto p-2">
          {directories.map((entry, index) => (
            <div
              key={index}
              onClick={() => handleSelect(entry)}
              className="flex items-center gap-2 p-2 hover:bg-[#2e2e2e] rounded cursor-pointer"
            >
              <span className="text-yellow-500">📁</span>
              <span>{entry.name}</span>
            </div>
          ))}
          {directories.length === 0 && !error && (
            <div className="text-gray-500 p-2">
              No directories found
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCreateDirectory}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            New Directory
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-2 bg-[#3e3e3e] text-white rounded hover:bg-[#4e4e4e]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
