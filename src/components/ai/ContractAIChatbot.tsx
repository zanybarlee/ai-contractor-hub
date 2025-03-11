
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, CircleSlash, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { queryContractAI, type ContractQuery, type ContractQueryResponse } from "@/lib/aiAgents";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: ContractQueryResponse["sources"];
  confidence?: number;
  relatedQueries?: string[];
}

interface ContractAIChatbotProps {
  contractId?: string;
  initialMessage?: string;
}

const ContractAIChatbot = ({ contractId, initialMessage }: ContractAIChatbotProps) => {
  const [input, setInput] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: initialMessage || "Hello! I'm your contract intelligence assistant. How can I help you with your contracts today?",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom of messages when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      const query: ContractQuery = {
        query: input,
        contractId,
      };
      
      const response = await queryContractAI(query);
      
      const assistantMessage: Message = {
        id: `response-${Date.now()}`,
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
        confidence: response.confidence,
        relatedQueries: response.relatedQueries,
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
          content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleRelatedQueryClick = (query: string) => {
    setInput(query);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Contract Intelligence Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.confidence && (
                    <Badge variant="outline" className="text-xs">
                      {Math.round(message.confidence * 100)}% confidence
                    </Badge>
                  )}
                </div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>

                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">Sources:</div>
                    <div className="space-y-2">
                      {message.sources.map((source, idx) => (
                        <div
                          key={idx}
                          className="text-xs p-2 rounded bg-background border"
                        >
                          <div className="font-medium">{source.title}</div>
                          <div className="opacity-80 mt-1">{source.excerpt}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {message.relatedQueries && message.relatedQueries.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">Related questions:</div>
                    <div className="flex flex-wrap gap-2">
                      {message.relatedQueries.map((query, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/80 transition-colors"
                          onClick={() => handleRelatedQueryClick(query)}
                        >
                          {query}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            placeholder="Ask about your contract..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isQuerying}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isQuerying}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ContractAIChatbot;
