import GuideContext from "@/context/GuideContext";
import { IAIMessage } from "@/lib/storage/chatStorage";
import { FC, useContext } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { scenarioNames } from "@/lib/scenarios";

interface AIMessageProps {
  message: IAIMessage;
}

export const AIMessage: FC<AIMessageProps> = ({ message }) => {
  const { setActiveScenario } = useContext(GuideContext);

  return (
    <div className="message-block self-start flex flex-col gap-2">
      <Markdown>{message.text}</Markdown>
      {message.actions.map((a) => (
        <Button key={a} onClick={() => setActiveScenario?.(a)}>
          {scenarioNames[a] ?? a}
        </Button>
      ))}
    </div>
  );
};
