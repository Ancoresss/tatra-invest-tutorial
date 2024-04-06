"use client";

import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useChatStorage } from "@/lib/storage/chatStorage";
import { Separator } from "../ui/separator";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";

interface ChatProps extends HTMLAttributes<HTMLDivElement> {}

export const Chat: FC<ChatProps> = ({ className, ...props }) => {
  const state = useChatStorage();

  return state.chatOpen ? (
    <Card {...props} className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Assistant</CardTitle>
      </CardHeader>
      <Separator></Separator>
      <CardContent className="grow flex flex-col gap-4">
        <Messages className="grow py-6" />
        <ChatInput />
      </CardContent>
    </Card>
  ) : null;
};
