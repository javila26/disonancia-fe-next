import axios from "axios";

const API_URL = process.env.API_BASE_URL ?? "http://localhost:3000";
const AUTH_TOKEN_KEY = "auth_token";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;
export { API_URL, AUTH_TOKEN_KEY };
