"use client";

import { useState, useRef, useEffect } from 'react';
import { Markdown } from './Markdown';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI programming assistant. I can help you with:

- Writing and explaining code
- Debugging problems
- Answering programming questions
- Generating documentation

Try asking me something! I support markdown and code blocks, for example:

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\``,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response: string;
      
      if (userMessage.toLowerCase().includes('example')) {
        response = `Here's an example React component:

\`\`\`tsx
import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div className="p-4 border rounded">
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
\`\`\`

You can use this component like this:

\`\`\`tsx
<Counter initialCount={5} />
\`\`\``;
      } else if (userMessage.toLowerCase().includes('help')) {
        response = `I can help you with various programming tasks:

1. **Code Generation**
   - React components
   - TypeScript interfaces
   - API endpoints

2. **Debugging**
   - Error analysis
   - Performance optimization
   - Code review

3. **Best Practices**
   - Code organization
   - Design patterns
   - Testing strategies

What would you like to know more about?`;
      } else {
        response = "I understand you're asking about programming. Could you provide more specific details about what you'd like help with?";
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    simulateAIResponse(userMessage.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 border-b border-[#2d2d2d]">
        <div className="text-sm font-medium mb-1">AI ASSISTANT</div>
        <div className="text-xs text-gray-400">NeuroForge AI</div>
      </div>
      
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

      <form onSubmit={handleSubmit} className="border-t border-[#2d2d2d] p-4">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#2d2d2d] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[40px]"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Press Shift + Enter for new line
        </div>
      </form>
    </div>
  );
}
