import {create } from 'zustand'
import { apiFetch } from '@/lib/api'

type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role: string;
};

type AuthState={
    user: AuthUser | null;
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

    const loginRes = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      set({ loading: false, user: null, isAuthenticated: false });
      throw new Error("login failed");
    }

    const data = await loginRes.json();
    set({ user: data.user, isAuthenticated: true, loading: false });
  },

  checkSession: async () => {
    const res = await apiFetch("/api/auth/me");
    if (!res.ok) {
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }

    const data = await res.json();
    set({ user: data.user, isAuthenticated: true });
  },

  logout: async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    set({ user: null, isAuthenticated: false, loading: false });
  },
}));
