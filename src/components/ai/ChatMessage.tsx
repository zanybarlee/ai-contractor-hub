
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
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
      <div className={`flex gap-3 max-w-[85%] ${
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      }`}>
        <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
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
          className={`rounded-xl p-4 shadow-sm ${
            message.role === "user"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border border-gray-200"
          }`}
        >
          <div className="text-sm">
            {message.role === "assistant" ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-base font-semibold mb-2 text-gray-900">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm font-semibold mb-1 text-gray-900">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0 text-gray-700 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-2 space-y-1 text-gray-700">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-700">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-700">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 text-gray-800 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2 border">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-2">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>
          <div className={`text-xs mt-2 ${
            message.role === "user" ? "text-blue-100" : "text-gray-500"
          }`}>
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
