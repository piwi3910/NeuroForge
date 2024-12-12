import { StatusSectionProps } from './types';

export function StatusSection({
  isGitRepo,
  projectPath,
  gitUrl
}: StatusSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-400">Status:</span>
        <span className={isGitRepo ? "text-green-500" : "text-yellow-500"}>
          {isGitRepo ? "Ready" : "Not Initialized"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Local Path:</span>
        <span>{projectPath || "Not set"}</span>
      </div>
      {gitUrl && (
        <div className="flex justify-between">
          <span className="text-gray-400">Remote URL:</span>
          <span>{gitUrl}</span>
        </div>
      )}
    </div>
  );
}
