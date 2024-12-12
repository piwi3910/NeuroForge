import { useState } from 'react';
import { apiClient } from '../../../services/api';
import { ProjectDetails } from '../../../types/project-info';

export function useProjectSetup(
  projectPath: string,
  setProjectId: (id: string | null) => void,
  setIsGitRepo: (value: boolean) => void,
  setProjectDetails: (details: ProjectDetails) => void,
  setIsLoading: (value: boolean) => void
) {
  const [gitUrl, setGitUrl] = useState("");
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  const handleBrowse = () => {
    setIsBrowseOpen(true);
  };

  const handleInitRepo = async () => {
    if (!projectPath) return;

    setIsLoading(true);
    try {
      const project = await apiClient.createProject(
        projectPath.split("/").pop() || "new-project",
        "New project",
        undefined
      );
      setProjectId(project.id);
      setIsGitRepo(true);
      setGitUrl("");
      if (project.details) {
        setProjectDetails(project.details);
      }
    } catch (error) {
      console.error('Failed to initialize repository:', error);
      alert("Failed to initialize repository. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloneRepo = async () => {
    if (!projectPath || !gitUrl) return;

    setIsLoading(true);
    try {
      const project = await apiClient.createProject(
        projectPath.split("/").pop() || "new-project",
        "Cloned project",
        gitUrl
      );
      setProjectId(project.id);
      setIsGitRepo(true);
      if (project.details) {
        setProjectDetails(project.details);
      }
    } catch (error) {
      console.error('Failed to clone repository:', error);
      alert("Failed to clone repository. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    gitUrl,
    setGitUrl,
    isBrowseOpen,
    setIsBrowseOpen,
    handleBrowse,
    handleInitRepo,
    handleCloneRepo
  };
}
