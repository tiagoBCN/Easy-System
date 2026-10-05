"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Service {
  id: string;
  name: string;
  price: number;
  durationMin: number;
}

export function FormularioAgendamento() {
  const { token } = useAuth();
  const router = useRouter();
  
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/services", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setServices(data);
          if (data.length > 0) setServiceId(data[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar serviços", err);
      }
    };
    if (token) fetchServices();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!clientName || !clientPhone || !date || !time || !serviceId) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    const dateTime = new Date(`${date}T${time}:00`);

    try {
      const res = await fetch("http://localhost:3001/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientName,
          clientPhone,
          date: dateTime.toISOString(),
          serviceId,
          // Status automático como confirmado, pois é o barbeiro quem está marcando
          status: "CONFIRMED" 
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao agendar.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1a1a1a] rounded-xl border border-[rgba(212,175,55,0.12)]">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Novo Agendamento</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome do Cliente</label>
          <Input 
            value={clientName} 
            onChange={(e) => setClientName(e.target.value)} 
            placeholder="Ex: João Silva"
            required
            className="w-full bg-[#0f0f0f] border-[rgba(212,175,55,0.3)] text-white focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Telefone / WhatsApp</label>
          <Input 
            value={clientPhone} 
            onChange={(e) => setClientPhone(e.target.value)} 
            placeholder="Ex: 11999999999"
            required
            className="w-full bg-[#0f0f0f] border-[rgba(212,175,55,0.3)] text-white focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
            <Input 
              type="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required
              className="w-full bg-[#0f0f0f] border-[rgba(212,175,55,0.3)] text-white focus:border-[#d4af37]"
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Horário</label>
            <Input 
              type="time"
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required
              className="w-full bg-[#0f0f0f] border-[rgba(212,175,55,0.3)] text-white focus:border-[#d4af37]"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Serviço</label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-[rgba(212,175,55,0.3)] bg-[#0f0f0f] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {services.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} - R$ {Number(s.price).toFixed(2)} ({s.durationMin} min)
              </option>
            ))}
            {services.length === 0 && <option value="">Carregando serviços...</option>}
          </select>
        </div>

        <Button 
          type="submit" 
          disabled={loading || services.length === 0}
          className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold mt-4 transition-colors"
        >
          {loading ? "Salvando..." : "Confirmar Agendamento"}
        </Button>
      </form>
    </div>
  );
}
