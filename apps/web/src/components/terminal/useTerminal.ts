import { useState, useRef, useEffect } from 'react';
import { Command } from './types';
import { INITIAL_COMMANDS, COMMAND_SUGGESTIONS } from './constants';
import { simulateCommand, filterSuggestions } from './utils';

export function useTerminal() {
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
    setSuggestions(filterSuggestions(value, COMMAND_SUGGESTIONS));
    setSelectedSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentInput(suggestion);
    setSuggestions([]);
  };

  return {
    commands,
    currentInput,
    suggestions,
    selectedSuggestion,
    terminalRef,
    inputRef,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick
  };
}
