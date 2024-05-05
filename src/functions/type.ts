import OpenAI from "openai";

export type IFunction = OpenAI.Chat.Completions.ChatCompletionTool & {
  execute: (params: any) => Promise<string>;
};
