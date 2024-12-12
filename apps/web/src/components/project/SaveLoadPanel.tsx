import { useState, useEffect } from 'react';
import { Dialog } from '../Dialog';
import { apiClient } from '../../services/api';
import { ProjectDetails } from '../../types/project-info';

interface SaveLoadPanelProps {
  projectId: string | null;
  projectPath: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setProjectDetails: (details: ProjectDetails) => void;
  setIsGitRepo: (value: boolean) => void;
}

export function SaveLoadPanel({
  projectId,
  projectPath,
  isLoading,
  setIsLoading,
  setProjectDetails,
  setIsGitRepo
}: SaveLoadPanelProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
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

  const handleSaveState = async () => {
    if (!saveName || !projectId) return;

    setIsLoading(true);
    try {
      await apiClient.saveProjectState(projectId, saveName);
      await loadSavedStates();
      const count = await apiClient.getTotalSavedProjects();
      setTotalSavedProjects(count);
      setIsSaveDialogOpen(false);
      setSaveName("");
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

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setIsSaveDialogOpen(true)}
        disabled={!projectPath || isLoading}
        className={`flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm ${
          (!projectPath || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Save State
      </button>
      <button
        onClick={() => setIsLoadDialogOpen(true)}
        disabled={isLoading || totalSavedProjects === 0}
        className={`flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm ${
          (isLoading || totalSavedProjects === 0) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Load State ({totalSavedProjects})
      </button>

      <Dialog
        isOpen={isSaveDialogOpen}
        onClose={() => {
          setIsSaveDialogOpen(false);
          setSaveName("");
        }}
        title="Save Project State"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Save Name</label>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter a name for this save"
              className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsSaveDialogOpen(false);
                setSaveName("");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveState}
              disabled={!saveName}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                !saveName ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={isLoadDialogOpen}
        onClose={() => setIsLoadDialogOpen(false)}
        title="Load Project State"
      >
        <div className="space-y-4">
          <div className="max-h-60 overflow-auto">
            {savedStates.map((state) => (
              <button
                key={state}
                onClick={() => handleLoadState(state)}
                className="w-full text-left px-4 py-2 hover:bg-[#2e2e2e] rounded"
              >
                {state}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsLoadDialogOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
