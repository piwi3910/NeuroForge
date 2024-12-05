"use client";

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useRef } from 'react';
import type { editor } from 'monaco-editor';

export function Editor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    
    // Focus the editor
    editor.focus();

    // Add some sample code
    editor.setValue(`// Welcome to NeuroForge IDE
import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>Welcome to NeuroForge</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`);
  };

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        options={{
          fontFamily: "'Fira Code', 'Consolas', monospace",
          fontSize: 14,
          lineHeight: 21,
          minimap: {
            enabled: true,
            scale: 2,
            showSlider: "mouseover"
          },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          renderWhitespace: "selection",
          wordWrap: "on",
          wrappingIndent: "indent",
          guides: {
            bracketPairs: true,
            indentation: true
          },
          folding: true,
          showFoldingControls: "always",
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          colorDecorators: true,
          renderLineHighlight: "all",
          matchBrackets: "always",
          selectionHighlight: true,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showConstants: true,
            showProperties: true,
            showConstructors: true,
            showModules: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showWords: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showIssues: true
          }
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
