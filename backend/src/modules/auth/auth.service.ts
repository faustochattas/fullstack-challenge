import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool } from "../../db/pool";

export async function createUser(email: string, password: string) {
  const pool = await getPool();

  const existing = await pool
    .request()
    .input("email", email)
    .query("SELECT TOP 1 id FROM dbo.users WHERE email = @email");

  if (existing.recordset.length > 0) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await pool
    .request()
    .input("email", email)
    .input("password_hash", passwordHash)
    .query(
      "INSERT INTO dbo.users (email, password_hash) OUTPUT inserted.id, inserted.email VALUES (@email, @password_hash)"
    );

  return result.recordset[0] as { id: string; email: string };
}

export async function verifyUser(email: string, password: string) {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("email", email)
    .query("SELECT TOP 1 id, email, password_hash FROM dbo.users WHERE email = @email");

  const row = result.recordset[0] as { id: string; email: string; password_hash: string } | undefined;
  if (!row) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) throw new Error("Invalid credentials");

  return { id: row.id, email: row.email };
}

export function signToken(user: { id: string; email: string }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret not configured");

  const expiresIn = process.env.JWT_EXPIRES_IN || "15m";
  return jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn });
}
