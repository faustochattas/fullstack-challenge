import { Request, Response } from "express";
import { createUser, verifyUser, signToken } from "./auth.service";

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
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });
    if (typeof email !== "string" || typeof password !== "string") return res.status(400).json({ error: "invalid types" });
    if (password.length < 8) return res.status(400).json({ error: "password must be >= 8 chars" });

    const user = await createUser(email.trim().toLowerCase(), password);
    const token = signToken(user);

    const cookieName = process.env.COOKIE_NAME || "access_token";
    res.cookie(cookieName, token, cookieOptions());

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (e: any) {
    return res.status(400).json({ error: e?.message || String(e) });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = await verifyUser(email.trim().toLowerCase(), password);
    const token = signToken(user);

    const cookieName = process.env.COOKIE_NAME || "access_token";
    res.cookie(cookieName, token, cookieOptions());

    return res.json({ id: user.id, email: user.email });
  } catch (e: any) {
    return res.status(401).json({ error: e?.message || "Invalid credentials" });
  }
}

export function logout(_req: Request, res: Response) {
  const cookieName = process.env.COOKIE_NAME || "access_token";
  res.clearCookie(cookieName);
  return res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  return res.json({ user: (req as any).user });
}
