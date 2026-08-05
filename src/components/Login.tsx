"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
  const router = useRouter();
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [celularFocused, setCelularFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/login/owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ celular, senha: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar o login");
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);
      
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
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
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-[rgba(15,10,0,0.7)] to-black/85"
          />

          {/* Partículas decorativas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="particle w-20 h-20 top-[15%] left-[12%] animate-[float_5s_ease-in-out_infinite]" />
            <div className="particle w-[50px] h-[50px] top-[65%] left-[8%] animate-[float_4.2s_ease-in-out_infinite]" />
            <div className="particle w-[120px] h-[120px] top-[75%] left-[72%] animate-[float_6s_ease-in-out_infinite] opacity-[0.08]" />
            <div className="particle w-[35px] h-[35px] top-[30%] left-[80%] animate-[float_3.5s_ease-in-out_infinite]" />
          </div>

          {/* Conteúdo hero */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
            {/* Linha decorativa */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-[60px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[0.7rem] tracking-[0.35em] uppercase">
                Agenda Fácil
              </span>
              <div className="h-[1px] w-[60px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </div>

            {/* Ícone tesoura animado */}
            <div className="scissors-float mb-6">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/12 border-[1.5px] border-[#D4AF37]/30 flex items-center justify-center backdrop-blur-md"
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
              className="font-playfair text-[clamp(2.2rem,3.5vw,3.2rem)] font-bold text-white leading-[1.15] mb-4"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Easy{" "}
              <span className="bg-gradient-to-br from-[#D4AF37] via-[#f0cc5a] to-[#B8960C] bg-clip-text text-transparent">
                Barber
              </span>{" "}
              Shop
            </h1>

            {/* Tagline */}
            <p className="text-white/65 text-[1.05rem] max-w-[380px] leading-[1.7] mb-10">
              Sua Agenda Virtual com facilidade e estilo. Excelência em cada detalhe.
            </p>

            {/* Badges de destaque */}
            <div className="flex gap-4 flex-wrap justify-center">
              {["✦ Agendamento Online", "✦ Profissionais Top", "✦ Atendimento Premium"].map((badge) => (
                <span
                  key={badge}
                  className="text-[0.72rem] text-[#D4AF37]/85 border border-[#D4AF37]/25 rounded-full px-[14px] py-1 tracking-[0.05em] backdrop-blur-[4px] bg-[#D4AF37]/6"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LADO DIREITO: Painel de login ──────────────────── */}
        <div
          className="flex flex-1 items-center justify-center px-6 py-12 lg:px-14 relative bg-[#0f0f0f]"
        >
          {/* Glow de fundo sutil */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Card principal */}
          <div
            className="login-panel relative w-full max-w-[420px]"
          >
            {/* Header mobile: logo visível só no mobile */}
            <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
              <ScissorsIcon />
              <span
                className="text-[1.4rem] font-bold text-white"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
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
                  className="w-11 h-11 rounded-[12px] bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center"
                >
                  <ScissorsIcon />
                </div>
                <span
                  className="text-[1.15rem] font-semibold text-[#D4AF37] tracking-[0.02em]"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Easy Barber Shop
                </span>
              </div>

              <h2
                className="text-[1.75rem] font-bold text-white mb-[0.4rem] tracking-[-0.01em]"
              >
                Bem-vindo de volta
              </h2>
              <p className="text-[#6b7280] text-[0.92rem]">
                Acesse sua conta para continuar
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {errorMsg && (
                <div style={{ color: "#ef4444", fontSize: "0.87rem", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.2)", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}

              {/* Campo Celular */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="celular"
                  className="text-[0.82rem] text-[#9ca3af] font-medium tracking-[0.03em]"
                >
                  Celular
                </label>
                <div className="relative">
                  <span
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
                    style={{
                      opacity: celularFocused ? 0.4 : 1,
                    }}
                  >
                    <PhoneIcon />
                  </span>
                  <input
                    id="celular"
                    name="celular"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    onFocus={() => setCelularFocused(true)}
                    onBlur={() => setCelularFocused(false)}
                    required
                    className="input-field w-full h-[52px] pl-[46px] pr-4 text-[0.95rem] rounded-[12px]"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-[0.82rem] text-[#9ca3af] font-medium tracking-[0.03em]"
                >
                  Senha
                </label>
                <div className="relative">
                  <span
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
                    style={{
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
                    className="input-field w-full h-[52px] pl-[46px] pr-[48px] text-[0.95rem] rounded-[12px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1 flex items-center"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                {/* Esqueceu a senha */}
                <div className="flex justify-end mt-1">
                  <span className="gold-link text-[0.82rem]">
                    Esqueceu sua senha?
                  </span>
                </div>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full h-[52px] rounded-[12px] border-none text-[#0f0f0f] font-bold text-[0.98rem] tracking-[0.04em] mt-1"
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "ENTRANDO..." : "ENTRAR"}
              </button>

              {/* Divisória OU */}
              <div className="divider-or text-[#3a3a3a] text-[0.72rem] tracking-[0.12em]">
                OU
              </div>

              {/* Rodapé */}
              <p className="text-center text-[#6b7280] text-[0.87rem]">
                Não tem uma conta?{" "}
                <span className="gold-link font-semibold">
                  Cadastre-se
                </span>
              </p>
            </form>

            {/* Linha de crédito */}
            <p
              className="text-center text-[#2a2a2a] text-[0.72rem] mt-10 tracking-[0.05em]"
            >
              © 2026 Easy Barber Shop · Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </>
  );
};