import OpenAI from "openai";
import { IRequest } from "../chat";

export type IFunction = OpenAI.Chat.Completions.ChatCompletionTool & {
  execute: (params: any, req: IRequest) => Promise<string>;
};
