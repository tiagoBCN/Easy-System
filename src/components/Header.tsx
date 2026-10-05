"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  Scissors,
  Calendar,
  PlusCircle,
  UserPlus,
  Clock,
  Settings,
  LogOut,
  User,
} from "lucide-react";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, role, logout } = useAuth();

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

  const menuItems = [
    { label: "Agendamentos do dia", icon: Calendar },
    { label: "Cadastrar serviços", icon: PlusCircle },
    { label: "Cadastrar clientes", icon: UserPlus },
    { label: "Ajustar horários", icon: Clock },
    { label: "Opções", icon: Settings },
  ];

  return (
    <div className="bg-[#1a1a1a] border-b border-[#D4AF37]/20 h-[72px] flex items-center relative z-50 px-4 sm:px-6 lg:px-10">
      {/* Espaço esquerdo (balanceia o botão direito no flex) */}
      <div className="w-[44px]" />

      {/* Logo centralizado */}
      <div className="flex items-center justify-center gap-3 flex-1 min-w-0">
        <Scissors size={22} className="text-[#D4AF37] shrink-0" />
        <h1 className="bg-gradient-to-r from-[#D4AF37] via-[#f0cc5a] to-[#B8960C] bg-clip-text text-transparent truncate font-serif text-base sm:text-xl md:text-2xl font-normal leading-tight tracking-wide">
          System Barber
        </h1>
      </div>

      {/* Botão hamburger — DIREITA */}
      <div ref={menuRef} className="relative">
        <button
          id="header-menu-btn"
          onClick={() => setOpen((v) => !v)}
          className="w-[44px] h-[44px] rounded-xl border border-[#D4AF37]/20 bg-transparent flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:scale-105 transition-all duration-200"
          aria-label="Abrir menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-[calc(100%+10px)] right-0 w-[min(280px,90vw)] bg-[#1a1a1a]/95 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Info do usuário logado */}
            <div className="px-4 py-3 border-b border-[#D4AF37]/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center shrink-0">
                <User size={16} className="text-[#0f0f0f]" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {user?.name || "Usuário"}
                </p>
                <p className="text-[10px] text-[#D4AF37] tracking-wider uppercase font-medium">
                  {role === "owner" ? "Administrador" : "Cliente"}
                </p>
              </div>
            </div>

            {/* Itens do menu */}
            <nav className="py-1.5">
              {menuItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-300 text-sm hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:pl-5 transition-all duration-200 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <Icon
                    size={17}
                    className="text-gray-500 hover:text-[#D4AF37] shrink-0 transition-colors"
                  />
                  {label}
                </div>
              ))}
            </nav>

            {/* Botão de sair */}
            <div className="border-t border-[#D4AF37]/10 p-2">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 text-sm font-semibold hover:bg-red-500/10 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <LogOut size={17} className="shrink-0" />
                Sair da conta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
