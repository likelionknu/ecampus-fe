import { useNavigate } from "react-router-dom";
import {
  getDefaultRouteByRole,
  useAuthSessionStore,
} from "../stores/authStore";
import { useEffect } from "react";
import LoginLoadingPage from "./LoginLoadingPage";

function SsoCallbackPage() {
  const navigate = useNavigate();
  const setSession = useAuthSessionStore((state) => state.setSession);
  const clearSession = useAuthSessionStore((state) => state.clearSession);

  useEffect(() => {
    try {
      const hashParams = new URLSearchParams(
        window.location.hash.startsWith("#")
          ? window.location.hash.slice(1)
          : window.location.hash,
      );

      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const email = hashParams.get("email");
      const role = hashParams.get("role");
      const name = hashParams.get("name");
      const profileUrl = hashParams.get("profile_url");

      if (!accessToken || !refreshToken || !role) {
        clearSession();
        navigate("/auth/login", { replace: true });
        return;
      }

      setSession({
        name: name ?? "",
        email: email ?? "",
        role,
        accessToken,
        refreshToken,
        profileUrl: profileUrl ?? "",
      });

      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );

      navigate(getDefaultRouteByRole(role), { replace: true });
    } catch {
      clearSession();
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, setSession, clearSession]);

  return <LoginLoadingPage />;
}

export default SsoCallbackPage;
