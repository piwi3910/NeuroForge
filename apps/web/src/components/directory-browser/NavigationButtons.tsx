interface NavigationButtonsProps {
  onNavigateUp: () => void;
  onNewDirectory: () => void;
  canNavigateUp: boolean;
}

export function NavigationButtons({
  onNavigateUp,
  onNewDirectory,
  canNavigateUp
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onNavigateUp}
        className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        disabled={!canNavigateUp}
      >
        Up
      </button>
      <button
        onClick={onNewDirectory}
        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        New Directory
      </button>
    </div>
  );
}
