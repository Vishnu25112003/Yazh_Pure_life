import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, UNAUTHORIZED_EVENT } from "./api";

interface AuthState {
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ email: string }>("/me")
      .then((me) => setEmail(me.email))
      .catch(() => setEmail(null))
      .finally(() => setLoading(false));
    const onExpired = () => setEmail(null);
    window.addEventListener(UNAUTHORIZED_EVENT, onExpired);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onExpired);
  }, []);

  const login = useCallback(async (e: string, p: string) => {
    const me = await api.post<{ email: string }>("/login", { email: e, password: p });
    setEmail(me.email);
  }, []);

  const logout = useCallback(async () => {
    await api.post("/logout").catch(() => undefined);
    setEmail(null);
  }, []);

  return <AuthContext.Provider value={{ email, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
