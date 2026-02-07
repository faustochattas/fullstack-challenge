import { api } from "../api/client";

export type User = { sub: string; email: string; iat: number; exp: number };

export async function register(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
}

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function me(): Promise<User> {
  const res = await api.get("/auth/me");
  return res.data.user as User;
}
