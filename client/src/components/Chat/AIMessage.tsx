import { IAIMessage } from "@/lib/storage/chatStorage";
import { FC } from "react";
import Markdown from "react-markdown";

interface AIMessageProps {
  message: IAIMessage;
}

export const AIMessage: FC<AIMessageProps> = ({ message }) => {
  return (
    <div className="message-block self-start">
      <Markdown>{message.text}</Markdown>
    </div>
  );
};
