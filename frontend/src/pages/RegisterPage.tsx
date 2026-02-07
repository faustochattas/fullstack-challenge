import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import { register } from "../auth/auth";

export default function RegisterPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password);
      nav("/tasks");
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Register</h1>
      <p style={{ marginTop: 0, opacity: 0.75 }}>Create an account and start adding tasks.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <Field label="Email" value={email} onChange={setEmail} />
        <Field label="Password" type="password" value={password} onChange={setPassword} />

        {error && <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>}

        <button
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div style={{ fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
