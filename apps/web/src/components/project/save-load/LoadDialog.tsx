import { Dialog } from '../../Dialog';
import { LoadDialogProps } from './types';

export function LoadDialog({
  isOpen,
  onClose,
  savedStates,
  onLoad
}: LoadDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Load Project State"
    >
      <div className="space-y-4">
        <div className="max-h-60 overflow-auto">
          {savedStates.map((state) => (
            <button
              key={state}
              onClick={() => onLoad(state)}
              className="w-full text-left px-4 py-2 hover:bg-[#2e2e2e] rounded"
            >
              {state}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
