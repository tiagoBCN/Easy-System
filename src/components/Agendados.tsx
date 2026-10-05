"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import whatsAppLogo from "../../assets/WhatsApp_Logo_PNG_Transparente_Sem_Fundo.png";
import {
  ChevronDown,
  ChevronUp,
  CalendarX,
  Sun,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  durationMin: number;
}

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  service: Service;
}

const getInitial = (name: string) =>
  name ? name.charAt(0).toUpperCase() : "?";

export const Agendados = () => {
  const { token } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [today, setToday] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Carregar dados
  const loadData = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        throw new Error("Erro ao carregar dados do servidor");
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    );
  }, []);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  const handleShowLess = () =>
    setVisibleCount((prev) => Math.max(prev - 3, 3));

  // Abrir WhatsApp com mensagem automática
  const handleWhatsAppClick = (
    clientName: string,
    phone: string,
    serviceName: string,
    dateStr: string
  ) => {
    const formattedPhone = phone.replace(/\D/g, "");

    const time = new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = encodeURIComponent(
      `Olá, ${clientName}! Passando para confirmar seu agendamento de ${serviceName} hoje às ${time}. Podemos confirmar? ✂️`
    );

    window.open(
      `https://wa.me/${formattedPhone}?text=${message}`,
      "_blank"
    );
  };

  // Atualizar Status do Agendamento
  const handleStatusChange = async (
    id: string,
    newStatus: Appointment["status"]
  ) => {
    if (!token) return;

    setUpdatingId(id);

    try {
      const res = await fetch(
        `${API_URL}/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const updated = await res.json();

        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? updated : app))
        );
      } else {
        alert("Erro ao atualizar o status no servidor.");
      }
    } catch (err) {
      console.error(err);
      alert("Conexão falhou ao tentar atualizar status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleAppointments = appointments.slice(0, visibleCount);

  return (
    <div className="max-w-[900px] mx-auto">
      {/* ── Top Bar / Saudação ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Sun size={24} className="text-[#D4AF37]" />

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Bem-vindo,{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#f0cc5a] bg-clip-text text-transparent">
                Barbeiro
              </span>
              !
            </h1>
          </div>

          <p className="text-gray-400 text-sm ml-9 capitalize">
            Hoje &mdash; <span className="text-white">{today}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center justify-center p-2.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:text-white transition disabled:opacity-50"
            title="Atualizar dados"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* ── Main Container ────────────────────────────────── */}
      <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* List Header */}
        <div className="px-5 py-4 border-b border-[#D4AF37]/10 flex items-center justify-between bg-[#0c0c0c]">
          <span className="text-[11px] text-gray-400 tracking-widest uppercase font-semibold">
            Fila de Hoje
          </span>

          <span className="text-xs sm:text-sm text-gray-400">
            Mostrando{" "}
            <span className="text-[#D4AF37] font-semibold">
              {Math.min(visibleCount, appointments.length)}
            </span>{" "}
            de{" "}
            <span className="text-[#D4AF37] font-semibold">
              {appointments.length}
            </span>{" "}
            agendados
          </span>
        </div>

        {/* Cards List */}
        <div className="p-4 space-y-3">
          {loading && appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
              <RefreshCw
                className="animate-spin text-[#D4AF37]"
                size={36}
              />
              <p>Buscando agendamentos no banco...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
              <CalendarX size={48} className="text-gray-800" />
              <p className="text-sm">Nenhum agendamento ativo.</p>
            </div>
          ) : (
            visibleAppointments.map((item) => {
              const appointmentTime = new Date(
                item.date
              ).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-[#D4AF37]/10 hover:border-[#D4AF37]/45 rounded-2xl p-4 md:px-5 md:py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(212,175,55,0.06)]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left: Time & Name */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black border border-gray-800 text-gray-200 text-xs sm:text-sm font-semibold">
                        <Clock size={14} className="text-[#D4AF37]" />
                        <span>{appointmentTime}</span>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center shrink-0 font-bold text-base text-[#0f0f0f]">
                        {getInitial(item.clientName)}
                      </div>

                      <div className="truncate">
                        <p className="text-gray-100 font-semibold text-sm sm:text-base truncate">
                          {item.clientName}
                        </p>

                        <span className="md:hidden inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-semibold tracking-wider mt-1">
                          {item.service.name}
                        </span>
                      </div>
                    </div>

                    {/* Center: Service pill */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-wider">
                        {item.service.name}
                      </span>
                    </div>

                    {/* Right: Actions, Status & WhatsApp */}
                    <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
                          item.status === "PENDING"
                            ? "bg-amber-500/10 border-amber-500/25 text-amber-500"
                            : item.status === "CONFIRMED"
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
                            : item.status === "COMPLETED"
                            ? "bg-blue-500/10 border-blue-500/25 text-blue-500"
                            : "bg-red-500/10 border-red-500/25 text-red-500"
                        }`}
                      >
                        {item.status === "PENDING" && "Pendente"}
                        {item.status === "CONFIRMED" && "Confirmado"}
                        {item.status === "COMPLETED" && "Concluído"}
                        {item.status === "CANCELLED" && "Cancelado"}
                      </span>

                      {/* Action controllers */}
                      <div className="flex items-center gap-1.5">
                        {item.status !== "COMPLETED" && (
                          <button
                            disabled={updatingId === item.id}
                            onClick={() =>
                              handleStatusChange(item.id, "COMPLETED")
                            }
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#10b981] hover:bg-white/10 transition-all disabled:opacity-50"
                            title="Marcar como Concluído"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}

                        {item.status !== "CANCELLED" && (
                          <button
                            disabled={updatingId === item.id}
                            onClick={() =>
                              handleStatusChange(item.id, "CANCELLED")
                            }
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#ef4444] hover:bg-white/10 transition-all disabled:opacity-50"
                            title="Cancelar agendamento"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>

                      {/* WhatsApp redirect */}
                      <button
                        className="hover:scale-110 hover:opacity-90 transition-all duration-200 shrink-0 ml-1"
                        onClick={() =>
                          handleWhatsAppClick(
                            item.clientName,
                            item.clientPhone,
                            item.service.name,
                            item.date
                          )
                        }
                        title="Enviar confirmação pelo WhatsApp"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={whatsAppLogo}
                          width={28}
                          height={28}
                          alt="WhatsApp"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {appointments.length > 3 && (
          <div className="bg-[#161616] border-t border-[#D4AF37]/10 py-4 flex justify-center items-center gap-3">
            {visibleCount > 3 && (
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/55 bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                onClick={handleShowLess}
              >
                <ChevronUp size={16} />
                Ver menos
              </button>
            )}

            {visibleCount < appointments.length && (
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/55 bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                onClick={handleShowMore}
              >
                Ver mais
                <ChevronDown size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
