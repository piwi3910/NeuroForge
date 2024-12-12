import { MessageListProps } from './types';

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 bg-[#1e1e1e] rounded p-3 mb-4 overflow-auto">
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === "assistant"
                  ? "bg-[#2e2e2e] rounded-tl-none"
                  : "bg-blue-600 rounded-tr-none"
              }`}
            >
              <p className="text-white">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
