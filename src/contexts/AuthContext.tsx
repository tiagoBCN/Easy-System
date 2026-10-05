"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id?: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ["/", "/login"];
const OWNER_ROUTES = ["/dashboard", "/agendar"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!token && !!user;

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
    setRole(null);

    router.push("/");
  }, [router]);

  const login = useCallback(
    (newToken: string, newUser: User, newRole: string) => {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("role", newRole);

      setToken(newToken);
      setUser(newUser);
      setRole(newRole);
    },
    []
  );

  useEffect(() => {
    const validateAuth = async () => {
      const savedToken = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");
      const savedUser = localStorage.getItem("user");

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();

          setToken(savedToken);
          setUser(data.user);
          setRole(data.role);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");

          setToken(null);
          setUser(null);
          setRole(null);
        }
      } catch {
        if (savedUser && savedRole) {
          try {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            setRole(savedRole);
          } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isOwnerRoute = OWNER_ROUTES.some((r) =>
      pathname.startsWith(r)
    );

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/");
      return;
    }

    if (isAuthenticated && isPublicRoute) {
      router.push("/dashboard");
      return;
    }

    if (
      isAuthenticated &&
      isOwnerRoute &&
      role !== "owner"
    ) {
      router.push("/");
      return;
    }
  }, [
    isLoading,
    isAuthenticated,
    pathname,
    role,
    router,
  ]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider"
    );
  }

  return context;
}