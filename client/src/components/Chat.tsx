"use client";

import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import { Card, CardHeader } from "./ui/card";
import { useChatStorage } from "@/lib/storage/chatStorage";

interface ChatProps extends HTMLAttributes<HTMLDivElement> {}

export const Chat: FC<ChatProps> = ({ className, ...props }) => {
  const state = useChatStorage();

  if (!state.chatOpen) {
    return null;
  }

  return (
    <Card {...props} className={cn(className)}>
      <CardHeader></CardHeader>
    </Card>
  );
};
