import { Hono } from "hono";
import { handle, IBody } from "./chat";

const app = new Hono();

app.post("/", async (c) => {
  const body = (await c.req.json()) as IBody;
  try {
    console.log(JSON.stringify(body, null, 2));
    const response = await handle({
      env: c.env,
      request: body,
    });

    return c.json({
      response,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      response: "Something went wrong, we are working on it",
    });
  }
});

export default app;
