import { ChatInputProps } from './types';

export function ChatInput({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  isGitRepo,
  chatInputRef
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        ref={chatInputRef}
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isGitRepo ? "Type your message..." : "Please set up your project repository first"}
        className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded-full px-4 py-2"
        disabled={isLoading || !isGitRepo}
      />
      <button
        onClick={handleSendMessage}
        className={`px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 ${
          (isLoading || !isGitRepo) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading || !isGitRepo}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
