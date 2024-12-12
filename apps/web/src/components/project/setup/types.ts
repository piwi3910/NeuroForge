import { ProjectDetails } from '../../../types/project-info';

export interface ProjectSetupPanelProps {
  projectPath: string;
  setProjectPath: (path: string) => void;
  isGitRepo: boolean;
  setIsGitRepo: (value: boolean) => void;
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  setProjectId: (id: string | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  onReset: () => void;
}

export interface PathInputProps {
  projectPath: string;
  setProjectPath: (path: string) => void;
  isGitRepo: boolean;
  onBrowse: () => void;
}

export interface GitUrlInputProps {
  gitUrl: string;
  setGitUrl: (url: string) => void;
  isGitRepo: boolean;
}

export interface ActionButtonsProps {
  projectPath: string;
  gitUrl: string;
  isGitRepo: boolean;
  isLoading: boolean;
  isProjectDefined: boolean;
  onInitRepo: () => void;
  onCloneRepo: () => void;
  onReset: () => void;
}
