import { sign, verify } from "hono/jwt";

const secret = "sbv23535eribeiuvvu345brj5352r";

export const getToken = async (email: string) => {
  return await sign({ email: email }, secret);
};

export const verifyToken = async (token: any) => {
  return await verify(token, secret);
};

//implementare funzione di hashing
export const checkPassword = (password: string, dbPassowrd: string) => {
  return password === dbPassowrd;
};
