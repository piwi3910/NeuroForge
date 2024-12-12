import { ProjectSetupPanel } from "../../../components/project/ProjectSetupPanel";
import { ProjectDetailsPanel } from "../../../components/project/ProjectDetailsPanel";
import { SaveLoadPanel } from "../../../components/project/SaveLoadPanel";
import { UseProjectInfo } from "../types";

type LeftPanelProps = Pick<UseProjectInfo, 
  'projectId' | 
  'projectPath' | 
  'isGitRepo' | 
  'projectDetails' | 
  'isLoading' | 
  'setProjectId' | 
  'setProjectPath' | 
  'setIsGitRepo' | 
  'setProjectDetails' | 
  'setIsLoading' | 
  'setIsResetDialogOpen'
>;

export function LeftPanel({
  projectId,
  projectPath,
  isGitRepo,
  projectDetails,
  isLoading,
  setProjectId,
  setProjectPath,
  setIsGitRepo,
  setProjectDetails,
  setIsLoading,
  setIsResetDialogOpen
}: LeftPanelProps) {
  return (
    <div className="w-1/3 bg-[#252526] rounded p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Project Setup</h2>
      
      <ProjectSetupPanel
        projectPath={projectPath}
        setProjectPath={setProjectPath}
        isGitRepo={isGitRepo}
        setIsGitRepo={setIsGitRepo}
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
        setProjectId={setProjectId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onReset={() => setIsResetDialogOpen(true)}
      />

      <ProjectDetailsPanel
        projectPath={projectPath}
        isGitRepo={isGitRepo}
        projectDetails={projectDetails}
      />

      <SaveLoadPanel
        projectId={projectId}
        projectPath={projectPath}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setProjectDetails={setProjectDetails}
        setIsGitRepo={setIsGitRepo}
      />
    </div>
  );
}
