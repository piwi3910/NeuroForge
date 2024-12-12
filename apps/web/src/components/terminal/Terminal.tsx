"use client";

import { CommandInput } from './CommandInput';
import { CommandOutput } from './CommandOutput';
import { useTerminal } from './useTerminal';

export function Terminal() {
  const {
    commands,
    currentInput,
    suggestions,
    selectedSuggestion,
    terminalRef,
    inputRef,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick
  } = useTerminal();

  return (
    <div 
      className="h-full w-full font-mono text-sm flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="p-2 border-b border-[#2d2d2d] text-xs">
        <span className="text-gray-400">TERMINAL</span>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-2 space-y-1"
      >
        <CommandOutput commands={commands} />
        <CommandInput
          currentInput={currentInput}
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          inputRef={inputRef}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
    </div>
  );
}
