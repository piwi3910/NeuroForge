"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ResizeHandle() {
  return (
    <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-blue-600 transition-colors" />
  );
}

function BacklogList() {
  const backlogItems = [
    { id: 1, title: "Implement authentication", priority: "High" },
    { id: 2, title: "Add file search functionality", priority: "Medium" },
    { id: 3, title: "Create user settings page", priority: "Low" },
    { id: 4, title: "Improve error handling", priority: "Medium" },
    { id: 5, title: "Add dark/light theme toggle", priority: "Low" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Project Backlog</h1>
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Item
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {backlogItems.map((item) => (
          <div
            key={item.id}
            className="mb-2 p-3 bg-[#2d2d2d] rounded hover:bg-[#363636] cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm">{item.title}</span>
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
        { id: 1, title: "Setup CI/CD pipeline" },
        { id: 2, title: "Write documentation" },
      ],
    },
    {
      title: "In Progress",
      items: [
        { id: 3, title: "Implement file explorer" },
        { id: 4, title: "Add terminal integration" },
      ],
    },
    {
      title: "Done",
      items: [
        { id: 5, title: "Create project structure" },
        { id: 6, title: "Setup development environment" },
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
                  <span className="text-sm">{item.title}</span>
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
