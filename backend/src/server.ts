import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import tasksRoutes from "./modules/tasks/tasks.routes";
import { getPool } from "./db/pool";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* Health */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* DB check */
app.get("/db-ping", async (_req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query("SELECT 1 as ok");

    res.json({ db: "ok", ok: r.recordset?.[0]?.ok ?? 1 });
  } catch (e: any) {
    res.status(500).json({
      db: "error",
      message: e?.message || String(e),
    });
  }
});

/* Routes */
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);

/* Start */
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
