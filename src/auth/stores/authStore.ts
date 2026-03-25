import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  AuthSession,
  GoogleLoginResponseData,
  UserRole,
} from "@auth/types/auth";

const AUTH_STORAGE_KEY = "ecampus.auth.session";

interface AuthSessionState {
  hasHydrated: boolean;
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  setSessionFromGoogleResponse: (response: GoogleLoginResponseData) => void;
  clearSession: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

function toAuthSession(response: GoogleLoginResponseData): AuthSession {
  return {
    name: response.name,
    role: response.role,
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    profileUrl: response.profile_url,
  };
}

export const useAuthSessionStore = create<AuthSessionState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      session: null,
      setSession: (session) => {
        set({ session });
      },
      setSessionFromGoogleResponse: (response) => {
        set({ session: toAuthSession(response) });
      },
      clearSession: () => {
        set({ session: null });
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ session: state.session }),
      storage: createJSONStorage(() => window.localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function getDefaultRouteByRole(role: UserRole) {
  return role === "ADMIN" ? "/admin/sessions" : "/user/dashboard";
}
