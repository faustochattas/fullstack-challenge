type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

export default function Field({ label, type = "text", value, onChange }: Props) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          outline: "none",
        }}
      />
    </label>
  );
}
