"use client";

import { scenarios } from "@/lib/scenarios";
import React, { FC, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";

const GuideContext = React.createContext<{
  activeScenario?: string;
  setActiveScenario?: Dispatch<SetStateAction<string | undefined>>;
}>({});

export default GuideContext;

export const GuideProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeScenario, setActiveScenario] = useState<string | undefined>("buystock");
  const [currentInstruction, setCurrentInstruction] = useState<number | undefined>(0);

  useEffect(() => {
    const scenario = scenarios.find((s) => s.scenarioType === activeScenario);
    if (!scenario) return;
    const instr = scenario.instructions[0];
    // setCurrentInstruction(i);
    const el = document.querySelector(`[data-${scenario.scenarioType}-${currentInstruction}]`);
    if (!el || el.querySelector(".instruction")) return;
    el.classList.add("relative");
    const instrEl = document.createElement("div");
    const position = el.dataset[`${scenario.scenarioType}-${currentInstruction}`] ?? "top";
    instrEl.classList.add("instruction", `instruction-${position}`);
    // instrEl.dataset[`instruction-${scenario.scenarioType}-${i}`] = "true";
    instrEl.innerText = instr.text;
    instrEl.onclick = () => {
      console.log("clicked", el.children);
      el.removeChild(instrEl);
      setCurrentInstruction((prev) => (prev ?? 0) + 1);
    };
    el.appendChild(instrEl);
  }, [activeScenario, currentInstruction]);

  return (
    <GuideContext.Provider value={{ activeScenario, setActiveScenario }}>
      {children}
    </GuideContext.Provider>
  );
};
