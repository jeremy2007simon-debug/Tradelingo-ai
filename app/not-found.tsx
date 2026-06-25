import Link from "next/link";
import { TrendingUp, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-8">
          <TrendingUp className="text-brand-400 w-7 h-7" />
          <span className="text-xl font-bold text-white">TradeLingo <span className="text-brand-400">AI</span></span>
        </div>

        <div className="text-8xl font-black text-brand-600/30 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Página no encontrada</h1>
        <p className="text-slate-400 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Ir al panel
          </Link>
          <Link href="/modules" className="btn-secondary flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            Ver módulos
          </Link>
        </div>
      </div>
    </div>
  );
}
