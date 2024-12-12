import { PathInputProps } from './types';

export function PathInput({
  projectPath,
  setProjectPath,
  isGitRepo,
  onBrowse
}: PathInputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">Local Project Path</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={projectPath}
          onChange={(e) => setProjectPath(e.target.value)}
          placeholder="/path/to/your/project"
          className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm"
          disabled={isGitRepo}
        />
        <button 
          onClick={onBrowse}
          className={`px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm ${
            isGitRepo ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isGitRepo}
        >
          Browse
        </button>
      </div>
    </div>
  );
}
