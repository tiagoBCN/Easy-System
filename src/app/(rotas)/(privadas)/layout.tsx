import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Rye } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "App",
  description: "Agende seu serviço de forma rápida e prática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${rye.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#2A2A2A]">
        <header className="px-6">
          <Header />
        </header>
        <main className="flex-1 px-6 py-4">{children}</main>
        <footer className="h-12 flex items-center justify-center border-t border-gray-700 text-sm text-white">
          © 2026 Barbearia
        </footer>
      </body>
    </html>
  );
}
