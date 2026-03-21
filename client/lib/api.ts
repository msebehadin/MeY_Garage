export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const apiFetch = (path: string, options: RequestInit = {}) => {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};
