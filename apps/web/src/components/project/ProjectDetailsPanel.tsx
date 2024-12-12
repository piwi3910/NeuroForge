import { ProjectDetails } from '../../types/project-info';

interface ProjectDetailsPanelProps {
  projectPath: string;
  gitUrl?: string;
  isGitRepo: boolean;
  projectDetails: ProjectDetails;
}

export function ProjectDetailsPanel({
  projectPath,
  gitUrl,
  isGitRepo,
  projectDetails
}: ProjectDetailsPanelProps) {
  return (
    <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Project Details</h3>
      <div className="space-y-2 text-sm">
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
        <div className="pt-4 space-y-3">
          <div>
            <span className="text-gray-400">Name:</span>
            <div className="mt-1 text-white">{projectDetails.name || "Not set"}</div>
          </div>
          <div>
            <span className="text-gray-400">Description:</span>
            <div className="mt-1 text-white">{projectDetails.description || "Not set"}</div>
          </div>
          <div>
            <span className="text-gray-400">Stack:</span>
            <div className="mt-1 text-white">{projectDetails.stack || "Not set"}</div>
          </div>
          <div>
            <span className="text-gray-400">Status:</span>
            <div className="mt-1 space-y-1">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className={projectDetails.status?.name === 'complete' ? "text-green-500" : "text-yellow-500"}>
                  {projectDetails.status?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Description:</span>
                <span className={projectDetails.status?.description === 'complete' ? "text-green-500" : "text-yellow-500"}>
                  {projectDetails.status?.description}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className={projectDetails.status?.stack === 'complete' ? "text-green-500" : "text-yellow-500"}>
                  {projectDetails.status?.stack}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
