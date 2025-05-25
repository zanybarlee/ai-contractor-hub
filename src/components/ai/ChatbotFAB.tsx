
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AIContractAssistant from "./AIContractAssistant";

const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-white text-blue-600">
              <MessageSquare className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>

      {/* Chatbot Interface */}
      <AIContractAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotFAB;
