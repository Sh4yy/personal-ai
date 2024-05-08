import { weather } from "./weather";
import { search } from "./search"; 
import { IFunction } from "./type";
import { IRequest } from "../chat";

const functions: IFunction[] = [weather, search];  

const handle = async (
  name: string,
  args: any,
  req: IRequest
): Promise<string> => {
  const func = functions.find((f) => f.function.name === name);
  if (!func) return "";
  return func.execute(args, req);
};

export const FunctionHandler = {
  handle,
  functions,
};