import { IAIMessage } from "@/lib/storage/chatStorage";
import { FC } from "react";

interface AIMessageProps {
  message: IAIMessage;
}

export const AIMessage: FC<AIMessageProps> = ({ message }) => {
  return <div className="message-block self-start">{message.text}</div>;
};
