import { DirectoryBrowser } from '../DirectoryBrowser';
import { ProjectSetupPanelProps } from './setup/types';
import { PathInput } from './setup/PathInput';
import { GitUrlInput } from './setup/GitUrlInput';
import { ActionButtons } from './setup/ActionButtons';
import { useProjectSetup } from './setup/useProjectSetup';

export function ProjectSetupPanel({
  projectPath,
  setProjectPath,
  isGitRepo,
  setIsGitRepo,
  projectDetails,
  setProjectDetails,
  setProjectId,
  isLoading,
  setIsLoading,
  onReset
}: ProjectSetupPanelProps) {
  const {
    gitUrl,
    setGitUrl,
    isBrowseOpen,
    setIsBrowseOpen,
    handleBrowse,
    handleInitRepo,
    handleCloneRepo
  } = useProjectSetup(
    projectPath,
    setProjectId,
    setIsGitRepo,
    setProjectDetails,
    setIsLoading
  );

  const isProjectDefined = projectDetails.status?.name === 'complete' && 
                          projectDetails.status?.description === 'complete' && 
                          projectDetails.status?.stack === 'complete';

  const handleSelectDirectory = (path: string) => {
    setProjectPath(path);
  };

  return (
    <div className="space-y-4 mb-4">
      <PathInput
        projectPath={projectPath}
        setProjectPath={setProjectPath}
        isGitRepo={isGitRepo}
        onBrowse={handleBrowse}
      />

      <GitUrlInput
        gitUrl={gitUrl}
        setGitUrl={setGitUrl}
        isGitRepo={isGitRepo}
      />

      <ActionButtons
        projectPath={projectPath}
        gitUrl={gitUrl}
        isGitRepo={isGitRepo}
        isLoading={isLoading}
        isProjectDefined={isProjectDefined}
        onInitRepo={handleInitRepo}
        onCloneRepo={handleCloneRepo}
        onReset={onReset}
      />

      <DirectoryBrowser
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        onSelect={handleSelectDirectory}
        initialPath="/home/piwi/Git/NeuroForge/projects"
      />
    </div>
  );
}
