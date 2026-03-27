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

// function moveToLoginPage() {
//   if (typeof window === "undefined") {
//     return;
//   }

//   if (window.location.pathname !== "/auth/login") {
//     window.location.assign("/auth/login");
//   }
// }

let refreshPromise: Promise<SessionTokens> | null = null;

const reissueAccessToken = async (): Promise<SessionTokens> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  // IIFE 패턴으로 묶어서 에러 처리와 상태 초기화를 깔끔하게 관리
  refreshPromise = (async () => {
    const { refreshToken } = getStoredSessionTokens();
    if (!refreshToken) throw new Error("No refresh token");

    const response = await axios.post<ReissueApiResponse>(
      "/v1/auth/reissue",
      { refresh_token: refreshToken },
      {
        baseURL: BASE_API_URL,
        headers: { "Content-Type": "application/json" },
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

    const tokens = {
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
    };

    // 스토리지 업데이트
    setStoredSessionTokens(tokens);

    return tokens;
  })()
    .catch((refreshError) => {
      // 재발급 실패 시: 스토리지 초기화 및 로그인 페이지로 강제 이동
      console.error("Session expired:", refreshError);
      clearStoredSession();

      if (typeof window !== "undefined") {
        window.alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        if (window.location.pathname !== "/auth/login") {
          window.location.assign("/auth/login");
        }
      }
      throw refreshError;
    })
    .finally(() => {
      // 성공/실패 여부와 상관없이 Promise 상태 초기화
      refreshPromise = null;
    });

  return refreshPromise;
};

// function isTokenError(error: AxiosError<ApiErrorResponse>) {
//   const status = error.response?.status;
//   const code = error.response?.data?.error?.code;

//   // const originalRequest = error?.config as
//   //   | (typeof error.config & { _retry?: boolean })
//   //   | undefined;

//   // const isReissueRequest =
//   //   typeof originalRequest?.url === "string" &&
//   //   originalRequest.url.includes("/v1/auth/reissue");

//   return (
//     status === 401 || (typeof code === "string" && code.startsWith("C401"))
//     // || (!originalRequest?._retry && !isReissueRequest)
//   );
// }

// async function requestReissueWithRefreshToken(refreshToken: string) {
//   const response = await axios.post<ReissueApiResponse>(
//     "/v1/auth/reissue",
//     {
//       refresh_token: refreshToken,
//     },
//     {
//       baseURL: BASE_API_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   const nextAccessToken = response.data?.data?.access_token;
//   const nextRefreshToken = response.data?.data?.refresh_token;

//   if (!nextAccessToken || !nextRefreshToken) {
//     throw new Error(
//       response.data?.error?.message ??
//         "토큰 재발급 응답에 access_token/refresh_token이 없습니다.",
//     );
//   }

//   return {
//     accessToken: nextAccessToken,
//     refreshToken: nextRefreshToken,
//   };
// }

// let refreshRequest: Promise<SessionTokens> | null = null;

// async function refreshTokens() {
//   if (refreshRequest) {
//     return refreshRequest;
//   }

//   const { refreshToken } = getStoredSessionTokens();

//   if (!refreshToken) {
//     throw new Error("저장된 refresh_token이 없습니다.");
//   }

//   refreshRequest = requestReissueWithRefreshToken(refreshToken);

//   try {
//     return await refreshRequest;
//   } finally {
//     refreshRequest = null;
//   }
// }

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
  (response) => {
    // 200 OK로 왔지만 응답 바디에 C401 코드가 포함된 경우 401 에러로 강제 전환
    if (response.data?.error?.code === "C401") {
      return Promise.reject({
        config: response.config,
        response: { ...response, status: 401, config: response.config },
      });
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    console.log("인터셉터");
    const originalRequest = error?.config as RetryableRequestConfig | undefined;

    const isReissueRequest =
      typeof originalRequest?.url === "string" &&
      originalRequest.url.includes("/v1/auth/reissue");

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 401 에러이고, 재시도한 적이 없으며, 재발급 API 자체가 아닌 경우에만 재발급 시도
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isReissueRequest
    ) {
      originalRequest._retry = true;

      console.log("재시도");
      try {
        const tokens = await reissueAccessToken();
        console.log("재시도 시작");

        // 새 토큰으로 헤더 업데이트 후 원래 요청 재시도
        const headers = AxiosHeaders.from(originalRequest.headers);
        headers.set("Authorization", `Bearer ${tokens.accessToken}`);
        originalRequest.headers = headers;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("재시도 시작 실패");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<ApiErrorResponse>) => {
//     const originalConfig = error.config as RetryableRequestConfig | undefined;

//     if (!originalConfig) {
//       return Promise.reject(error);
//     }

//     const requestUrl = originalConfig.url ?? "";
//     const isReissueRequest = requestUrl.includes("/v1/auth/reissue");

//     if (isReissueRequest || originalConfig._retry || !isTokenError(error)) {
//       return Promise.reject(error);
//     }

//     originalConfig._retry = true;

//     try {
//       const tokens = await refreshTokens();

//       setStoredSessionTokens(tokens);
//       const headers = AxiosHeaders.from(originalConfig.headers);

//       headers.set("Authorization", `Bearer ${tokens.accessToken}`);
//       originalConfig.headers = headers;

//       return api(originalConfig);
//     } catch {
//       clearStoredSession();
//       moveToLoginPage();
//       return Promise.reject(error);
//     }
//   },
// );
