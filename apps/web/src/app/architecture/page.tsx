"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useState } from "react";

function ResizeHandle() {
  return (
    <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-blue-600 transition-colors" />
  );
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ArchitecturePage() {
  const [projectDescription, setProjectDescription] = useState(`# Project Description

## Overview
A web-based IDE with AI capabilities...

## Features
- Feature 1
- Feature 2

## Technical Stack
- Frontend: React, Next.js
- Backend: Node.js`);

  const [systemPrompt, setSystemPrompt] = useState(`You are an expert software architect and developer...

Your task is to help build a web-based IDE with the following capabilities:
1. Code editing
2. AI assistance
3. Project management

Please follow these guidelines...`);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { role: "user", content: inputMessage },
      // Temporary placeholder response
      { role: "assistant", content: "I'll help you refine the architecture. What specific aspects would you like to modify?" }
    ]);
    setInputMessage("");
  };

  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] flex flex-col">
      <div className="flex-1">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Project Description */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-[#252526] p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Project Description</h2>
                <button
                  onClick={() => setIsEditingDescription(!isEditingDescription)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {isEditingDescription ? "Save" : "Edit"}
                </button>
              </div>
              {isEditingDescription ? (
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded p-3 font-mono text-sm resize-none"
                />
              ) : (
                <div className="flex-1 bg-[#1e1e1e] rounded p-3 overflow-auto font-mono text-sm whitespace-pre-wrap">
                  {projectDescription}
                </div>
              )}
            </div>
          </Panel>

          <ResizeHandle />

          {/* Right Panel - System Prompt */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-[#2d2d2d] p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">System Prompt</h2>
                <button
                  onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {isEditingPrompt ? "Save" : "Edit"}
                </button>
              </div>
              {isEditingPrompt ? (
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded p-3 font-mono text-sm resize-none"
                />
              ) : (
                <div className="flex-1 bg-[#1e1e1e] rounded p-3 overflow-auto font-mono text-sm whitespace-pre-wrap">
                  {systemPrompt}
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Bottom Chat Panel */}
      <div className="h-64 bg-[#252526] p-4 flex flex-col border-t border-[#3e3e3e]">
        <h2 className="text-lg font-semibold mb-3">AI Architect Chat</h2>
        <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-3 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${
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
            placeholder="Ask for architecture modifications..."
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
    </main>
  );
}
