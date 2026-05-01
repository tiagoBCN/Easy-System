"use client";

import { List } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };
  return (
    <div className="flex justify-between items-center h-20 px-4 w-full text-white bg-[#1A1A1A] rounded-md">
      <h1 className="text-4xl">Barbearia Stillus Men</h1>
      <List onClick={openModal} />
      {open && (
        <div className="text-end bg-[#1A1A1A] w-[18%] mr-6 p-4 absolute right-0 top-17 rounded-md transition">
          <p className="text-xl p-4 cursor-pointer border-b hover:underline ">
            Agendamentos de Hoje
          </p>
          <p className="text-xl p-4 cursor-pointer border-b hover:underline">
            Serviços
          </p>
          <p className="text-xl p-4 cursor-pointer border-b hover:underline">
            Opçoes
          </p>
          <p className="text-xl p-4 cursor-pointer border-b hover:underline">
            Horários
          </p>
        </div>
      )}
    </div>
  );
};
