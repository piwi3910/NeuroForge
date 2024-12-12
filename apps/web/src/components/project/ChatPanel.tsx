import { ChatPanelProps } from './chat/types';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';
import { useChat } from './chat/useChat';

export function ChatPanel({
  projectId,
  isGitRepo,
  isLoading,
  setIsLoading,
  setProjectDetails
}: ChatPanelProps) {
  const {
    messages,
    inputMessage,
    setInputMessage,
    chatInputRef,
    messagesEndRef,
    handleSendMessage,
  } = useChat(
    projectId,
    isGitRepo,
    isLoading,
    setIsLoading,
    setProjectDetails
  );

  return (
    <div className="flex-1 bg-[#252526] rounded p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">AI Architect Chat</h2>
      
      <MessageList 
        messages={messages}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        isGitRepo={isGitRepo}
        chatInputRef={chatInputRef}
      />
    </div>
  );
}
