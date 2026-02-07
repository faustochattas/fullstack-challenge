import { getPool } from "../../db/pool";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  created_at: string;
  updated_at: string;
};

export async function listTasks(userId: string) {
  const pool = await getPool();
  const result = await pool.request()
    .input("user_id", userId)
    .query(`
      SELECT id, user_id, title, done, created_at, updated_at
      FROM dbo.tasks
      WHERE user_id = @user_id
      ORDER BY created_at DESC
    `);

  return result.recordset as Task[];
}

export async function createTask(userId: string, title: string) {
  const pool = await getPool();
  const result = await pool.request()
    .input("user_id", userId)
    .input("title", title)
    .query(`
      INSERT INTO dbo.tasks (user_id, title)
      OUTPUT inserted.id, inserted.user_id, inserted.title, inserted.done, inserted.created_at, inserted.updated_at
      VALUES (@user_id, @title)
    `);

  return result.recordset[0] as Task;
}

export async function updateTask(userId: string, taskId: string, patch: { title?: string; done?: boolean }) {
  const pool = await getPool();

  // build dynamic update safely
  const sets: string[] = ["updated_at = SYSUTCDATETIME()"];
  if (typeof patch.title === "string") sets.push("title = @title");
  if (typeof patch.done === "boolean") sets.push("done = @done");

  if (sets.length === 1) throw new Error("No fields to update");

  const req = pool.request()
    .input("user_id", userId)
    .input("id", taskId);

  if (typeof patch.title === "string") req.input("title", patch.title);
  if (typeof patch.done === "boolean") req.input("done", patch.done);

  const result = await req.query(`
    UPDATE dbo.tasks
    SET ${sets.join(", ")}
    OUTPUT inserted.id, inserted.user_id, inserted.title, inserted.done, inserted.created_at, inserted.updated_at
    WHERE id = @id AND user_id = @user_id
  `);

  const row = result.recordset[0] as Task | undefined;
  if (!row) throw new Error("Task not found");
  return row;
}

export async function deleteTask(userId: string, taskId: string) {
  const pool = await getPool();
  const result = await pool.request()
    .input("user_id", userId)
    .input("id", taskId)
    .query(`
      DELETE FROM dbo.tasks
      OUTPUT deleted.id
      WHERE id = @id AND user_id = @user_id
    `);

  const row = result.recordset[0] as { id: string } | undefined;
  if (!row) throw new Error("Task not found");
  return row;
}
