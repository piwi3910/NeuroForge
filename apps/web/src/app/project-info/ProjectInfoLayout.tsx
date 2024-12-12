import { ConfirmDialog } from "../../components/ConfirmDialog";
import { UseProjectInfo } from "./types";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";

interface ProjectInfoLayoutProps extends UseProjectInfo {}

export function ProjectInfoLayout({
  projectId,
  projectPath,
  isGitRepo,
  projectDetails,
  isLoading,
  isResetDialogOpen,
  setProjectId,
  setProjectPath,
  setIsGitRepo,
  setProjectDetails,
  setIsLoading,
  setIsResetDialogOpen,
  handleReset
}: ProjectInfoLayoutProps) {
  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex-1 flex gap-4">
        <LeftPanel
          projectId={projectId}
          projectPath={projectPath}
          isGitRepo={isGitRepo}
          projectDetails={projectDetails}
          isLoading={isLoading}
          setProjectId={setProjectId}
          setProjectPath={setProjectPath}
          setIsGitRepo={setIsGitRepo}
          setProjectDetails={setProjectDetails}
          setIsLoading={setIsLoading}
          setIsResetDialogOpen={setIsResetDialogOpen}
        />

        <RightPanel
          projectId={projectId}
          isGitRepo={isGitRepo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setProjectDetails={setProjectDetails}
        />
      </div>

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleReset}
        title="Reset Project"
        message="Are you sure? This will reset and delete your project."
      />
    </main>
  );
}
