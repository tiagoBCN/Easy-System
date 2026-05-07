"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Scissors,
  Calendar,
  PlusCircle,
  UserPlus,
  Clock,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Agendamentos do dia", icon: Calendar },
  { label: "Cadastrar serviços", icon: PlusCircle },
  { label: "Cadastrar clientes", icon: UserPlus },
  { label: "Ajustar horários", icon: Clock },
  { label: "Opções", icon: Settings },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-menu {
          animation: slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .menu-btn {
          transition: color 0.2s, background 0.2s, transform 0.15s;
        }
        .menu-btn:hover {
          color: #D4AF37;
          background: rgba(212,175,55,0.08);
          transform: scale(1.05);
        }
        .nav-item {
          transition: background 0.18s, color 0.18s, padding-left 0.18s;
          cursor: pointer;
        }
        .nav-item:hover {
          background: rgba(212,175,55,0.08);
          padding-left: 1.25rem;
          color: #D4AF37;
        }
        .nav-item:hover .nav-icon {
          color: #D4AF37;
        }
        .header-logo-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #f0cc5a 50%, #B8960C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div
        style={{
          background: "#1a1a1a",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          height: 72,
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 50,
        }}
        className="px-4 sm:px-6 lg:px-10"
      >
        {/* Espaço esquerdo (balanceia o botão direito) */}
        <div style={{ width: 44 }} />

        {/* Logo centralizado */}
        <div
          className="flex items-center gap-3 flex-1 justify-center"
          style={{ minWidth: 0 }}
        >
          <Scissors
            size={22}
            style={{ color: "#D4AF37", flexShrink: 0 }}
          />
          <h1
            className="header-logo-gradient truncate"
            style={{
              fontFamily: "var(--font-rye), serif",
              fontSize: "clamp(1rem, 3.5vw, 1.55rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            Barbearia Stillus Men
          </h1>
        </div>

        {/* Botão hamburger — DIREITA */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            id="header-menu-btn"
            onClick={() => setOpen((v) => !v)}
            className="menu-btn"
            aria-label="Abrir menu"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(212,175,55,0.2)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                width: "min(260px, 90vw)",
                background: "rgba(26,26,26,0.97)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                zIndex: 100,
              }}
            >
              {/* Cabeçalho do dropdown */}
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(212,175,55,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Scissors size={14} style={{ color: "#D4AF37" }} />
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#D4AF37",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Menu Principal
                </span>
              </div>

              {/* Itens */}
              <nav style={{ padding: "6px 0" }}>
                {menuItems.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="nav-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 16px",
                      color: "#d1d5db",
                      fontSize: "0.92rem",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    <Icon
                      size={17}
                      className="nav-icon"
                      style={{ color: "#6b7280", flexShrink: 0, transition: "color 0.18s" }}
                    />
                    {label}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
