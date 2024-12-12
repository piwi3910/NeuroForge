import { useState } from 'react';
import { Dialog } from '../Dialog';

interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
}

export function FileDialog({ 
  isOpen, 
  onClose, 
  title, 
  defaultValue = '', 
  onConfirm 
}: FileDialogProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm(value.trim());
      setValue('');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter name..."
            className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!value.trim()}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              !value.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Confirm
          </button>
        </div>
      </form>
    </Dialog>
  );
}
