
import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TypingIndicator = () => {
  return (
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
  );
};

export default TypingIndicator;
