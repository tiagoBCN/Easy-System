import { Header } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Barbearia Stillus Men",
  description: "Gerencie seus agendamentos e clientes com facilidade.",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header fixo no topo */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Conteúdo principal */}
      <main
        className="px-4 sm:px-6 lg:px-10 py-8"
        style={{ background: "#0f0f0f", minHeight: "calc(100vh - 72px - 52px)" }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid rgba(212,175,55,0.12)",
          background: "#0f0f0f",
        }}
      >
        <p style={{ fontSize: "0.78rem", color: "#4b5563", letterSpacing: "0.03em" }}>
          © 2026 Barbearia Stillus Men · Todos os direitos reservados
        </p>
      </footer>
    </>
  );
}
