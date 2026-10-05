import { FormularioAgendamento } from "@/components/FormularioAgendamento";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AgendarPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/dashboard" 
          className="text-gray-400 hover:text-[#d4af37] transition-colors bg-[#1a1a1a] p-2 rounded-lg border border-[rgba(212,175,55,0.12)] hover:border-[#d4af37]/50"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Agendamento Manual
        </h1>
      </div>
      <FormularioAgendamento />
    </div>
  );
}
