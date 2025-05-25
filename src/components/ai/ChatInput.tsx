
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isQuerying: boolean;
}

const ChatInput = ({ input, setInput, onSubmit, isQuerying }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2">
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
  );
};

export default ChatInput;
