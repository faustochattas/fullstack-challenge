import sql from "mssql";

let pool: sql.ConnectionPool | null = null;

export async function getPool() {
  if (pool) return pool;

  const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  pool = await sql.connect(config);
  return pool;
}
