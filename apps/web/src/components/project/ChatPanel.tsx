import { useState, useRef, useEffect } from 'react';
import { ChatMessage, ProjectDetails } from '../../types/project-info';
import { apiClient } from '../../services/api';

interface ChatPanelProps {
  projectId: string | null;
  isGitRepo: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setProjectDetails: (details: ProjectDetails | ((prev: ProjectDetails) => ProjectDetails)) => void;
}

export function ChatPanel({
  projectId,
  isGitRepo,
  isLoading,
  setIsLoading,
  setProjectDetails
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start chat when repository is initialized
  useEffect(() => {
    if (isGitRepo && projectId) {
      handleStartChat();
    }
  }, [isGitRepo, projectId]);

  const handleStartChat = async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      const response = await apiClient.chatWithAI(projectId, "start");
      setMessages([{
        role: "assistant",
        content: response.content,
        timestamp: new Date(response.timestamp)
      }]);
    } catch (error) {
      console.error('Failed to start chat:', error);
      setMessages([{
        role: "assistant",
        content: "Hello! I'm your AI Architect. Let's define your project together. What would you like to build?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isGitRepo || !projectId) return;

    try {
      setIsLoading(true);
      console.log('Sending message:', inputMessage);
      
      // Add user message to chat
      const userMessage: ChatMessage = {
        role: "user",
        content: inputMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");

      // Get AI response
      const response = await apiClient.chatWithAI(projectId, inputMessage);
      console.log('Received AI response:', response);
      
      // Update project details if provided
      if (response.details) {
        console.log('Updating project details:', response.details);
        setProjectDetails((prev: ProjectDetails) => ({
          name: response.details?.name ?? prev.name,
          description: response.details?.description ?? prev.description,
          stack: response.details?.stack ?? prev.stack,
          status: response.details?.status ?? prev.status
        }));
      }

      // Add AI message to chat
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.content,
        timestamp: new Date(response.timestamp)
      }]);

      // Focus the input after sending
      chatInputRef.current?.focus();
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 bg-[#252526] rounded p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">AI Architect Chat</h2>
      
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
    </div>
  );
}
