import { useState } from 'react';
import { DirectoryBrowser } from '../DirectoryBrowser';
import { apiClient } from '../../services/api';
import { ProjectDetails } from '../../types/project-info';

interface ProjectSetupPanelProps {
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

export function ProjectSetupPanel({
  projectPath,
  setProjectPath,
  isGitRepo,
  setIsGitRepo,
  projectDetails,
  setProjectDetails,
  setProjectId,
  isLoading,
  setIsLoading,
  onReset
}: ProjectSetupPanelProps) {
  const [gitUrl, setGitUrl] = useState("");
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  const handleBrowse = () => {
    setIsBrowseOpen(true);
  };

  const handleSelectDirectory = (path: string) => {
    setProjectPath(path);
  };

  const handleInitRepo = async () => {
    if (!projectPath || isGitRepo) {
      return;
    }

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
    if (!projectPath || !gitUrl || isGitRepo) {
      return;
    }

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

  const isProjectDefined = projectDetails.status?.name === 'complete' && 
                          projectDetails.status?.description === 'complete' && 
                          projectDetails.status?.stack === 'complete';

  return (
    <div className="space-y-4 mb-4">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Local Project Path</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="/path/to/your/project"
            className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm"
            disabled={isGitRepo}
          />
          <button 
            onClick={handleBrowse}
            className={`px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm ${
              isGitRepo ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isGitRepo}
          >
            Browse
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">Git Repository URL (Optional)</label>
          <input
            type="text"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
            placeholder="https://github.com/user/repo.git"
            className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm"
            disabled={isGitRepo}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleInitRepo}
          disabled={!projectPath || isLoading || isGitRepo}
          className={`flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm ${
            (!projectPath || isLoading || isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Initialize Local Repository
        </button>
        <button
          onClick={handleCloneRepo}
          disabled={!projectPath || !gitUrl || isLoading || isGitRepo}
          className={`flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm ${
            (!projectPath || !gitUrl || isLoading || isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Clone Repository
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onReset}
          disabled={!projectPath || isLoading}
          className={`flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm ${
            (!projectPath || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Reset
        </button>
        <button
          disabled={!isProjectDefined}
          className={`flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm ${
            !isProjectDefined ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Build
        </button>
      </div>

      <DirectoryBrowser
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        onSelect={handleSelectDirectory}
        initialPath="/home/piwi/Git/NeuroForge/projects"
      />
    </div>
  );
}
