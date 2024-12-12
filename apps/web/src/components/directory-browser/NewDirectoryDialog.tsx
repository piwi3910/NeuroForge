import { useState } from 'react';
import { Dialog } from '../Dialog';
import { NewDirectoryDialogProps } from './types';

export function NewDirectoryDialog({
  isOpen,
  onClose,
  onConfirm
}: NewDirectoryDialogProps) {
  const [newDirName, setNewDirName] = useState("");

  const handleConfirm = () => {
    if (newDirName.trim()) {
      onConfirm(newDirName.trim());
      setNewDirName("");
    }
  };

  const handleClose = () => {
    setNewDirName("");
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
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
            onClick={handleClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
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
  );
}
