import { config } from "@/config";
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
  sendMessage: (message: IHumanMessage) => Promise<void>;
};

export const useChatStorage = create<State & Action>((set) => ({
  chatOpen: false,
  messages: [{ type: "ai", text: "Hello, I'm here to help you with any of your troubles." }],
  setChatOpen: (chatOpen) => set(() => ({ chatOpen })),
  sendMessage: async (message: IHumanMessage) => {
    set((state) => ({ messages: [...state.messages, message] }));
    const url = `${config.BACKEND_API_URL}/chat`;
    const aiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: message.text,
      }),
    }).then((res) => res.json());
    set((state) => ({ messages: [...state.messages, { type: "ai", text: aiResponse.answer }] }));
  },
}));
