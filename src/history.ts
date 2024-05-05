import { ChatCompletionMessageParam } from "openai/resources";

type ChatEntry = ChatCompletionMessageParam;

export class ChatHistory {
  private static instance: ChatHistory;
  private kv: KVNamespace;

  private constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  public static getInstance(kv: KVNamespace): ChatHistory {
    if (!ChatHistory.instance) {
      ChatHistory.instance = new ChatHistory(kv);
    }
    return ChatHistory.instance;
  }

  async add(chat_id: string, message: ChatCompletionMessageParam) {
    const chat = await this.kv.get(chat_id);
    if (!chat) {
      await this.kv.put(chat_id, JSON.stringify([message]));
    } else {
      const messages = JSON.parse(chat);
      messages.push(message);
      await this.kv.put(chat_id, JSON.stringify(messages));
    }
    console.log(JSON.stringify(this.kv.get(chat_id), null, 2));
  }

  async get(chat_id: string): Promise<ChatEntry[]> {
    const chat = await this.kv.get(chat_id);
    if (!chat) {
      return [];
    }
    console.log(chat);
    return JSON.parse(chat);
  }
}
