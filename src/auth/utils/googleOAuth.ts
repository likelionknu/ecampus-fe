import { createAuthErrorInfo, AuthFlowError } from "@auth/utils/authErrors";
import { clearAuthSession } from "@auth/utils/authStorage";

const GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH_STATE_KEY = "ecampus.auth.google.state";

function getApiConfigValue(value: string | undefined, name: string) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw new AuthFlowError(
      createAuthErrorInfo({
        reason: "config",
        message: `${name} 환경변수가 설정되지 않았습니다.`,
      }),
    );
  }

  return normalizedValue;
}

export function getApiBaseUrl() {
  return getApiConfigValue(
    import.meta.env.VITE_API_BASE_URL,
    "VITE_API_BASE_URL",
  ).replace(/\/+$/, "");
}

export function getGoogleRedirectUri() {
  const configuredRedirectUri =
    import.meta.env.VITE_GOOGLE_REDIRECT_URI?.trim();

  return (
    configuredRedirectUri || `${window.location.origin}/auth/login-loading`
  );
}

function buildGoogleAuthorizationUrl(state: string) {
  const googleClientId = getApiConfigValue(
    import.meta.env.VITE_GOOGLE_CLIENT_ID,
    "VITE_GOOGLE_CLIENT_ID",
  );

  const url = new URL(GOOGLE_AUTHORIZATION_URL);

  url.searchParams.set("client_id", googleClientId);
  url.searchParams.set("redirect_uri", getGoogleRedirectUri());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("prompt", "select_account");
  url.searchParams.set("state", state);

  return url.toString();
}

function createGoogleOAuthState() {
  return crypto.randomUUID();
}

function saveGoogleOAuthState(state: string) {
  window.sessionStorage.setItem(GOOGLE_OAUTH_STATE_KEY, state);
}

function consumeGoogleOAuthState() {
  const savedState = window.sessionStorage.getItem(GOOGLE_OAUTH_STATE_KEY);

  window.sessionStorage.removeItem(GOOGLE_OAUTH_STATE_KEY);

  return savedState;
}

export function startGoogleLogin() {
  clearAuthSession();

  const state = createGoogleOAuthState();

  saveGoogleOAuthState(state);
  window.location.assign(buildGoogleAuthorizationUrl(state));
}

export function validateGoogleOAuthState(receivedState: string | null) {
  const savedState = consumeGoogleOAuthState();

  if (!savedState || !receivedState || savedState !== receivedState) {
    throw new AuthFlowError(
      createAuthErrorInfo({
        reason: "oauth",
        message:
          "로그인 요청이 만료되었거나 유효하지 않습니다. 다시 시도해주세요.",
      }),
    );
  }
}
