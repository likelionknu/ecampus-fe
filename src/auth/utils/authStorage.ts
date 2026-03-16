import type {
  AuthSession,
  GoogleLoginResponseData,
  UserRole,
} from "@auth/types/auth";

const AUTH_STORAGE_KEY = "ecampus.auth.session";

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<AuthSession>;

  return (
    typeof session.name === "string" &&
    typeof session.role === "string" &&
    typeof session.accessToken === "string" &&
    typeof session.refreshToken === "string" &&
    typeof session.profileUrl === "string"
  );
}

export function toAuthSession(response: GoogleLoginResponseData): AuthSession {
  return {
    name: response.name,
    role: response.role,
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    profileUrl: response.profile_url,
  };
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getStoredAuthSession(): AuthSession | null {
  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as unknown;

    return isAuthSession(parsedSession) ? parsedSession : null;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getDefaultRouteByRole(role: UserRole) {
  return role === "ADMIN" ? "/admin/sessions" : "/user/dashboard";
}
