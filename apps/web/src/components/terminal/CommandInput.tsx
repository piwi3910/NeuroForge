import { CommandInputProps } from './types';

export function CommandInput({
  currentInput,
  suggestions,
  selectedSuggestion,
  inputRef,
  onInputChange,
  onKeyDown,
  onSuggestionClick
}: CommandInputProps) {
  return (
    <div className="flex items-center relative">
      <span className="text-green-500">➜</span>
      <span className="text-blue-400 ml-2">~</span>
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
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
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
