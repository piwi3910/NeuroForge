import { ProjectDetails } from "../../types/project-info";

export interface ProjectState {
  projectId: string | null;
  projectPath: string;
  isGitRepo: boolean;
  projectDetails: ProjectDetails;
  isLoading: boolean;
  isResetDialogOpen: boolean;
}

export type SetProjectDetails = (details: ProjectDetails | ((prev: ProjectDetails) => ProjectDetails)) => void;

export interface ProjectActions {
  setProjectId: (id: string | null) => void;
  setProjectPath: (path: string) => void;
  setIsGitRepo: (value: boolean) => void;
  setProjectDetails: SetProjectDetails;
  setIsLoading: (value: boolean) => void;
  setIsResetDialogOpen: (value: boolean) => void;
  handleReset: () => Promise<void>;
}

export type UseProjectInfo = ProjectState & ProjectActions;
