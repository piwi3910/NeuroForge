import { useState } from "react";
import { apiClient } from "../../services/api";
import { ProjectDetails } from "../../types/project-info";
import { UseProjectInfo } from "./types";

const DEFAULT_PROJECT_DETAILS: ProjectDetails = {
  name: null,
  description: null,
  stack: null,
  status: {
    name: 'incomplete',
    description: 'incomplete',
    stack: 'incomplete'
  }
};

export function useProjectInfo(): UseProjectInfo {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectPath, setProjectPath] = useState("");
  const [isGitRepo, setIsGitRepo] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(DEFAULT_PROJECT_DETAILS);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleReset = async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      await apiClient.resetProject(projectId);
      // Reset all state
      setProjectId(null);
      setProjectPath("");
      setIsGitRepo(false);
      setProjectDetails(DEFAULT_PROJECT_DETAILS);
    } catch (error) {
      console.error('Failed to reset project:', error);
      alert("Failed to reset project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    projectId,
    projectPath,
    isGitRepo,
    projectDetails,
    isLoading,
    isResetDialogOpen,
    // Actions
    setProjectId,
    setProjectPath,
    setIsGitRepo,
    setProjectDetails,
    setIsLoading,
    setIsResetDialogOpen,
    handleReset
  };
}
