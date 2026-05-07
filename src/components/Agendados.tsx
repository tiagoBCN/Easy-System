"use client";

import { useState } from "react";
import Image from "next/image";
import { clients } from "@/utils/clients";
import whatsAppLogo from "../../assets/WhatsApp_Logo_PNG_Transparente_Sem_Fundo.png";
import {
  ChevronDown,
  ChevronUp,
  CalendarX,
  Sun,
} from "lucide-react";

const today = new Date().toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

const getInitial = (name: string) => name.charAt(0).toUpperCase();

export const Agendados = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const handleShowLess = () => setVisibleCount((prev) => Math.max(prev - 3, 3));

  const visibleClients = clients.slice(0, visibleCount);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .appt-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 14px;
          transition: border-color 0.22s, transform 0.22s, box-shadow 0.22s;
          cursor: default;
        }
        .appt-card:hover {
          border-color: rgba(212,175,55,0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(212,175,55,0.08);
        }
        .whatsapp-btn {
          transition: transform 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }
        .whatsapp-btn:hover {
          transform: scale(1.12);
          opacity: 0.85;
        }
        .paginate-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          border-radius: 12px;
          border: 1px solid rgba(212,175,55,0.3);
          background: transparent;
          color: #D4AF37;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .paginate-btn:hover {
          background: rgba(212,175,55,0.08);
          border-color: rgba(212,175,55,0.55);
          transform: scale(1.02);
        }
        .service-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.2);
          color: #D4AF37;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .time-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 8px;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          color: #9ca3af;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* ── Saudação ─────────────────────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="flex items-center gap-3 mb-1">
            <Sun size={24} style={{ color: "#D4AF37" }} />
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              Bem-vindo,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0cc5a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Barbeiro
              </span>
              !
            </h1>
          </div>
          <p
            style={{
              color: "#ffffffff",
              fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
              marginLeft: 36,
              textTransform: "capitalize",
            }}
          >
            Seus agendamentos para hoje &mdash;{" "}
            <span style={{ color: "#ffffffff" }}>{today}</span>
          </p>
        </div>

        {/* ── Container principal ───────────────────────────── */}
        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Cabeçalho da lista */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid rgba(212,175,55,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                color: "#ffffffff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Agendamentos do dia
            </span>
            <span style={{ fontSize: "0.8rem", color: "#ffffffff" }}>
              Mostrando{" "}
              <span style={{ color: "#D4AF37", fontWeight: 600 }}>
                {Math.min(visibleCount, clients.length)}
              </span>{" "}
              de{" "}
              <span style={{ color: "#D4AF37", fontWeight: 600 }}>
                {clients.length}
              </span>{" "}
              agendamentos
            </span>
          </div>

          {/* ── Lista de Cards ──────────────────────────────── */}
          <div style={{ padding: "12px 12px 0" }}>
            {clients.length === 0 ? (
              /* Estado vazio */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "60px 20px",
                  gap: 16,
                  color: "#4b5563",
                }}
              >
                <CalendarX size={48} style={{ color: "#2a2a2a" }} />
                <p style={{ fontSize: "0.95rem" }}>
                  Nenhum agendamento para hoje
                </p>
              </div>
            ) : (
              visibleClients.map((item, index) => (
                <div
                  key={index}
                  className="appt-card"
                  style={{
                    marginBottom: 10,
                    padding: "16px 18px",
                    animation: `fadeInUp 0.4s ease both`,
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Layout: coluna no mobile, linha no sm+ */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    style={{ gap: 14 }}
                  >
                    {/* ── Esquerda: avatar + nome ── */}
                    <div className="flex items-center" style={{ gap: 14, minWidth: 0 }}>
                      {/* Avatar com inicial */}
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#0f0f0f",
                          boxShadow: "0 2px 12px rgba(212,175,55,0.25)",
                        }}
                      >
                        {getInitial(item.name)}
                      </div>

                      {/* Nome + serviço */}
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            color: "#f3f4f6",
                            fontWeight: 600,
                            fontSize: "0.97rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </p>
                        {/* Serviço visível no mobile (abaixo do nome) */}
                        <p
                          className="sm:hidden"
                          style={{
                            color: "#9ca3af",
                            fontSize: "0.82rem",
                            marginTop: 2,
                          }}
                        >
                          {item.service}
                        </p>
                      </div>
                    </div>

                    {/* ── Centro: badge serviço (só md+) ── */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                      <span className="service-pill">{item.service}</span>
                    </div>

                    {/* ── Direita: tempo + WhatsApp ── */}
                    <div
                      className="flex items-center justify-between sm:justify-end"
                      style={{ gap: 12, flexShrink: 0 }}
                    >
                      <span className="time-badge">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {item.time} min
                      </span>

                      <button
                        className="whatsapp-btn"
                        title={`Contatar ${item.name} via WhatsApp`}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={whatsAppLogo}
                          width={32}
                          height={32}
                          alt="WhatsApp"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Paginação ────────────────────────────────────── */}
          {clients.length > 3 && (
            <div
              style={{
                background: "#1a1a1a",
                borderTop: "1px solid rgba(212,175,55,0.12)",
                borderRadius: "0 0 20px 20px",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
              }}
            >
              {visibleCount > 3 && (
                <button className="paginate-btn" onClick={handleShowLess}>
                  <ChevronUp size={16} />
                  Ver menos
                </button>
              )}
              {visibleCount < clients.length && (
                <button className="paginate-btn" onClick={handleShowMore}>
                  Ver mais
                  <ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
