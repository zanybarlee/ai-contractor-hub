
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIContractAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}
