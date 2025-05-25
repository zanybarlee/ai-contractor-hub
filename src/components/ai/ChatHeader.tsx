
import { Bot, RefreshCw, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

interface ChatHeaderProps {
  onClearChat: () => void;
  onClose: () => void;
}

const ChatHeader = ({ onClearChat, onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-blue-100 text-blue-700">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <CardTitle className="text-lg text-gray-800">AI Contract Assistant</CardTitle>
      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
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
    </div>
  );
};

export default ChatHeader;
