import axios, {
  AxiosHeaders,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
type PersistedAuthState = {
  state?: {
    session?: {
      accessToken?: string;
      refreshToken?: string;
    } | null;
  } | null;
};

type ApiErrorResponse = {
  error?: {
    code?: string | null;
  } | null;
};

type ReissueApiResponse = {
  data?: {
    access_token?: string | null;
    refresh_token?: string | null;
  } | null;
  error?: {
    message?: string | null;
  } | null;
};

type SessionTokens = {
  accessToken: string;
  refreshToken: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const AUTH_STORAGE_KEY = "ecampus.auth.session";

function getStoredAuthState() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedAuthState;
  } catch {
    return null;
  }
}

function getStoredSessionTokens() {
  const parsed = getStoredAuthState();

  return {
    accessToken: parsed?.state?.session?.accessToken ?? null,
    refreshToken: parsed?.state?.session?.refreshToken ?? null,
  };
}

function setStoredSessionTokens(tokens: SessionTokens) {
  if (typeof window === "undefined") {
    return;
  }

  const parsed = getStoredAuthState();
  const nextState: PersistedAuthState = {
    ...(parsed ?? {}),
    state: {
      ...(parsed?.state ?? {}),
      session: {
        ...(parsed?.state?.session ?? {}),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    },
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
}

function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function moveToLoginPage() {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== "/auth/login") {
    window.location.assign("/auth/login");
  }
}

function isTokenError(error: AxiosError<ApiErrorResponse>) {
  const status = error.response?.status;
  const code = error.response?.data?.error?.code;

  return (
    status === 401 || (typeof code === "string" && code.startsWith("C401"))
  );
}

async function requestReissueWithRefreshToken(refreshToken: string) {
  const response = await axios.post<ReissueApiResponse>(
    "/v1/auth/reissue",
    {
      refresh_token: refreshToken,
    },
    {
      baseURL: BASE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const nextAccessToken = response.data?.data?.access_token;
  const nextRefreshToken = response.data?.data?.refresh_token;

  if (!nextAccessToken || !nextRefreshToken) {
    throw new Error(
      response.data?.error?.message ??
        "토큰 재발급 응답에 access_token/refresh_token이 없습니다.",
    );
  }

  return {
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
  };
}

let refreshRequest: Promise<SessionTokens> | null = null;

async function refreshTokens() {
  if (refreshRequest) {
    return refreshRequest;
  }

  const { refreshToken } = getStoredSessionTokens();

  if (!refreshToken) {
    throw new Error("저장된 refresh_token이 없습니다.");
  }

  refreshRequest = requestReissueWithRefreshToken(refreshToken);

  try {
    return await refreshRequest;
  } finally {
    refreshRequest = null;
  }
}

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { accessToken } = getStoredSessionTokens();
  const headers = AxiosHeaders.from(config.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    headers.delete("Authorization");
  }

  config.headers = headers;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalConfig = error.config as RetryableRequestConfig | undefined;

    if (!originalConfig) {
      return Promise.reject(error);
    }

    const requestUrl = originalConfig.url ?? "";
    const isReissueRequest = requestUrl.includes("/v1/auth/reissue");

    if (isReissueRequest || originalConfig._retry || !isTokenError(error)) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    try {
      const tokens = await refreshTokens();

      setStoredSessionTokens(tokens);
      const headers = AxiosHeaders.from(originalConfig.headers);

      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
      originalConfig.headers = headers;

      return api(originalConfig);
    } catch {
      clearStoredSession();
      moveToLoginPage();
      return Promise.reject(error);
    }
  },
);
