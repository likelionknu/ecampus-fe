import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginLoadingPage from "@auth/pages/LoginLoadingPage";
import {
  AuthFlowError,
  buildLoginErrorPath,
  createAuthErrorInfo,
  getGoogleOAuthErrorMessage,
  normalizeAuthError,
} from "@auth/utils/authErrors";
import {
  getDefaultRouteByRole,
  useAuthSessionStore,
} from "@auth/utils/authStore";
import { validateGoogleOAuthState } from "@auth/api/googleOAuth";
import { api } from "@shared/apis";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clearSession = useAuthSessionStore((state) => state.clearSession);
  const setSessionFromGoogleResponse = useAuthSessionStore(
    (state) => state.setSessionFromGoogleResponse,
  );
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");

  useEffect(() => {
    let isActive = true;

    const processGoogleLogin = async () => {
      try {
        if (error) {
          throw new AuthFlowError(
            createAuthErrorInfo({
              reason: "oauth",
              message: getGoogleOAuthErrorMessage(error),
            }),
          );
        }

        if (!code) {
          navigate("/auth/login", { replace: true });
          return;
        }

        validateGoogleOAuthState(state);
        const encodedCode = encodeURIComponent(code);
        const response = await api.post(`/v1/auth/login?code=${encodedCode}`);

        if (!response.data.data) {
          throw new AuthFlowError(
            createAuthErrorInfo({
              code: response.data.error.code,
              message: response.data.error.message,
              status: response.status,
            }),
          );
        }

        const loginResponse = response.data.data;

        setSessionFromGoogleResponse(loginResponse);

        if (!isActive) {
          return;
        }

        navigate(getDefaultRouteByRole(loginResponse.role), {
          replace: true,
        });
      } catch (caughtError) {
        clearSession();

        if (!isActive) {
          return;
        }

        navigate(buildLoginErrorPath(normalizeAuthError(caughtError)), {
          replace: true,
        });
      }
    };

    void processGoogleLogin();

    return () => {
      isActive = false;
    };
  }, [clearSession, code, error, navigate, setSessionFromGoogleResponse, state]);

  return <LoginLoadingPage />;
};

export default GoogleCallback;
