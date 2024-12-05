"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ProjectPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Architect. I'll help you define your project and set up the architecture. Let's start by choosing a location for your project. Where would you like to store it?"
    }
  ]);
  const [projectPath, setProjectPath] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { role: "user", content: inputMessage },
      // Temporary placeholder response
      { role: "assistant", content: "I understand. Let me help you with that. Could you tell me more about what kind of project you want to create?" }
    ]);
    setInputMessage("");
  };

  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex-1 flex gap-4">
        {/* Project Setup Panel */}
        <div className="w-1/3 bg-[#252526] rounded p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Project Setup</h2>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Project Location (Git Repository)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                placeholder="/path/to/your/project"
                className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm"
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Browse
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Project Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-yellow-500">Defining</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Git Repository:</span>
                <span>{projectPath || "Not set"}</span>
              </div>
            </div>
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
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe your project..."
              className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
