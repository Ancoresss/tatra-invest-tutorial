import { create } from "zustand";

type BaseMessage = {
  text: string;
};

export interface IAIMessage extends BaseMessage {
  type: "ai";
}

export interface IHumanMessage extends BaseMessage {
  type: "human";
}

export type IMessage = IAIMessage | IHumanMessage;

type State = {
  chatOpen: boolean;
  messages: IMessage[];
};

type Action = {
  setChatOpen: (chatOpen: boolean) => void;
  addMessage: (message: IMessage[]) => void;
};

export const useChatStorage = create<State & Action>((set) => ({
  chatOpen: true,
  messages: [
    { type: "ai", text: "Hello, I'm here to help you with any of your troubles." },
    { type: "human", text: "How can I start with investing?" },
  ],
  setChatOpen: (chatOpen) => set(() => ({ chatOpen })),
  addMessage: (messages: IMessage[]) => set(() => ({ messages })),
}));
