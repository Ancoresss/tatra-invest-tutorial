import { useChatStorage } from "@/lib/storage/chatStorage";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [message, setMessage] = useState("");
  const sendMessage = useChatStorage((state) => state.sendMessage);

  const addMessage = () => {
    if (!message?.trim()) return;
    sendMessage({ type: "human", text: message });
    setMessage("");
  };

  return (
    <div {...props} className={cn("flex gap-4", className)}>
      <Input
        value={message}
        onChange={(v) => setMessage(v.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          addMessage();
        }}
        placeholder="Enter a message"
        className="basis-0 grow"
      />
      <Button onClick={addMessage} size="icon">
        <Send size="1rem" />
      </Button>
    </div>
  );
};
