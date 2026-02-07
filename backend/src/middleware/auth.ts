import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type JwtPayload = { sub: string; email: string };

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookieName = process.env.COOKIE_NAME || "access_token";
    const token = req.cookies?.[cookieName];

    if (!token) return res.status(401).json({ error: "Missing token" });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: "JWT secret not configured" });

    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = payload;

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
