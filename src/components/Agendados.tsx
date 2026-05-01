"use client";

import { useState } from "react";
import { clients } from "@/utils/clients";
import Image from "next/image";
import whatsAppLogo from "../../assets/WhatsApp_Logo_PNG_Transparente_Sem_Fundo.png";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Agendados = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 3, 3));
  };

  return (
    <div>
      <h1 className="text-4xl text-white my-4">
        Bem Vindo, Fulano!
        <br />
        Seus agendamentos para hoje:
      </h1>

      <div className="bg-black p-10 rounded-t-md">
        {clients.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="flex text-white text-2xl justify-between items-center rounded-md"
          >
            <div className="flex mr-3 my-3 px-5 w-full h-15 bg-[#786730] justify-between items-center rounded-md">
              <p>{item.name}</p>
              <p>{item.service}</p>
              <p>{item.time}</p>
            </div>

            <div className="flex p-3 justify-center items-center w-15 h-15 rounded-full bg-[#D4AF37] hover:opacity-80">
              <Image src={whatsAppLogo} width={40} height={40} alt="WhatsApp" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center h-20 px-5 bg-[#786730] text-white rounded-b-md">
        {visibleCount >= clients.length && (
          <div
            onClick={handleShowLess}
            className="flex justify-center items-center w-15 h-15 rounded-full bg-black hover:opacity-80 cursor-pointer"
          >
            <ArrowUp />
          </div>
        )}

        {visibleCount < clients.length && (
          <div
            onClick={handleShowMore}
            className="flex justify-center items-center w-15 h-15 rounded-full bg-black hover:opacity-80 cursor-pointer"
          >
            <ArrowDown />
          </div>
        )}
      </div>
    </div>
  );
};
