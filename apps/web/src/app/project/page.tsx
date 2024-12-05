"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ResizeHandle() {
  return (
    <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-blue-600 transition-colors" />
  );
}

export default function ProjectPage() {
  return (
    <main className="h-[calc(100vh-2.5rem)] bg-[#1e1e1e]">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={20}>
          <div className="h-full bg-[#252526] p-4">
            <h1 className="text-2xl font-semibold mb-4">Project Backlog</h1>
            <p>This is the project backlog panel.</p>
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={50} minSize={20}>
          <div className="h-full bg-[#2d2d2d] p-4">
            <h1 className="text-2xl font-semibold mb-4">Kanban Board</h1>
            <p>This is the Kanban-style board panel.</p>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
}
