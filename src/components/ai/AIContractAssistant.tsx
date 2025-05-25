
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { queryAI } from "./aiService";
import { loadMessages, saveMessages, getWelcomeMessage } from "./messageStorage";
import { Message, AIContractAssistantProps } from "./types";

const AIContractAssistant = ({ isOpen, onClose }: AIContractAssistantProps) => {
  const [input, setInput] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  
  const { toast } = useToast();
  
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isQuerying) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsQuerying(true);
    
    try {
      const aiResponse = await queryAI(input);
      
      const assistantMessage: Message = {
        id: `response-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error querying AI:", error);
      
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I encountered an error while processing your request. Please check your connection and try again.",
          timestamp: new Date(),
        },
      ]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to the AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsQuerying(false);
    }
  };

  const handleClearChat = () => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    toast({
      title: "Chat Cleared",
      description: "All messages have been cleared.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 h-[500px] flex flex-col shadow-2xl border-2 bg-white">
        <CardHeader className="border-b border-gray-200 flex-row items-center justify-between space-y-0 pb-3 bg-white">
          <ChatHeader onClearChat={handleClearChat} onClose={onClose} />
        </CardHeader>
        
        <CardContent className="flex-1 overflow-auto p-4 bg-white">
          <MessageList messages={messages} isQuerying={isQuerying} />
        </CardContent>
        
        <CardFooter className="border-t border-gray-200 p-4 bg-white">
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isQuerying={isQuerying}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIContractAssistant;
