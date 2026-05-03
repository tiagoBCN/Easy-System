import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import fundoLogin from "../../assets/fundologin.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`
      email: ${email},
      senha: ${password}
    `);
  };

  return (
    <div
      className="flex items-center justify-center px-4 rounded-md bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fundoLogin.src})` }}
    >
      <div className="flex flex-col items-center text-white w-full ">

        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-10 text-center">
          Easy Barber Shop
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 md:gap-6"
        >
          <Field className="w-full">
            <FieldLabel htmlFor="email">Email:</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              className="bg-white text-black h-10"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field className="w-full">
            <FieldLabel htmlFor="password">Senha:</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              className="bg-white text-black h-10"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-end text-[#D4AF37] cursor-pointer text-sm hover:underline hover:text-[#D4AF37]">
              Esqueceu sua senha?
            </p>
          </Field>

          <Button className="w-full h-10 md:h-14 bg-[#D4AF37] text-lg md:text-xl">
            Entrar
          </Button>
        </form>

        <p className="text-center mt-6 text-sm md:text-base">
          Não tem conta?{" "}
          <span className="text-[#D4AF37] cursor-pointer hover:underline hover:text-[#D4AF37]">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
};