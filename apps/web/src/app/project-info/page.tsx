"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, ProjectDetails } from "@/types/api";
import { apiClient } from "@/services/api";
import { DirectoryBrowser } from "@/components/DirectoryBrowser";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Dialog } from "@/components/Dialog";

export default function ProjectPage() {
  // Previous state declarations and handlers remain the same...
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectPath, setProjectPath] = useState("");
  const [gitUrl, setGitUrl] = useState("");
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedStates, setSavedStates] = useState<string[]>([]);
  const [totalSavedProjects, setTotalSavedProjects] = useState(0);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start chat when repository is initialized
  useEffect(() => {
    if (isGitRepo && projectId) {
      handleStartChat();
    }
  }, [isGitRepo, projectId]);

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

  const handleStartChat = async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      const response = await apiClient.chatWithAI(projectId, "start");
      setMessages([{
        role: "assistant",
        content: response.content,
        timestamp: new Date(response.timestamp)
      }]);
    } catch (error) {
      console.error('Failed to start chat:', error);
      setMessages([{
        role: "assistant",
        content: "Hello! I'm your AI Architect. Let's define your project together. What would you like to build?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrowse = () => {
    setIsBrowseOpen(true);
  };

  const handleSelectDirectory = (path: string) => {
    setProjectPath(path);
  };

  const handleReset = async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      await apiClient.resetProject(projectId);
      // Reset all state
      setProjectId(null);
      setProjectPath("");
      setGitUrl("");
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
      setMessages([]);
      setSavedStates([]);
    } catch (error) {
      console.error('Failed to reset project:', error);
      alert("Failed to reset project. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        undefined // No git URL for local init
      );
      setProjectId(project.id);
      setIsGitRepo(true);
      setGitUrl(""); // Clear git URL since we've initialized locally
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isGitRepo || !projectId) return;

    try {
      setIsLoading(true);
      console.log('Sending message:', inputMessage); // Debug log
      
      // Add user message to chat
      const userMessage: ChatMessage = {
        role: "user",
        content: inputMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");

      // Get AI response
      const response = await apiClient.chatWithAI(projectId, inputMessage);
      console.log('Received AI response:', response); // Debug log
      
      // Update project details if provided
      if (response.details) {
        console.log('Updating project details:', response.details); // Debug log
        setProjectDetails(prev => ({
          name: response.details?.name || prev.name,
          description: response.details?.description || prev.description,
          stack: response.details?.stack || prev.stack,
          status: response.details?.status || prev.status
        }));
      }

      // Add AI message to chat
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.content,
        timestamp: new Date(response.timestamp)
      }]);

      // Focus the input after sending
      chatInputRef.current?.focus();
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Check if all required fields are complete
  const isProjectDefined = projectDetails.status?.name === 'complete' && 
                          projectDetails.status?.description === 'complete' && 
                          projectDetails.status?.stack === 'complete';

  console.log('Project details:', projectDetails); // Debug log
  console.log('Is project defined:', isProjectDefined); // Debug log

  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex-1 flex gap-4">
        {/* Project Setup Panel */}
        <div className="w-1/3 bg-[#252526] rounded p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Project Setup</h2>
          
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
            </div>
          </div>

          <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Project Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={isGitRepo ? "text-green-500" : "text-yellow-500"}>
                  {isGitRepo ? "Ready" : "Not Initialized"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Local Path:</span>
                <span>{projectPath || "Not set"}</span>
              </div>
              {gitUrl && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Remote URL:</span>
                  <span>{gitUrl}</span>
                </div>
              )}
              <div className="pt-4 space-y-3">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <div className="mt-1 text-white">{projectDetails.name || "Not set"}</div>
                </div>
                <div>
                  <span className="text-gray-400">Description:</span>
                  <div className="mt-1 text-white">{projectDetails.description || "Not set"}</div>
                </div>
                <div>
                  <span className="text-gray-400">Stack:</span>
                  <div className="mt-1 text-white">{projectDetails.stack || "Not set"}</div>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className={projectDetails.status?.name === 'complete' ? "text-green-500" : "text-yellow-500"}>
                        {projectDetails.status?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Description:</span>
                      <span className={projectDetails.status?.description === 'complete' ? "text-green-500" : "text-yellow-500"}>
                        {projectDetails.status?.description}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stack:</span>
                      <span className={projectDetails.status?.stack === 'complete' ? "text-green-500" : "text-yellow-500"}>
                        {projectDetails.status?.stack}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsResetDialogOpen(true)}
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
        </div>

        {/* AI Architect Chat */}
        <div className="flex-1 bg-[#252526] rounded p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">AI Architect Chat</h2>
          
          <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "assistant"
                        ? "bg-[#2e2e2e] rounded-tl-none"
                        : "bg-blue-600 rounded-tr-none"
                    }`}
                  >
                    <p className="text-white">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="flex gap-2">
            <input
              ref={chatInputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isGitRepo ? "Type your message..." : "Please set up your project repository first"}
              className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded-full px-4 py-2"
              disabled={isLoading || !isGitRepo}
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 ${
                (isLoading || !isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading || !isGitRepo}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      <DirectoryBrowser
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        onSelect={handleSelectDirectory}
        initialPath="/home/piwi/Git/NeuroForge/projects"
      />

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleReset}
        title="Reset Project"
        message="Are you sure? This will reset and delete your project."
      />

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
    </main>
  );
}
