"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TrendingUp, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-8">
          <TrendingUp className="text-brand-400 w-7 h-7" />
          <span className="text-xl font-bold text-white">TradeLingo <span className="text-brand-400">AI</span></span>
        </div>

        <div className="text-6xl mb-4">⚡</div>
        <h1 className="text-2xl font-bold text-white mb-2">Algo salió mal</h1>
        <p className="text-slate-400 mb-8">
          Se produjo un error inesperado. Puedes intentar de nuevo o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Intentar de nuevo
          </button>
          <Link href="/dashboard" className="btn-secondary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Ir al panel
          </Link>
        </div>
      </div>
    </div>
  );
}
