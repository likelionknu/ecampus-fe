import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  getDefaultRouteByRole,
  getStoredAuthSession,
} from "@auth/utils/authStorage";
import type { UserRole } from "@auth/types/auth";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const authSession = getStoredAuthSession();

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
