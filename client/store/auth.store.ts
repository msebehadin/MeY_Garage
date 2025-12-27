import {create } from 'zustand'
import { apiFetch } from '@/lib/api'
type AuthState={
    user: unknown  |null;
    isAuthenticated:boolean;
    loading:boolean;
    login:(email:string,password:string)=>Promise<void>;
checkSession:()=>Promise<void>;
logout:()=>Promise<void>

};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });

    await apiFetch("/api/auth/sign-in/email", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const res = await apiFetch("/api/auth/get-session");
    const data = await res.json();

    set({ user: data.user, isAuthenticated: true, loading: false });
  },

  checkSession: async () => {
    const res = await apiFetch("/api/auth/get-session");
    if (!res.ok) return;

    const data = await res.json();
    set({ user: data.user, isAuthenticated: true });
  },

  logout: async () => {
    await apiFetch("/api/auth/sign-out", { method: "POST" });
    set({ user: null, isAuthenticated: false });
  },
}));
