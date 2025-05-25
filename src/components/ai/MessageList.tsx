
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  isQuerying: boolean;
}

const MessageList = ({ messages, isQuerying }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isQuerying && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
