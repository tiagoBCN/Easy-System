import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Rye } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Easy Barber Shop | Sistema de Agendamento",
  description: "Agende seu corte de cabelo de forma rápida e prática com o Easy Barber Shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${rye.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0f0f]">{children}</body>
    </html>
  );
}
