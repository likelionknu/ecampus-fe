export type UserRole = "USER" | "ADMIN" | string;

export interface ApiErrorPayload {
  code: string | null;
  message: string | null;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiErrorPayload;
}

export interface GoogleLoginRequest {
  code: string;
}

export interface GoogleLoginResponseData {
  name: string;
  email?: string;
  role: UserRole;
  access_token: string;
  refresh_token: string;
  profile_url: string;
}

export interface AuthSession {
  name: string;
  email: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  profileUrl: string;
}

export type AuthErrorReason =
  | "whitelist"
  | "invalid-code"
  | "unauthorized"
  | "forbidden"
  | "not-found"
  | "server"
  | "oauth"
  | "config"
  | "unknown";

export interface AuthErrorInfo {
  reason: AuthErrorReason;
  code: string | null;
  message: string;
  status?: number;
}
