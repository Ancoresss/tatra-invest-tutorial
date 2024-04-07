"use client";

import { useChatStorage } from "@/lib/storage/chatStorage";
import { cn } from "@/lib/utils";
import { MessageCircleMoreIcon, X } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";

interface ChatProps extends HTMLAttributes<HTMLDivElement> {}

export const Chat: FC<ChatProps> = ({ className, ...props }) => {
  const state = useChatStorage();

  return (
    <>
      <Button
        onClick={() => state.setChatOpen(true)}
        variant="secondary"
        size="icon"
        className={cn(
          "fixed right-16 bottom-16 rounded-full h-16 w-16 transition-all",
          !state.chatOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <MessageCircleMoreIcon className="w-8 h-8" />
      </Button>
      <Card
        {...props}
        className={cn("flex flex-col h-full", state.chatOpen ? "flex" : "hidden", className)}
      >
        <CardHeader className="flex flex-row shrink items-center !py-4 gap-4">
          <CardTitle>Assistant</CardTitle>
          <Button
            onClick={() => state.setChatOpen(false)}
            variant="ghost"
            size="icon"
            className={cn("ml-auto !mt-0")}
          >
            <X />
          </Button>
        </CardHeader>
        <Separator></Separator>
        <Messages className="pt-6 flex-[2] overflow-y-auto" />
        <ChatInput className="py-6 px-6" />
      </Card>
    </>
  );
};
