import { GitUrlInputProps } from './types';

export function GitUrlInput({
  gitUrl,
  setGitUrl,
  isGitRepo
}: GitUrlInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-2">Git Repository URL (Optional)</label>
        <input
          type="text"
          value={gitUrl}
          onChange={(e) => setGitUrl(e.target.value)}
          placeholder="https://github.com/user/repo.git"
          className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm"
          disabled={isGitRepo}
        />
      </div>
    </div>
  );
}
