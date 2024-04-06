import { useScrollDown } from "@/lib/hooks/useScrollDown";
import { IMessage, useChatStorage } from "@/lib/storage/chatStorage";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useRef } from "react";
import { AIMessage } from "./AIMessage";
import { HumanMessage } from "./HumanMessage";

const Message: FC<{ message: IMessage }> = ({ message }) => {
  switch (message.type) {
    case "ai":
      return <AIMessage message={message} />;
    case "human":
      return <HumanMessage message={message} />;
    default:
      return null;
  }
};

interface MessagesProps extends HTMLAttributes<HTMLDivElement> {}

export const Messages: FC<MessagesProps> = ({ className, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messages = useChatStorage((state) => state.messages);

  useScrollDown(containerRef, [messages]);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn("flex flex-col gap-4 overflow-y-auto", className)}
    >
      {messages.map((m) => (
        <Message key={m.text} message={m} />
      ))}
    </div>
  );
};
