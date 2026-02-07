import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me, logout } from "../auth/auth";
import { createTask, deleteTask, listTasks, updateTask } from "../api/tasks";
import type { Task } from "../api/tasks";

export default function TasksPage() {
  const nav = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  async function refresh() {
    const t = await listTasks();
    setTasks(t);
  }

  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const u = await me();
        setUserEmail(u.email);
        await refresh();
      } catch {
        nav("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [nav]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const newTask = await createTask(title.trim());
      setTitle("");
      setTasks((prev) => [newTask, ...prev]);
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.message || "Create failed");
    }
  }

  async function onToggle(t: Task) {
    const next = !t.done;
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: next } : x)));
    try {
      await updateTask(t.id, { done: next });
    } catch {
      // rollback
      setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: t.done } : x)));
    }
  }

  async function onDelete(id: string) {
    setError(null);
    const prev = tasks;
    setTasks((p) => p.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (e: any) {
      setTasks(prev);
      setError(e?.response?.data?.error || e?.message || "Delete failed");
    }
  }

  async function onLogout() {
    await logout();
    nav("/login");
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ marginBottom: 6 }}>Tasks</h1>
          <div style={{ fontSize: 14, opacity: 0.75 }}>
            Logged in as <b>{userEmail}</b> • {doneCount}/{tasks.length} done
          </div>
        </div>
        <button onClick={onLogout} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <form onSubmit={onCreate} style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          disabled={!title.trim()}
          style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer" }}
        >
          Add
        </button>
      </form>

      {error && <div style={{ color: "crimson", marginTop: 12 }}>{error}</div>}

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {tasks.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 10,
            }}
          >
            <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={t.done} onChange={() => onToggle(t)} />
              <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.title}</span>
            </label>

            <button onClick={() => onDelete(t.id)} style={{ cursor: "pointer" }}>
              Delete
            </button>
          </div>
        ))}
        {tasks.length === 0 && <div style={{ opacity: 0.7 }}>No tasks yet.</div>}
      </div>
    </div>
  );
}
