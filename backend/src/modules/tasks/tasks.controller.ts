import { Request, Response } from "express";
import { createTask, deleteTask, listTasks, updateTask } from "./tasks.service";

function getUserId(req: Request) {
  const u = (req as any).user;
  const id = u?.sub;
  if (!id) throw new Error("Missing token");
  return String(id);
}

export async function list(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const tasks = await listTasks(userId);
    return res.json({ tasks });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Error listing tasks" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const { title } = req.body || {};
    if (!title || typeof title !== "string") return res.status(400).json({ error: "title is required" });

    const task = await createTask(userId, title.trim());
    return res.status(201).json({ task });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Error creating task" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const taskId = req.params.id;

    const { title, done } = req.body || {};
    const patch: any = {};
    if (typeof title === "string") patch.title = title.trim();
    if (typeof done === "boolean") patch.done = done;

    const task = await updateTask(userId, taskId, patch);
    return res.json({ task });
  } catch (e: any) {
    const msg = e?.message || "Error updating task";
    const code = msg === "Task not found" ? 404 : msg === "No fields to update" ? 400 : 500;
    return res.status(code).json({ error: msg });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const taskId = req.params.id;
    const out = await deleteTask(userId, taskId);
    return res.json({ deleted: out.id });
  } catch (e: any) {
    const msg = e?.message || "Error deleting task";
    const code = msg === "Task not found" ? 404 : 500;
    return res.status(code).json({ error: msg });
  }
}
