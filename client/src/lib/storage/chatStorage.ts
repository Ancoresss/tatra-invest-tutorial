import { create } from "zustand";

export type Message = {
  text: string;
};

type State = {
  chatOpen: boolean;
  messages: Message[];
};

type Action = {
  setChatOpen: (chatOpen: boolean) => void;
  addMessage: (message: Message[]) => void;
};

export const useChatStorage = create<State & Action>((set) => ({
  chatOpen: true,
  messages: [],
  setChatOpen: (chatOpen) => set(() => ({ chatOpen })),
  addMessage: (messages: Message[]) => set(() => ({ messages })),
}));
