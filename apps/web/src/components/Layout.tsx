"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Editor } from "./Editor";
import { FileExplorer } from "./FileExplorer";
import { Terminal } from "./Terminal";
import { AiChat } from "./AiChat";
import { GitPanel } from "./GitPanel";
import { MenuBar } from "./MenuBar";

function ResizeHandle({ className = "", orientation = "vertical" }: { className?: string; orientation?: "vertical" | "horizontal" }) {
  return (
    <PanelResizeHandle 
      className={`${orientation === "vertical" ? "w-[6px]" : "h-[6px]"} bg-[#2d2d2d] hover:bg-blue-600 transition-colors ${className}`} 
    />
  );
}

export function Layout({ showMenuBar }: { showMenuBar?: boolean }) {
  return (
    <div className="h-[calc(100vh-40px)] bg-[#1e1e1e] text-white flex flex-col">
      {showMenuBar && <MenuBar />}
      <div className="flex-1">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel Group */}
          <Panel defaultSize={20} minSize={10}>
            <PanelGroup direction="vertical">
              {/* File Explorer */}
              <Panel defaultSize={70} minSize={30} className="bg-[#252526]">
                <FileExplorer />
              </Panel>

              <ResizeHandle orientation="horizontal" />

              {/* Git Panel */}
              <Panel defaultSize={30} minSize={10} className="bg-[#252526]">
                <GitPanel />
              </Panel>
            </PanelGroup>
          </Panel>

          <ResizeHandle />

          {/* Center Panel Group */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Editor */}
              <Panel defaultSize={70} minSize={30}>
                <Editor />
              </Panel>

              <ResizeHandle orientation="horizontal" />

              {/* Terminal */}
              <Panel defaultSize={30} minSize={10} className="bg-[#252526]">
                <Terminal />
              </Panel>
            </PanelGroup>
          </Panel>

          <ResizeHandle />

          {/* Right Panel - AI Chat */}
          <Panel defaultSize={20} minSize={10} className="bg-[#252526]">
            <AiChat />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
