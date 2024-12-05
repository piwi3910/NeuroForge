"use client";

import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string[];
  error?: boolean;
}

const INITIAL_COMMANDS: Command[] = [
  {
    input: "npm start",
    output: [
      "Ready - started server on 0.0.0.0:3000",
      "Event compiled successfully"
    ]
  }
];

const COMMAND_SUGGESTIONS = [
  'npm start',
  'npm install',
  'npm run build',
  'npm run dev',
  'git status',
  'git add .',
  'git commit -m',
  'git push',
  'git pull',
  'git branch',
  'git checkout',
  'clear'
];

export function Terminal() {
  const [commands, setCommands] = useState<Command[]>(INITIAL_COMMANDS);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const simulateCommand = (input: string): string[] => {
    if (input.startsWith('git status')) {
      return [
        'On branch main',
        'Your branch is up to date with \'origin/main\'',
        '',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '  (use "git restore <file>..." to discard changes in working directory)',
        '        modified:   src/components/Terminal.tsx',
        '',
        'no changes added to commit (use "git add" and/or "git commit -a")'
      ];
    }
    
    if (input.startsWith('git branch')) {
      return [
        '* main',
        '  feature/terminal',
        '  feature/file-explorer'
      ];
    }

    if (input.startsWith('npm install')) {
      return [
        'added 1247 packages in 2m',
        '',
        '150 packages are looking for funding',
        '  run `npm fund` for details'
      ];
    }

    if (input.startsWith('npm run build')) {
      return [
        '> neuroforge@0.1.0 build',
        '> next build',
        '',
        '   ▲ Next.js 13.4.19',
        '',
        ' ✓ Creating an optimized production build',
        ' ✓ Compiled successfully',
        ' ✓ Linting and checking validity of types',
        ' ✓ Collecting page data',
        ' ✓ Generating static pages',
        ' ✓ Collecting build traces',
        '',
        'Route (app)                              Size     First Load JS',
        '┌ ○ /                                    5.13 kB        88.9 kB',
        '└ ○ /favicon.ico                         0 B                0 B',
        '+ First Load JS shared by all            83.8 kB',
        '  ├ chunks/main-app.js                   83.8 kB',
        '  └ chunks/webpack.js                    816 B',
        '',
        '✓ Done in 12.34s'
      ];
    }

    return [`Command not found: ${input}`];
  };

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newCommand: Command = {
      input: trimmedInput,
      output: [],
      error: false
    };

    if (trimmedInput === 'clear') {
      setCommands([]);
      setCurrentInput("");
      return;
    }

    newCommand.output = simulateCommand(trimmedInput);
    newCommand.error = newCommand.output[0].includes('Command not found');

    setCommands(prev => [...prev, newCommand]);
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);
    setCurrentInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => 
          prev >= suggestions.length - 1 ? -1 : prev + 1
        );
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (selectedSuggestion !== -1) {
        setCurrentInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      } else if (suggestions.length === 1) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Show suggestions
    if (value) {
      const matches = COMMAND_SUGGESTIONS.filter(cmd => 
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
      setSelectedSuggestion(-1);
    } else {
      setSuggestions([]);
    }
  };

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
        {commands.map((command, i) => (
          <div key={i}>
            <div className="flex items-center">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400 ml-2">~</span>
              <span className="ml-2">{command.input}</span>
            </div>
            {command.output.map((line, j) => (
              <div 
                key={j}
                className={command.error ? 'text-red-400' : 'text-gray-300'}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center relative">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400 ml-2">~</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent outline-none"
            spellCheck={false}
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 bottom-full mb-1 bg-[#2d2d2d] border border-[#404040] rounded overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-3 py-1 hover:bg-[#404040] cursor-pointer ${
                    index === selectedSuggestion ? 'bg-[#404040]' : ''
                  }`}
                  onClick={() => {
                    setCurrentInput(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
