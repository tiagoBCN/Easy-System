"use client";

import { useState } from "react";
import Image from "next/image";
import fundoLogin from "../../assets/fundologin.png";

// Ícones inline para evitar dependências extras
const ScissorsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#D4AF37"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`email: ${email},\nsenha: ${password}`);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          50%       { box-shadow: 0 0 0 8px rgba(212,175,55,0.15); }
        }
        .login-panel {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .scissors-float {
          animation: float 3s ease-in-out infinite;
        }
        .btn-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #B8960C 50%, #D4AF37 100%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-gold:hover {
          background-position: right center;
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 32px rgba(212,175,55,0.45);
        }
        .btn-gold:active {
          transform: translateY(0) scale(0.99);
        }
        .input-field {
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          border: 1.5px solid #2a2a2a;
          background: #1a1a1a;
          color: #fff;
          outline: none;
        }
        .input-field:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
        .input-field::placeholder {
          color: #4b5563;
        }
        .gold-link {
          color: #D4AF37;
          transition: color 0.2s, text-decoration 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .gold-link:hover {
          color: #f0cc5a;
          text-decoration: underline;
        }
        .divider-or {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #3a3a3a;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }
        .divider-or::before,
        .divider-or::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #2a2a2a);
        }
        .divider-or::after {
          background: linear-gradient(90deg, #2a2a2a, transparent);
        }
        /* Partículas decorativas */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(212,175,55,0.15);
          animation: float 4s ease-in-out infinite;
        }
        .particle:nth-child(2) { animation-delay: -1s; }
        .particle:nth-child(3) { animation-delay: -2s; }
        .particle:nth-child(4) { animation-delay: -3s; }
      `}</style>

      <div className="flex min-h-screen w-full">

        {/* ── LADO ESQUERDO: Hero com imagem ─────────────────── */}
        <div className="relative hidden lg:flex lg:w-[60%] overflow-hidden">
          {/* Imagem de fundo */}
          <Image
            src={fundoLogin}
            alt="Easy Barber Shop"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Overlay escuro gradiente */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(15,10,0,0.70) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Partículas decorativas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="particle" style={{ width: 80, height: 80, top: "15%", left: "12%", animationDuration: "5s" }} />
            <div className="particle" style={{ width: 50, height: 50, top: "65%", left: "8%", animationDuration: "4.2s" }} />
            <div className="particle" style={{ width: 120, height: 120, top: "75%", left: "72%", animationDuration: "6s", opacity: 0.08 }} />
            <div className="particle" style={{ width: 35, height: 35, top: "30%", left: "80%", animationDuration: "3.5s" }} />
          </div>

          {/* Conteúdo hero */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
            {/* Linha decorativa */}
            <div className="flex items-center gap-4 mb-8">
              <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
              <span style={{ color: "#D4AF37", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
                Agenda Fácil
              </span>
              <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
            </div>

            {/* Ícone tesoura animado */}
            <div className="scissors-float mb-6">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.12)",
                  border: "1.5px solid rgba(212,175,55,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
            </div>

            {/* Título principal */}
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "1rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Easy{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0cc5a, #B8960C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Barber
              </span>{" "}
              Shop
            </h1>

            {/* Tagline */}
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1.05rem",
                maxWidth: 380,
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Sua Agenda Virtual com facilidade e estilo. Excelência em cada detalhe.
            </p>

            {/* Badges de destaque */}
            <div className="flex gap-4 flex-wrap justify-center">
              {["✦ Agendamento Online", "✦ Profissionais Top", "✦ Atendimento Premium"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(212,175,55,0.85)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    borderRadius: 999,
                    padding: "4px 14px",
                    letterSpacing: "0.05em",
                    backdropFilter: "blur(4px)",
                    background: "rgba(212,175,55,0.06)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LADO DIREITO: Painel de login ──────────────────── */}
        <div
          className="flex flex-1 items-center justify-center px-6 py-12 lg:px-14 relative"
          style={{ background: "#0f0f0f" }}
        >
          {/* Glow de fundo sutil */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Card principal */}
          <div
            className="login-panel relative w-full"
            style={{ maxWidth: 420 }}
          >
            {/* Header mobile: logo visível só no mobile */}
            <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
              <ScissorsIcon />
              <span
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Easy Barber Shop
              </span>
            </div>

            {/* Cabeçalho do formulário */}
            <div className="mb-8">
              {/* Ícone desktop */}
              <div className="hidden lg:flex items-center gap-3 mb-6">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ScissorsIcon />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "#D4AF37",
                    letterSpacing: "0.02em",
                  }}
                >
                  Easy Barber Shop
                </span>
              </div>

              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "0.4rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Bem-vindo de volta
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.92rem" }}>
                Acesse sua conta para continuar
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Campo Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  style={{ fontSize: "0.82rem", color: "#9ca3af", fontWeight: 500, letterSpacing: "0.03em" }}
                >
                  Email
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      transition: "opacity 0.2s",
                      opacity: emailFocused ? 0.4 : 1,
                    }}
                  >
                    <EnvelopeIcon />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                    className="input-field w-full rounded-xl"
                    style={{
                      height: 52,
                      paddingLeft: 46,
                      paddingRight: 16,
                      fontSize: "0.95rem",
                      borderRadius: 12,
                    }}
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  style={{ fontSize: "0.82rem", color: "#9ca3af", fontWeight: 500, letterSpacing: "0.03em" }}
                >
                  Senha
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      transition: "opacity 0.2s",
                      opacity: passwordFocused ? 0.4 : 1,
                    }}
                  >
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    className="input-field w-full"
                    style={{
                      height: 52,
                      paddingLeft: 46,
                      paddingRight: 48,
                      fontSize: "0.95rem",
                      borderRadius: 12,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                {/* Esqueceu a senha */}
                <div className="flex justify-end mt-1">
                  <span className="gold-link" style={{ fontSize: "0.82rem" }}>
                    Esqueceu sua senha?
                  </span>
                </div>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                className="btn-gold w-full"
                style={{
                  height: 52,
                  borderRadius: 12,
                  border: "none",
                  color: "#0f0f0f",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                ENTRAR
              </button>

              {/* Divisória OU */}
              <div className="divider-or" style={{ color: "#3a3a3a", fontSize: "0.72rem", letterSpacing: "0.12em" }}>
                OU
              </div>

              {/* Rodapé */}
              <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.87rem" }}>
                Não tem uma conta?{" "}
                <span className="gold-link" style={{ fontWeight: 600 }}>
                  Cadastre-se
                </span>
              </p>
            </form>

            {/* Linha de crédito */}
            <p
              style={{
                textAlign: "center",
                color: "#2a2a2a",
                fontSize: "0.72rem",
                marginTop: "2.5rem",
                letterSpacing: "0.05em",
              }}
            >
              © {new Date().getFullYear()} Easy Barber Shop · Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </>
  );
};