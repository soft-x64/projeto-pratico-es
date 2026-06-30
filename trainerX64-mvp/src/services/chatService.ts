import type { ChatMsg, UserType } from "../types/app";
import { CHAT_MOCK } from "../data/mockData";
import { storageService } from "./storageService";

const CHAT_KEY = "trainerx64-chat";

export const chatService = {
  getMessages(): ChatMsg[] {
    return storageService.get<ChatMsg[]>(CHAT_KEY, CHAT_MOCK);
  },

  saveMessages(messages: ChatMsg[]): void {
    storageService.set(CHAT_KEY, messages);
  },

  createMessage(data: {
    from: UserType;
    senderName: string;
    content: string;
  }): ChatMsg {
    const clean = data.content.trim();

    if (!clean) {
      throw new Error("Digite uma mensagem.");
    }

    if (clean.length > 500) {
      throw new Error("A mensagem deve ter no máximo 500 caracteres.");
    }

    return {
      id: `m-${Date.now()}`,
      from: data.from,
      senderName: data.senderName,
      content: clean,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };
  },
};