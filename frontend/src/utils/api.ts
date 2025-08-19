const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function getLogs() {
  const res = await fetch(`${API_URL}/logs/`, {
    credentials: "include",  // ✅ include cookies in every request
  });
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
}

export async function createLog(data: any) {
  const res = await fetch(`${API_URL}/logs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  // ✅ important
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create log");
  return res.json();
}
