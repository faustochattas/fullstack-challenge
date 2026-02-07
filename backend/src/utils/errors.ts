export class HttpError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function badRequest(message: string, code?: string) {
  return new HttpError(400, message, code);
}
export function unauthorized(message: string = "Unauthorized", code?: string) {
  return new HttpError(401, message, code);
}
export function forbidden(message: string = "Forbidden", code?: string) {
  return new HttpError(403, message, code);
}
export function notFound(message: string = "Not found", code?: string) {
  return new HttpError(404, message, code);
}
