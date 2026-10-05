"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

/**
 * Componente de guarda de autenticação.
 * Enquanto está validando o token mostra um loading premium.
 * Se não autenticado, o AuthContext já redireciona para /.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
            <Shield size={28} className="text-[#D4AF37]" />
          </div>
          <p className="text-gray-500 text-sm tracking-wider">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O redirect é feito pelo AuthContext
  }

  return <>{children}</>;
}
