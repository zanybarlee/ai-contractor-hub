
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, X, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIContractAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIContractAssistant = ({ isOpen, onClose }: AIContractAssistantProps) => {
  const [input, setInput] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem('ai-contract-assistant-messages');
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
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('ai-contract-assistant-messages', JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    // Scroll to bottom of messages when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const queryAI = async (question: string): Promise<string> => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/v1/prediction/4e7c92fe-6dd8-41d7-b2f2-328461935a95",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "question": question,
            "overrideConfig": {
              "sessionId": "user",
            }
          })
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.text || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Error querying AI:", error);
      throw error;
    }
  };

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
      
      // Add error message
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
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI Contract Assistant. How can I help you with your contract questions today?",
      timestamp: new Date(),
    };
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
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg text-gray-800">AI Contract Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              className="h-8 w-8 hover:bg-gray-100"
              title="Clear chat"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-gray-100"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-auto p-4 bg-white">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex gap-2 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={
                      message.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-blue-100 text-blue-700"
                    }>
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isQuerying && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              placeholder="Ask about contracts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isQuerying}
              className="flex-1 bg-white border-gray-300"
            />
            <Button type="submit" size="icon" disabled={isQuerying || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIContractAssistant;
