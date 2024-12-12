"use client";

import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useAiChat } from './useAiChat';

export function AiChat() {
  const {
    messages,
    input,
    isTyping,
    messagesEndRef,
    textareaRef,
    setInput,
    handleSubmit,
  } = useAiChat();

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 border-b border-[#2d2d2d]">
        <div className="text-sm font-medium mb-1">AI ASSISTANT</div>
        <div className="text-xs text-gray-400">NeuroForge AI</div>
      </div>
      
      <MessageList 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        isTyping={isTyping}
        onSubmit={handleSubmit}
        textareaRef={textareaRef}
      />
    </div>
  );
}
