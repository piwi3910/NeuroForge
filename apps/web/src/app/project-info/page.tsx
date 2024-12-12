"use client";

import { useState } from "react";
import { ProjectDetails } from "../../types/project-info";
import { apiClient } from "../../services/api";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { ProjectSetupPanel } from "../../components/project/ProjectSetupPanel";
import { ProjectDetailsPanel } from "../../components/project/ProjectDetailsPanel";
import { ChatPanel } from "../../components/project/ChatPanel";
import { SaveLoadPanel } from "../../components/project/SaveLoadPanel";

export default function ProjectPage() {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectPath, setProjectPath] = useState("");
  const [isGitRepo, setIsGitRepo] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    name: null,
    description: null,
    stack: null,
    status: {
      name: 'incomplete',
      description: 'incomplete',
      stack: 'incomplete'
    }
  });
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
      setProjectDetails({
        name: null,
        description: null,
        stack: null,
        status: {
          name: 'incomplete',
          description: 'incomplete',
          stack: 'incomplete'
        }
      });
    } catch (error) {
      console.error('Failed to reset project:', error);
      alert("Failed to reset project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex-1 flex gap-4">
        {/* Left Panel */}
        <div className="w-1/3 bg-[#252526] rounded p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Project Setup</h2>
          
          <ProjectSetupPanel
            projectPath={projectPath}
            setProjectPath={setProjectPath}
            isGitRepo={isGitRepo}
            setIsGitRepo={setIsGitRepo}
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            setProjectId={setProjectId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onReset={() => setIsResetDialogOpen(true)}
          />

          <ProjectDetailsPanel
            projectPath={projectPath}
            isGitRepo={isGitRepo}
            projectDetails={projectDetails}
          />

          <SaveLoadPanel
            projectId={projectId}
            projectPath={projectPath}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setProjectDetails={setProjectDetails}
            setIsGitRepo={setIsGitRepo}
          />
        </div>

        {/* Right Panel */}
        <ChatPanel
          projectId={projectId}
          isGitRepo={isGitRepo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setProjectDetails={setProjectDetails}
        />
      </div>

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleReset}
        title="Reset Project"
        message="Are you sure? This will reset and delete your project."
      />
    </main>
  );
}
