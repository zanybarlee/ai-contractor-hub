
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
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
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string>("");
  
  const chatRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      const rect = chatRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y))
        });
      } else if (isResizing) {
        const rect = chatRef.current?.getBoundingClientRect();
        if (!rect) return;

        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('right')) {
          newWidth = Math.max(300, Math.min(800, e.clientX - position.x));
        }
        if (resizeDirection.includes('left')) {
          const deltaX = e.clientX - position.x;
          newWidth = Math.max(300, Math.min(800, size.width - deltaX));
          newX = Math.max(0, Math.min(position.x + deltaX, window.innerWidth - 300));
        }
        if (resizeDirection.includes('bottom')) {
          newHeight = Math.max(400, Math.min(700, e.clientY - position.y));
        }
        if (resizeDirection.includes('top')) {
          const deltaY = e.clientY - position.y;
          newHeight = Math.max(400, Math.min(700, size.height - deltaY));
          newY = Math.max(0, Math.min(position.y + deltaY, window.innerHeight - 400));
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, size, position, resizeDirection]);

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
    <div
      ref={chatRef}
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      {/* Resize handles */}
      <div
        className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 opacity-0 hover:opacity-100 cursor-nw-resize"
        onMouseDown={(e) => handleResizeStart(e, 'top-left')}
      />
      <div
        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 opacity-0 hover:opacity-100 cursor-ne-resize"
        onMouseDown={(e) => handleResizeStart(e, 'top-right')}
      />
      <div
        className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 opacity-0 hover:opacity-100 cursor-sw-resize"
        onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
      />
      <div
        className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 opacity-0 hover:opacity-100 cursor-se-resize"
        onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
      />
      
      {/* Edge resize handles */}
      <div
        className="absolute -top-1 left-3 right-3 h-2 cursor-n-resize hover:bg-blue-200 opacity-0 hover:opacity-50"
        onMouseDown={(e) => handleResizeStart(e, 'top')}
      />
      <div
        className="absolute -bottom-1 left-3 right-3 h-2 cursor-s-resize hover:bg-blue-200 opacity-0 hover:opacity-50"
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
      />
      <div
        className="absolute -left-1 top-3 bottom-3 w-2 cursor-w-resize hover:bg-blue-200 opacity-0 hover:opacity-50"
        onMouseDown={(e) => handleResizeStart(e, 'left')}
      />
      <div
        className="absolute -right-1 top-3 bottom-3 w-2 cursor-e-resize hover:bg-blue-200 opacity-0 hover:opacity-50"
        onMouseDown={(e) => handleResizeStart(e, 'right')}
      />

      <Card className="w-full h-full flex flex-col shadow-2xl border-2 bg-white">
        <CardHeader 
          className="border-b border-gray-200 flex-row items-center justify-between space-y-0 pb-3 bg-white cursor-move drag-handle"
          onMouseDown={handleMouseDown}
        >
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
