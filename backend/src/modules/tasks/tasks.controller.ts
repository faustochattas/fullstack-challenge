import { Request, Response } from "express";
import { createTask, deleteTask, listTasks, updateTask } from "./tasks.service";
import { requiredString, optionalBoolean, optionalString } from "../../utils/validate";
import { badRequest } from "../../utils/errors";

function getUserId(req: Request) {
  const u = (req as any).user;
  const id = u?.sub;
  if (!id) throw badRequest("Missing token");
  return String(id);
}

export async function list(req: Request, res: Response) {
  const userId = getUserId(req);
  const tasks = await listTasks(userId);
  return res.json({ tasks });
}

export async function create(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const { title } = req.body || {};

    if (title == null) return res.status(400).json({ error: "title is required" });
    if (typeof title !== "string") return res.status(400).json({ error: "title must be a string" });

    const clean = title.trim();
    if (!clean) return res.status(400).json({ error: "title cannot be empty" });

    const task = await createTask(userId, clean);
    return res.status(201).json({ task });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Error creating task" });
  }
}


export async function update(req: Request, res: Response) {
  const userId = getUserId(req);
  const taskId = requiredString(req.params?.id, "id");

  const title = optionalString(req.body?.title);
  const done = optionalBoolean(req.body?.done);

  const patch: any = {};
  if (title !== undefined) patch.title = title;
  if (done !== undefined) patch.done = done;

  const task = await updateTask(userId, taskId, patch);
  return res.json({ task });
}

export async function remove(req: Request, res: Response) {
  const userId = getUserId(req);
  const taskId = requiredString(req.params?.id, "id");
  const out = await deleteTask(userId, taskId);
  return res.json({ deleted: out.id });
}
