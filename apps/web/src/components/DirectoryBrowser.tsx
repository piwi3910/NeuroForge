import { Dialog } from "./Dialog";
import { useState, useEffect } from "react";

interface DirectoryEntry {
    name: string;
    path: string;
    type: 'directory' | 'file';
}

interface DirectoryBrowserProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (path: string) => void;
    initialPath: string;
}

export function DirectoryBrowser({ isOpen, onClose, onSelect, initialPath }: DirectoryBrowserProps) {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [entries, setEntries] = useState<DirectoryEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewDirDialogOpen, setIsNewDirDialogOpen] = useState(false);
    const [newDirName, setNewDirName] = useState("");

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

    const handleNewDirectory = async () => {
        setIsNewDirDialogOpen(true);
    };

    const handleCreateDirectory = async () => {
        if (!newDirName) return;

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
            setNewDirName("");
            loadDirectory(currentPath);
        } catch (error) {
            console.error('Failed to create directory:', error);
            setError('Failed to create directory');
        }
    };

    const handleConfirm = () => {
        onSelect(currentPath);
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
                            disabled={currentPath === initialPath}
                        >
                            Up
                        </button>
                        <button
                            onClick={handleNewDirectory}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            New Directory
                        </button>
                    </div>

                    <div className="h-60 overflow-auto bg-[#1e1e1e] rounded border border-[#3e3e3e]">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-400">
                                Loading...
                            </div>
                        ) : entries.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                {error ? 'Error loading directory' : 'Directory is empty'}
                            </div>
                        ) : (
                            <div className="divide-y divide-[#3e3e3e]">
                                {entries.map((entry) => (
                                    <button
                                        key={entry.path}
                                        onClick={() => handleSelect(entry)}
                                        className="w-full text-left px-4 py-2 hover:bg-[#2e2e2e] flex items-center gap-2"
                                    >
                                        <span className={entry.type === 'directory' ? 'text-blue-400' : 'text-gray-400'}>
                                            {entry.type === 'directory' ? '📁' : '📄'}
                                        </span>
                                        {entry.name}
                                    </button>
                                ))}
                            </div>
                        )}
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

            <Dialog
                isOpen={isNewDirDialogOpen}
                onClose={() => {
                    setIsNewDirDialogOpen(false);
                    setNewDirName("");
                }}
                title="New Directory"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Directory Name</label>
                        <input
                            type="text"
                            value={newDirName}
                            onChange={(e) => setNewDirName(e.target.value)}
                            placeholder="Enter directory name"
                            className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                setIsNewDirDialogOpen(false);
                                setNewDirName("");
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateDirectory}
                            disabled={!newDirName}
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                                !newDirName ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
