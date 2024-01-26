import { serve } from "@hono/node-server";
import { Hono } from "hono";
import vehicleRouter from "./routes/vehicles";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/vehicles", vehicleRouter);

const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
