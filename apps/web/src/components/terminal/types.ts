export interface Command {
  input: string;
  output: string[];
  error?: boolean;
}

export interface CommandInputProps {
  currentInput: string;
  suggestions: string[];
  selectedSuggestion: number;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export interface CommandOutputProps {
  commands: Command[];
}
