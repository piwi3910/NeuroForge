"use client";

import { useState, useRef } from "react";
import { ChatMessage } from "@/types/api";
import { apiClient } from "@/services/api";
import { DirectoryBrowser } from "@/components/DirectoryBrowser";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface ProjectDetails {
  name: string;
  description: string;
  stack: string;
}

export default function ProjectPage() {
  const [projectPath, setProjectPath] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [isGitRepo, setIsGitRepo] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    name: "",
    description: "",
    stack: ""
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Architect. Once you've set up your project repository, I'll help you define your project architecture.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    setIsBrowseOpen(true);
  };

  const handleSelectDirectory = (path: string) => {
    setProjectPath(path);
  };

  const handleReset = async () => {
    if (!projectPath) return;

    setIsLoading(true);
    try {
      await apiClient.resetProject("initial");
      // Reset all state
      setProjectPath("");
      setGitUrl("");
      setIsGitRepo(false);
      setProjectDetails({
        name: "",
        description: "",
        stack: ""
      });
      setMessages([{
        role: "assistant",
        content: "Hello! I'm your AI Architect. Once you've set up your project repository, I'll help you define your project architecture.",
        timestamp: new Date()
      }]);
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
      await apiClient.createProject(
        projectPath.split("/").pop() || "new-project",
        "New project",
        undefined // No git URL for local init
      );
      setIsGitRepo(true);
      setGitUrl(""); // Clear git URL since we've initialized locally
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
      await apiClient.createProject(
        projectPath.split("/").pop() || "new-project",
        "Cloned project",
        gitUrl
      );
      setIsGitRepo(true);
    } catch (error) {
      console.error('Failed to clone repository:', error);
      alert("Failed to clone repository. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isGitRepo) return;

    try {
      setIsLoading(true);
      
      // Add user message to chat
      const userMessage: ChatMessage = {
        role: "user",
        content: inputMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");

      // Get AI response
      const response = await apiClient.chatWithAI("initial", inputMessage);
      
      // Add AI response to chat
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
              disabled={true} // Disabled for now
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm opacity-50 cursor-not-allowed"
            >
              Build
            </button>
          </div>
        </div>

        {/* AI Architect Chat */}
        <div className="flex-1 bg-[#252526] rounded p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">AI Architect Chat</h2>
          
          <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "assistant" ? "text-blue-400" : "text-green-400"
                }`}
              >
                <span className="font-medium">
                  {message.role === "assistant" ? "AI Architect: " : "You: "}
                </span>
                <span className="text-white">{message.content}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              ref={chatInputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isGitRepo ? "Describe your project..." : "Please set up your project repository first"}
              className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
              disabled={isLoading || !isGitRepo}
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
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
    </main>
  );
}
