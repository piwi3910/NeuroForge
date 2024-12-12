import { ProjectDetails } from '../../../types/project-info';

export interface ProjectDetailsPanelProps {
  projectPath: string;
  gitUrl?: string;
  isGitRepo: boolean;
  projectDetails: ProjectDetails;
}

export interface StatusSectionProps {
  isGitRepo: boolean;
  projectPath: string;
  gitUrl?: string;
}

export interface InfoSectionProps {
  projectDetails: ProjectDetails;
}

export interface StatusListProps {
  status: {
    name: 'complete' | 'incomplete';
    description: 'complete' | 'incomplete';
    stack: 'complete' | 'incomplete';
  };
}
