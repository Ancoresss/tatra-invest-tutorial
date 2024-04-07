import { config } from "@/config";
import { create } from "zustand";

type BaseMessage = {
  text: string;
};

export interface IAIMessage extends BaseMessage {
  type: "ai";
  similar_questions?: string[];
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

const questionPattern = /[0-9]+\.(.+\?)/g;

export const useChatStorage = create<State & Action>((set) => ({
  chatOpen: true,
  messages: [{ type: "ai", text: "Hello, I'm here to help you with any of your troubles." }],
  setChatOpen: (chatOpen) => set(() => ({ chatOpen })),
  sendMessage: async (message: IHumanMessage) => {
    set((state) => ({ messages: [...state.messages, message] }));
    const url = `${config.BACKEND_API_URL}/chat`;
    const aiResponse: { answer: string; similar_questions: string } = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: message.text,
      }),
    }).then((res) => res.json());
    const similar_questions = Array.from(
      aiResponse.similar_questions.matchAll(questionPattern)
    )?.map((group) => group[1]);
    
    set((state) => ({
      messages: [...state.messages, { type: "ai", text: aiResponse.answer, similar_questions }],
    }));
  },
}));
