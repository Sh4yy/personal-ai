import { weather } from "./weather";
import { IFunction } from "./type";

const functions: IFunction[] = [weather];

const handle = async (name: string, args: any): Promise<string> => {
  const func = functions.find((f) => f.function.name === name);
  if (!func) return "";
  return func.execute(args);
};

export const FunctionHandler = {
  handle,
  functions,
};
