import { ProjectDetails } from '../../../types/project-info';

export interface SaveLoadPanelProps {
  projectId: string | null;
  projectPath: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setProjectDetails: (details: ProjectDetails) => void;
  setIsGitRepo: (value: boolean) => void;
}

export interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export interface LoadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  savedStates: string[];
  onLoad: (name: string) => void;
}

export interface SaveLoadButtonsProps {
  onSave: () => void;
  onLoad: () => void;
  isDisabled: {
    save: boolean;
    load: boolean;
  };
  totalSavedProjects: number;
}
