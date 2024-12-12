import { useState, useEffect } from 'react';
import { apiClient } from '../../../services/api';
import { ProjectDetails } from '../../../types/project-info';

export function useSaveLoad(
  projectId: string | null,
  projectPath: string,
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
  setProjectDetails: (details: ProjectDetails) => void,
  setIsGitRepo: (value: boolean) => void
) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [savedStates, setSavedStates] = useState<string[]>([]);
  const [totalSavedProjects, setTotalSavedProjects] = useState(0);

  // Load total saved projects when component mounts
  useEffect(() => {
    const loadTotalSavedProjects = async () => {
      try {
        const count = await apiClient.getTotalSavedProjects();
        setTotalSavedProjects(count);
      } catch (error) {
        console.error('Failed to get total saved projects:', error);
      }
    };
    loadTotalSavedProjects();
  }, []);

  // Load saved states when component mounts or project ID changes
  useEffect(() => {
    if (projectId) {
      loadSavedStates();
    }
  }, [projectId]);

  const loadSavedStates = async () => {
    if (!projectId) return;
    try {
      const states = await apiClient.listProjectSaves(projectId);
      console.log('Loaded saved states:', states);
      setSavedStates(states);
    } catch (error) {
      console.error('Failed to load saved states:', error);
    }
  };

  const handleSaveState = async (saveName: string) => {
    if (!saveName || !projectId) return;

    setIsLoading(true);
    try {
      await apiClient.saveProjectState(projectId, saveName);
      await loadSavedStates();
      const count = await apiClient.getTotalSavedProjects();
      setTotalSavedProjects(count);
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error('Failed to save project state:', error);
      alert("Failed to save project state. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadState = async (stateName: string) => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const project = await apiClient.loadProjectState(projectId, stateName);
      setProjectDetails(project.details);
      setIsGitRepo(true);
      setIsLoadDialogOpen(false);
    } catch (error) {
      console.error('Failed to load project state:', error);
      alert("Failed to load project state. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = {
    save: !projectPath || isLoading,
    load: isLoading || totalSavedProjects === 0
  };

  return {
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    isLoadDialogOpen,
    setIsLoadDialogOpen,
    savedStates,
    totalSavedProjects,
    handleSaveState,
    handleLoadState,
    isDisabled
  };
}
