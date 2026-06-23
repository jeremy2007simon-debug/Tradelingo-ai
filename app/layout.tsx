import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TradeLingo AI — Aprende trading con IA",
  description:
    "Aprende trading desde cero con un profesor virtual con IA. Lecciones diarias, gamificación y progreso real.",
  keywords: ["trading", "aprender trading", "forex", "criptomonedas", "educación financiera"],
  openGraph: {
    title: "TradeLingo AI",
    description: "Aprende trading desde cero con IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-surface text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
