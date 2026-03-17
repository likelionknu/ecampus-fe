import axios, { AxiosHeaders } from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const AUTH_STORAGE_KEY = "ecampus.auth.session";

type PersistedAuthState = {
  state?: {
    session?: {
      accessToken?: string;
    } | null;
  } | null;
};

function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedAuthState;
    return parsed.state?.session?.accessToken ?? null;
  } catch {
    return null;
  }
}

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();
  const headers = AxiosHeaders.from(config.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    headers.delete("Authorization");
  }

  config.headers = headers;

  return config;
});
