import { useAuthSessionStore } from "@/auth/stores";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const role = useAuthSessionStore((s) => s.session?.role);
  const hasHydrated = useAuthSessionStore((s) => s.hasHydrated);

  if (!hasHydrated) return null;
  if (role !== "ADMIN") return <Navigate to="/user/dashboard" replace />;
  return <>{children}</>;
}

export default RequireAuth;
