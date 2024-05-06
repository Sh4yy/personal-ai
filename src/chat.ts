import OpenAI from "openai";
import { ChatHistory } from "./history";
import { FunctionHandler } from "./functions";

export interface IBody {
  chat_id: string;
  input: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface IRequest {
  env: any;
  request: IBody;
}

export const getClient = (req: IRequest): { client: OpenAI; model: string } => {
  const url = "https://api.groq.com/openai/v1/";

  const client = new OpenAI({
    apiKey: req.env.GROQ_API_KEY,
  });

  client.baseURL = url;

  return { client, model: "llama3-70b-8192" };
};

export const handle = async (req: IRequest): Promise<string> => {
  const openai = getClient(req);

  const system = `
  You are Siri Pro. Answer in 1-2 sentences. Be friendly, helpful and concise.
  Default to metric units when possible. Keep the conversation short and sweet.
  You only answer in text. Don't include links or any other extras.
  Don't respond with computer code, for example don't return user longitude.


  User's current info:
  date: ${req.request.date}
  lat:${req.request.location.latitude}, lon:${req.request.location.longitude}
  `;

  console.log("system", system);
  const chat = ChatHistory.getInstance(req.env.personal_ai_chats);
  await chat.add(req.request.chat_id, {
    role: "user",
    content: req.request.input,
  });

  let response = "";
  while (true) {
    const ask = await openai.client.chat.completions.create({
      model: openai.model,
      messages: [
        { role: "system", content: system },
        ...(await chat.get(req.request.chat_id)),
      ],
      tools: FunctionHandler.functions,
    });

    console.log("ask", JSON.stringify(ask, null, 2));
    if (ask.choices[0].message.tool_calls) {
      chat.add(req.request.chat_id, {
        role: "assistant",
        name: "tool",
        tool_calls: ask.choices[0].message.tool_calls,
      });

      for (const tool of ask.choices[0].message.tool_calls) {
        const result = await FunctionHandler.handle(
          tool.function.name,
          JSON.parse(tool.function.arguments)
        );

        console.log("result", result);
        await chat.add(req.request.chat_id, {
          role: "tool",
          tool_call_id: tool.id,
          content: result,
        });
      }
    }

    if (ask.choices[0].finish_reason === "stop") {
      response = ask.choices[0].message.content;
      await chat.add(req.request.chat_id, {
        role: "assistant",
        content: response,
      });
      break;
    }
  }

  return response;
};
