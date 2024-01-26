import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

const app = new Hono();

const token = "honoiscool";

app.get("/api/page", (c) => {
  return c.json({ message: "Read posts" });
});

app.post("/api/page", bearerAuth({ token }), (c) => {
  return c.json({ message: "Created post!" }, 201);
});
