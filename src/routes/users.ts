import { Hono } from "hono";
import { z } from "zod";
import { sql } from "../config.db";
import { checkPassword, getToken } from "../helpers/auth";

const authRouter = new Hono();

const authSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const parseUser = (user: any) => authSchema.parse(user);

authRouter.post("/login", async (c) => {
  const { email, password } = parseUser(await c.req.json());
  const result = await sql`
  SELECT email, password FROM users
  WHERE email = ${email}
  `;
  if (!checkPassword(password, result[0].password)) {
    c.status(401);
    return c.json({ error: "Invalid password" });
  }
  c.res.headers.append(
    "Authorization",
    `Bearer ${await getToken(result[0].email)}`
  );
  return c.json({ success: true });
});
export default authRouter;
