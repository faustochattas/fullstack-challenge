const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  created_at: string;
  updated_at: string;
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    credentials: "include", // <-- CLAVE para cookies httpOnly
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }

  return data as T;
}

export async function listTasks(): Promise<Task[]> {
  const data = await request<{ tasks: Task[] }>("/tasks");
  return data.tasks;
}

export async function createTask(title: string): Promise<Task> {
  const data = await request<{ task: Task }>("/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return data.task;
}

export async function updateTask(id: string, patch: Partial<Pick<Task, "title" | "done">>): Promise<Task> {
  const data = await request<{ task: Task }>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return data.task;
}

export async function deleteTask(id: string): Promise<void> {
  await request(`/tasks/${id}`, { method: "DELETE" });
}
