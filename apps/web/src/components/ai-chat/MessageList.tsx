import { Markdown } from '../Markdown';
import { MessageListProps } from './types';
import { formatTime } from './utils';

export function MessageList({ messages, isTyping, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-[#2d2d2d] text-gray-100'
            }`}
          >
            <div className="text-xs text-gray-400 mb-1">
              {message.role === 'assistant' ? 'Assistant' : 'You'} • {formatTime(message.timestamp)}
            </div>
            <div className="text-sm prose prose-invert max-w-none">
              <Markdown content={message.content} />
            </div>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-[#2d2d2d] rounded-lg p-3 max-w-[80%]">
            <div className="text-xs text-gray-400 mb-1">Assistant is typing...</div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
