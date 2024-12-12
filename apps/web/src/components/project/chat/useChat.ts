import { useState, useRef, useEffect } from 'react';
import { apiClient } from '../../../services/api';
import { ProjectDetails } from '../../../types/project-info';
import { ChatMessage } from './types';

export function useChat(
  projectId: string | null,
  isGitRepo: boolean,
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
  setProjectDetails: (details: ProjectDetails | ((prev: ProjectDetails) => ProjectDetails)) => void
) {
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

  return {
    messages,
    inputMessage,
    setInputMessage,
    chatInputRef,
    messagesEndRef,
    handleSendMessage,
  };
}
