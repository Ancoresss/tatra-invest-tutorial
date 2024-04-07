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
  const messages = useChatStorage((state) => state.messages);

  const addMessage = () => {
    if (!message?.trim()) return;
    sendMessage({ type: "human", text: message });
    setMessage("");
  };

  const lastMessage = messages.at(-1);
  const similarQuestions = lastMessage?.type === "ai" ? lastMessage.similar_questions ?? [] : [];

  return (
    <div {...props} className={cn("relative flex gap-4", className)}>
      {similarQuestions.length ? (
        <div className="w-[calc(100%-3rem)] left-0 mx-6 absolute bottom-full flex gap-4 overflow-x-scroll">
          {similarQuestions.map((q) => (
            <Button
              key={q}
              onClick={() => {
                setMessage(q);
                addMessage();
              }}
              size="sm"
            >
              {q}
            </Button>
          ))}
        </div>
      ) : null}
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
