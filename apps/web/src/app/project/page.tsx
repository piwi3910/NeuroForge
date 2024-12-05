"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useState } from "react";

function ResizeHandle() {
  return (
    <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-blue-600 transition-colors" />
  );
}

interface BacklogItem {
  id: number;
  type: "epic" | "story" | "task";
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "To Do" | "In Progress" | "Done";
  epicId?: number;  // For stories and tasks
  storyId?: number; // For tasks
  description?: string;
}

function BacklogList() {
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([
    { 
      id: 1, 
      type: "epic", 
      title: "User Authentication System", 
      priority: "High",
      status: "Backlog",
      description: "Implement complete user authentication flow"
    },
    { 
      id: 2, 
      type: "story", 
      title: "User Registration", 
      priority: "High",
      status: "Backlog",
      epicId: 1,
      description: "Users should be able to create new accounts"
    },
    { 
      id: 3, 
      type: "task", 
      title: "Create registration form", 
      priority: "Medium",
      status: "Backlog",
      epicId: 1,
      storyId: 2
    }
  ]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'epic': return '🔷';
      case 'story': return '📖';
      case 'task': return '✓';
      default: return '•';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Project Backlog</h1>
        <button 
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          title="Generate items using AI Architect"
        >
          Generate Items
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {backlogItems.map((item) => (
          <div
            key={item.id}
            className={`mb-2 p-3 bg-[#2d2d2d] rounded hover:bg-[#363636] cursor-pointer ${
              item.type === 'story' ? 'ml-4' : item.type === 'task' ? 'ml-8' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <span className="mt-1">{getItemIcon(item.type)}</span>
                <div>
                  <span className="text-sm">{item.title}</span>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.priority === "High" 
                  ? "bg-red-900/50 text-red-200"
                  : item.priority === "Medium"
                  ? "bg-yellow-900/50 text-yellow-200"
                  : "bg-green-900/50 text-green-200"
              }`}>
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoard() {
  const columns = [
    {
      title: "To Do",
      items: [
        { id: 1, title: "Setup CI/CD pipeline", type: "task" },
        { id: 2, title: "Write documentation", type: "task" },
      ],
    },
    {
      title: "In Progress",
      items: [
        { id: 3, title: "Implement file explorer", type: "task" },
        { id: 4, title: "Add terminal integration", type: "task" },
      ],
    },
    {
      title: "Done",
      items: [
        { id: 5, title: "Create project structure", type: "task" },
        { id: 6, title: "Setup development environment", type: "task" },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Kanban Board</h1>
      <div className="flex-1 flex gap-4 overflow-auto">
        {columns.map((column) => (
          <div key={column.title} className="flex-1 min-w-[250px]">
            <div className="mb-2 p-2 bg-[#363636] rounded-t">
              <h2 className="font-medium">{column.title}</h2>
            </div>
            <div className="space-y-2">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#2d2d2d] rounded hover:bg-[#363636] cursor-move"
                >
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span className="text-sm">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectManagementPage() {
  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e]">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={20}>
          <div className="h-full bg-[#252526] p-4">
            <BacklogList />
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={50} minSize={20}>
          <div className="h-full bg-[#2d2d2d] p-4">
            <KanbanBoard />
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
}
