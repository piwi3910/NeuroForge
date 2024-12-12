import { ProjectDetailsPanelProps } from './details/types';
import { StatusSection } from './details/StatusSection';
import { InfoSection } from './details/InfoSection';
import { StatusList } from './details/StatusList';

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
        <StatusSection
          isGitRepo={isGitRepo}
          projectPath={projectPath}
          gitUrl={gitUrl}
        />
        <InfoSection projectDetails={projectDetails} />
        <StatusList status={projectDetails.status} />
      </div>
    </div>
  );
}
