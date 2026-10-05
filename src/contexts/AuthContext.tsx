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

const API_URL = "http://localhost:3001/api";

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

// Rotas que não precisam de autenticação
const PUBLIC_ROUTES = ["/", "/login"];

// Rotas que só o owner pode acessar
const OWNER_ROUTES = ["/dashboard", "/agendar"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!token && !!user;

  // Limpa os dados de auth
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRole(null);
    router.push("/");
  }, [router]);

  // Salva os dados de auth
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

  // Valida o token salvo no localStorage ao carregar a página
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
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          setToken(savedToken);
          setUser(data.user);
          setRole(data.role);
        } else {
          // Token inválido ou expirado — limpa tudo
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          setToken(null);
          setUser(null);
          setRole(null);
        }
      } catch {
        // Se o backend está offline, confia nos dados salvos temporariamente
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

  // Proteção de rotas — redireciona quando necessário
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isOwnerRoute = OWNER_ROUTES.some((r) => pathname.startsWith(r));

    // Se não autenticado e tentando acessar rota privada → redireciona para login
    if (!isAuthenticated && !isPublicRoute) {
      router.push("/");
      return;
    }

    // Se autenticado e tentando acessar login → redireciona para dashboard
    if (isAuthenticated && isPublicRoute) {
      router.push("/dashboard");
      return;
    }

    // Se é client tentando acessar rota de owner → redireciona
    if (isAuthenticated && isOwnerRoute && role !== "owner") {
      router.push("/");
      return;
    }
  }, [isLoading, isAuthenticated, pathname, role, router]);

  return (
    <AuthContext.Provider
      value={{ user, role, token, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
