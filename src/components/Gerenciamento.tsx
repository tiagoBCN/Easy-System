"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import whatsAppLogo from "../../assets/WhatsApp_Logo_PNG_Transparente_Sem_Fundo.png";
import {
  Calendar,
  PlusCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Scissors,
  RefreshCw,
  CheckCircle,
  XCircle,
  CalendarX,
  Sun,
  Plus,
  Building2
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description?: string;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getInitial = (name: string) =>
  name ? name.charAt(0).toUpperCase() : "?";

export const Gerenciamento = () => {
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "agendamentos" | "servicos" | "metricas" | "horarios"
  >("agendamentos");

  const [today, setToday] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Form para novos serviços
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [submittingService, setSubmittingService] = useState(false);

  // Carregar agendamentos do backend
  const loadAppointments = async () => {
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
        throw new Error("Erro de servidor");
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar catálogo de serviços
  const loadServices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setServices(data);
      } else {
        throw new Error("Falha ao carregar serviços");
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
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

    loadAppointments();
    loadServices();
  }, []);

  // Cadastrar novo serviço
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newServiceName || !newServicePrice || !newServiceDuration) {
      alert("Preencha todos os campos obrigatórios do serviço.");
      return;
    }

    setSubmittingService(true);

    try {
      const payload = {
        name: newServiceName,
        price: parseFloat(newServicePrice),
        durationMin: parseInt(newServiceDuration),
        description: newServiceDesc || undefined,
      };

      const res = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();

        setServices((prev) => [...prev, created]);
        setNewServiceName("");
        setNewServicePrice("");
        setNewServiceDuration("");
        setNewServiceDesc("");

        alert("Serviço adicionado com sucesso!");
      } else {
        alert("Erro ao adicionar serviço no servidor.");
      }
    } catch {
      alert("Erro de conexão ao adicionar serviço.");
    } finally {
      setSubmittingService(false);
    }
  };

  // Alterar status de agendamento
  const handleStatusChange = async (
    id: string,
    newStatus: Appointment["status"]
  ) => {
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Mensagem direta WhatsApp
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
      `Olá, ${clientName}! Confirmando seu agendamento de ${serviceName} hoje às ${time} na Barbearia Stillus Men. Podemos confirmar? ✂️`
    );

    window.open(
      `https://wa.me/${formattedPhone}?text=${message}`,
      "_blank"
    );
  };

  // Métricas financeiras calculadas
  const completedAppointments = appointments.filter(
    (a) => a.status === "COMPLETED" || a.status === "CONFIRMED"
  );

  const totalRevenue = completedAppointments.reduce(
    (acc, a) => acc + (Number(a.service.price) || 0),
    0
  );

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* ── Cabeçalho Principal ───────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Sun size={24} className="text-[#D4AF37]" />

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Painel de{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#f0cc5a] bg-clip-text text-transparent">
                Gerenciamento
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-sm ml-9 capitalize">
            Hoje — <span className="text-white">{today}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/agendar"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-black transition text-xs font-semibold"
          >
            <Plus size={14} />
            Novo Agendamento
          </Link>

          <button
            onClick={loadAppointments}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-gray-800 text-gray-300 hover:text-white transition text-xs font-semibold"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin text-[#D4AF37]" : ""}
            />
            Atualizar
          </button>
        </div>
      </div>

      {/* ── Navegação por Abas ─────────────────────────────── */}
      <div className="flex items-center gap-2 p-1.5 bg-[#111111] border border-[#D4AF37]/15 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab("agendamentos")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "agendamentos"
              ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Calendar size={16} />
          Agendamentos do Dia
        </button>

        <button
          onClick={() => setActiveTab("servicos")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "servicos"
              ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Scissors size={16} />
          Catálogo de Serviços
        </button>

        <button
          onClick={() => setActiveTab("metricas")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "metricas"
              ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp size={16} />
          Métricas & Ganhos
        </button>

        <button
          onClick={() => setActiveTab("horarios")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "horarios"
              ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Clock size={16} />
          Horários de Atendimento
        </button>
      </div>

      {/* ── Conteúdo da Aba: AGENDAMENTOS ─────────────────── */}
      {activeTab === "agendamentos" && (
        <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-5 py-4 border-b border-[#D4AF37]/10 flex items-center justify-between bg-[#0c0c0c]">
            <span className="text-[11px] text-gray-400 tracking-widest uppercase font-semibold">
              Fila de Atendimento
            </span>

            <span className="text-xs sm:text-sm text-gray-400">
              Mostrando{" "}
              <span className="text-[#D4AF37] font-semibold">
                {Math.min(visibleCount, appointments.length)}
              </span>{" "}
              de{" "}
              <span className="text-[#D4AF37] font-semibold">
                {appointments.length}
              </span>
            </span>
          </div>

          <div className="p-4 space-y-3">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
                <CalendarX size={48} className="text-gray-800" />
                <p className="text-sm">
                  Nenhum agendamento ativo para hoje.
                </p>
              </div>
            ) : (
              appointments.slice(0, visibleCount).map((item) => {
                const appointmentTime = new Date(item.date).toLocaleTimeString(
                  "pt-BR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-[#D4AF37]/10 hover:border-[#D4AF37]/45 rounded-2xl p-4 md:px-5 md:py-4 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                      <div className="hidden md:flex items-center justify-center flex-1">
                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold">
                          {item.service.name} • R${" "}
                          {Number(item.service.price).toFixed(2)}
                        </span>
                      </div>

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

                        <div className="flex items-center gap-1.5">
                          {item.status !== "COMPLETED" && (
                            <button
                              disabled={updatingId === item.id}
                              onClick={() =>
                                handleStatusChange(item.id, "COMPLETED")
                              }
                              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#10b981] hover:bg-white/10 transition-all"
                              title="Concluir"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}

                          {item.status !== "CANCELLED" && (
                            <button
                              disabled={updatingId === item.id}
                              onClick={() =>
                                handleStatusChange(item.id, "CANCELLED")
                              }
                              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#ef4444] hover:bg-white/10 transition-all"
                              title="Cancelar"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>

                        <button
                          className="hover:scale-110 hover:opacity-90 transition-all shrink-0 ml-1 bg-transparent border-0 cursor-pointer"
                          onClick={() =>
                            handleWhatsAppClick(
                              item.clientName,
                              item.clientPhone,
                              item.service.name,
                              item.date
                            )
                          }
                          title="Enviar confirmação WhatsApp"
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
        </div>
      )}

      {/* ── Conteúdo da Aba: SERVIÇOS ────────────────────── */}
      {activeTab === "servicos" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-5 shadow-2xl h-fit">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/10">
              <PlusCircle size={18} className="text-[#D4AF37]" />
              <h2 className="text-white font-semibold text-base">
                Novo Serviço
              </h2>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Nome do Serviço *
                </label>

                <input
                  type="text"
                  placeholder="Ex: Barba & Sobrancelha"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full bg-[#181818] border border-gray-800 focus:border-[#D4AF37] text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Preço (R$) *
                  </label>

                  <input
                    type="number"
                    step="0.50"
                    placeholder="35.00"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full bg-[#181818] border border-gray-800 focus:border-[#D4AF37] text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Duração (Min) *
                  </label>

                  <input
                    type="number"
                    placeholder="30"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="w-full bg-[#181818] border border-gray-800 focus:border-[#D4AF37] text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Descrição
                </label>

                <textarea
                  rows={2}
                  placeholder="Descrição opcional dos detalhes do serviço..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full bg-[#181818] border border-gray-800 focus:border-[#D4AF37] text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingService}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-semibold text-sm hover:opacity-90 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Cadastrar Serviço
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF37]/10">
              <div className="flex items-center gap-2">
                <Scissors size={18} className="text-[#D4AF37]" />
                <h2 className="text-white font-semibold text-base">
                  Catálogo de Serviços Ativos
                </h2>
              </div>

              <span className="text-xs text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                {services.length} Serviços
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#161616] border border-gray-800 hover:border-[#D4AF37]/35 rounded-xl p-4 transition duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-sm">
                      {s.name}
                    </h3>

                    <span className="text-[#D4AF37] font-bold text-sm bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-lg">
                      R$ {Number(s.price).toFixed(2)}
                    </span>
                  </div>

                  {s.description && (
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                      {s.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                    <Clock size={13} />
                    <span>Duração: {s.durationMin} minutos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Conteúdo da Aba: MÉTRICAS & GANHOS ───────────── */}
      {activeTab === "metricas" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-3 text-emerald-500 mb-3">
              <DollarSign size={24} />
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Faturamento Estimado
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white">
              R$ {totalRevenue.toFixed(2)}
            </p>

            <span className="text-xs text-emerald-500 font-medium mt-1 inline-block">
              ↑ Baseado nos agendamentos de hoje
            </span>
          </div>

          <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-3 text-blue-500 mb-3">
              <CheckCircle size={24} />

              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Cortes Confirmados/Concluídos
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white">
              {completedAppointments.length}
            </p>

            <span className="text-xs text-gray-400 mt-1 inline-block">
              De {appointments.length} agendamentos totais
            </span>
          </div>

          <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-3 text-[#D4AF37] mb-3">
              <Building2 size={24} />

              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Serviços Oferecidos
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white">
              {services.length}
            </p>

            <span className="text-xs text-[#D4AF37] mt-1 inline-block">
              Opções no catálogo
            </span>
          </div>
        </div>
      )}

      {/* ── Conteúdo da Aba: HORÁRIOS DE ATENDIMENTO ─────── */}
      {activeTab === "horarios" && (
        <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D4AF37]/10">
            <Clock size={20} className="text-[#D4AF37]" />

            <div>
              <h2 className="text-white font-semibold text-base">
                Grade Horária de Trabalho
              </h2>

              <p className="text-gray-400 text-xs">
                Defina os horários em que os clientes podem agendar seus
                horários.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                day: "Segunda-feira",
                status: "Fechado / Pausa",
                open: false,
              },
              {
                day: "Terça-feira",
                hours: "09:00 - 19:00",
                open: true,
              },
              {
                day: "Quarta-feira",
                hours: "09:00 - 19:00",
                open: true,
              },
              {
                day: "Quinta-feira",
                hours: "09:00 - 19:00",
                open: true,
              },
              {
                day: "Sexta-feira",
                hours: "09:00 - 20:00",
                open: true,
              },
              {
                day: "Sábado",
                hours: "08:00 - 18:00",
                open: true,
              },
              {
                day: "Domingo",
                status: "Fechado",
                open: false,
              },
            ].map((d) => (
              <div
                key={d.day}
                className="flex items-center justify-between px-4 py-3 bg-[#161616] border border-gray-800 rounded-xl"
              >
                <span className="text-gray-200 font-medium text-sm">
                  {d.day}
                </span>

                {d.open ? (
                  <span className="text-[#D4AF37] font-semibold text-xs bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                    {d.hours}
                  </span>
                ) : (
                  <span className="text-gray-500 font-medium text-xs bg-gray-900 px-3 py-1 rounded-lg">
                    {d.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};