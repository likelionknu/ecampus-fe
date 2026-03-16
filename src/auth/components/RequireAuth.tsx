import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  getDefaultRouteByRole,
  useAuthSessionStore,
} from "@auth/utils/authStore";
import type { UserRole } from "@auth/types/auth";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const hasHydrated = useAuthSessionStore((state) => state.hasHydrated);
  const authSession = useAuthSessionStore((state) => state.session);

  if (!hasHydrated) {
    return null;
  }

  if (!authSession) {
    return (
      <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
    );
  }

  if (allowedRoles && !allowedRoles.includes(authSession.role)) {
    return <Navigate to={getDefaultRouteByRole(authSession.role)} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;
