import { Request, Response } from "express";
import { createUser, verifyUser, signToken } from "./auth.service";
import { email as vEmail, password as vPassword } from "../../utils/validate";
import { badRequest, unauthorized } from "../../utils/errors";

function cookieOptions() {
  const secure = (process.env.COOKIE_SECURE || "false") === "true";
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? ("none" as const) : ("lax" as const),
    maxAge: 1000 * 60 * 60,
  };
}

export async function register(req: Request, res: Response) {
  const e = vEmail(req.body?.email);
  const p = vPassword(req.body?.password);

  const user = await createUser(e, p);
  const token = signToken(user);

  const cookieName = process.env.COOKIE_NAME || "access_token";
  res.cookie(cookieName, token, cookieOptions());

  return res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const e = vEmail(req.body?.email);
  const p = vPassword(req.body?.password);

  try {
    const user = await verifyUser(e, p);
    const token = signToken(user);

    const cookieName = process.env.COOKIE_NAME || "access_token";
    res.cookie(cookieName, token, cookieOptions());

    return res.json({ id: user.id, email: user.email });
  } catch {
    throw unauthorized("Invalid credentials");
  }
}

export function logout(_req: Request, res: Response) {
  const cookieName = process.env.COOKIE_NAME || "access_token";
  // important: clear cookie with same options
  res.clearCookie(cookieName, cookieOptions());
  return res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user?.sub) throw badRequest("Missing token");
  return res.json({ user });
}
