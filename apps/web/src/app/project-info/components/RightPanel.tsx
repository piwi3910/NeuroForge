import { ChatPanel } from "../../../components/project/ChatPanel";
import { UseProjectInfo } from "../types";

interface RightPanelProps extends Pick<UseProjectInfo, 
  'projectId' | 
  'isGitRepo' | 
  'isLoading' | 
  'setIsLoading' | 
  'setProjectDetails'
> {}

export function RightPanel({
  projectId,
  isGitRepo,
  isLoading,
  setIsLoading,
  setProjectDetails
}: RightPanelProps) {
  return (
    <ChatPanel
      projectId={projectId}
      isGitRepo={isGitRepo}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      setProjectDetails={setProjectDetails}
    />
  );
}
