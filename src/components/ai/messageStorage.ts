
import { Message } from "./types";

const STORAGE_KEY = 'ai-contract-assistant-messages';

export const loadMessages = (): Message[] => {
  const savedMessages = localStorage.getItem(STORAGE_KEY);
  if (savedMessages) {
    try {
      const parsed = JSON.parse(savedMessages);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error parsing saved messages:', error);
    }
  }
  
  return [
    {
      id: "welcome",
      role: "assistant" as const,
      content: "Hello! I'm your AI Contract Assistant. How can I help you with your contract questions today?",
      timestamp: new Date(),
    },
  ];
};

export const saveMessages = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const getWelcomeMessage = (): Message => ({
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm your AI Contract Assistant. How can I help you with your contract questions today?",
  timestamp: new Date(),
});
