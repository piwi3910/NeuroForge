import { ActionButtonsProps } from './types';

export function ActionButtons({
  projectPath,
  gitUrl,
  isGitRepo,
  isLoading,
  isProjectDefined,
  onInitRepo,
  onCloneRepo,
  onReset
}: ActionButtonsProps) {
  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={onInitRepo}
          disabled={!projectPath || isLoading || isGitRepo}
          className={`flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm ${
            (!projectPath || isLoading || isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Initialize Local Repository
        </button>
        <button
          onClick={onCloneRepo}
          disabled={!projectPath || !gitUrl || isLoading || isGitRepo}
          className={`flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm ${
            (!projectPath || !gitUrl || isLoading || isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Clone Repository
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onReset}
          disabled={!projectPath || isLoading}
          className={`flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm ${
            (!projectPath || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Reset
        </button>
        <button
          disabled={!isProjectDefined}
          className={`flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm ${
            !isProjectDefined ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Build
        </button>
      </div>
    </>
  );
}
