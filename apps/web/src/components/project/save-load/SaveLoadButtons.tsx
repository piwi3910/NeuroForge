import { SaveLoadButtonsProps } from './types';

export function SaveLoadButtons({
  onSave,
  onLoad,
  isDisabled,
  totalSavedProjects
}: SaveLoadButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        disabled={isDisabled.save}
        className={`flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm ${
          isDisabled.save ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Save State
      </button>
      <button
        onClick={onLoad}
        disabled={isDisabled.load}
        className={`flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm ${
          isDisabled.load ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Load State ({totalSavedProjects})
      </button>
    </div>
  );
}
