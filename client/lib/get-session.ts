import { cookies } from "next/headers";
import { API_URL } from "./api";

export async function getSession() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${API_URL}/api/auth/me`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.user ?? null;
}
