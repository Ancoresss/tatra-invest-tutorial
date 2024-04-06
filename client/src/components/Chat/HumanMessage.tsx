import { IHumanMessage } from "@/lib/storage/chatStorage";
import { FC } from "react";

interface HumanMessageProps {
  message: IHumanMessage;
}

export const HumanMessage: FC<HumanMessageProps> = ({ message }) => {
  return <div className="message-block ml-auto !bg-slate-600 text-white">{message.text}</div>;
};
