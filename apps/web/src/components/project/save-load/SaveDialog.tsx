import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { SaveDialogProps } from './types';

export function SaveDialog({
  isOpen,
  onClose,
  onSave
}: SaveDialogProps) {
  const [saveName, setSaveName] = useState("");

  const handleSave = () => {
    if (saveName.trim()) {
      onSave(saveName.trim());
      setSaveName("");
    }
  };

  const handleClose = () => {
    setSaveName("");
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Save Project State"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Save Name</label>
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Enter a name for this save"
            className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
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
            onClick={handleSave}
            disabled={!saveName}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              !saveName ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}
