import { FC, HTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={cn("flex gap-4", className)}>
      <Input placeholder="Enter a message" className="basis-0 grow" />
      <Button size="icon">
        <Send size="1rem" />
      </Button>
    </div>
  );
};
