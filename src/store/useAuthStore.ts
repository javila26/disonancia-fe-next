import { create } from "zustand";

import api, { AUTH_TOKEN_KEY } from "@/lib/api";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type AuthResponseData = {
  token: string;
  [key: string]: unknown;
};

type AuthResponse = {
  success: boolean;
  message?: string;
  data?: AuthResponseData;
};

type AuthStore = {
  token: string | null;
  loading: boolean;
  error: string | null;
  register: (payload: RegisterPayload) => Promise<boolean>;
  setToken: (token: string | null) => void;
  clearError: () => void;
  getAuthHeaders: () => HeadersInit;
};

const getInitialToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: getInitialToken(),
  loading: false,
  error: null,

  register: async ({ name, email, password }) => {
    set({ loading: true, error: null });

    try {
      const { data: result } = await api.post<AuthResponse>("/api/auth/register", {
        fullName: name,
        email,
        password,
      });

      if (!result.success || !result.data?.token) {
        set({ error: result.message ?? "Could not register right now." });
        return false;
      }

      get().setToken(result.data.token);
      return true;
    } catch (error) {
      const axiosError = error as { response?: { data?: AuthResponse } };
      set({ error: axiosError.response?.data?.message ?? "Network error. Please try again." });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }

    set({ token });
  },

  clearError: () => set({ error: null }),

  getAuthHeaders: () => {
    const { token } = get();
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  },
}));
