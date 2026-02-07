import { badRequest } from "./errors";

export function asString(value: any, field: string) {
  if (typeof value !== "string") throw badRequest(`${field} must be a string`);
  return value;
}

export function requiredString(value: any, field: string) {
  const v = asString(value, field).trim();
  if (!v) throw badRequest(`${field} is required`);
  return v;
}

export function email(value: any) {
  const v = requiredString(value, "email").toLowerCase();
  // regex simple, suficiente para challenge
  if (!/^\S+@\S+\.\S+$/.test(v)) throw badRequest("invalid email");
  return v;
}

export function password(value: any) {
  const v = requiredString(value, "password");
  if (v.length < 8) throw badRequest("password must be >= 8 chars");
  return v;
}

export function optionalString(value: any) {
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw badRequest("title must be a string");
  const v = value.trim();
  return v.length ? v : "";
}

export function optionalBoolean(value: any) {
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") throw badRequest("done must be a boolean");
  return value;
}
