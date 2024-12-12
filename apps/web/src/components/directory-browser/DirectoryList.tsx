import { DirectoryListProps } from './types';

export function DirectoryList({ 
  entries, 
  isLoading, 
  error, 
  onSelect 
}: DirectoryListProps) {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        {error ? 'Error loading directory' : 'Directory is empty'}
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#3e3e3e]">
      {entries.map((entry) => (
        <button
          key={entry.path}
          onClick={() => onSelect(entry)}
          className="w-full text-left px-4 py-2 hover:bg-[#2e2e2e] flex items-center gap-2"
        >
          <span className={entry.type === 'directory' ? 'text-blue-400' : 'text-gray-400'}>
            {entry.type === 'directory' ? '📁' : '📄'}
          </span>
          {entry.name}
        </button>
      ))}
    </div>
  );
}
