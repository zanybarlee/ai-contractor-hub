
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
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
  );
};

export default ChatMessage;
