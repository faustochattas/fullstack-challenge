export const env = {
  port: Number(process.env.PORT) || 4000,

  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "FullstackChallenge",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  },

  cookie: {
    name: process.env.COOKIE_NAME || "access_token",
    secure: process.env.COOKIE_SECURE === "true",
  },
};
