import Link from "next/link";
import { TrendingUp, BookOpen, Brain, Trophy, Shield, ChevronRight } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "10 módulos estructurados",
    description: "Desde fundamentos hasta estrategias avanzadas. Aprende a tu ritmo.",
  },
  {
    icon: Brain,
    title: "Profesor virtual con IA",
    description: "Resuelve tus dudas al instante con un mentor paciente y claro.",
  },
  {
    icon: Trophy,
    title: "Gamificación real",
    description: "XP, rachas, insignias y niveles que hacen el aprendizaje adictivo.",
  },
  {
    icon: Shield,
    title: "Enfoque en gestión del riesgo",
    description: "Aprende a proteger tu capital antes de buscar ganancias.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-brand-400 w-7 h-7" />
          <span className="text-xl font-bold text-white">TradeLingo <span className="text-brand-400">AI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-5">
            Empezar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-600/20 text-brand-300 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-brand-600/30">
          <span>🎓</span>
          <span>Aprende trading desde cero con IA</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight mb-6">
          Tu profesor de trading,{" "}
          <span className="text-brand-400">disponible 24/7</span>
        </h1>

        <p className="text-slate-400 text-xl max-w-2xl mb-10 leading-relaxed">
          Aprende trading paso a paso con lecciones diarias, ejercicios prácticos y un mentor con IA
          que responde todas tus dudas. Como Duolingo, pero para los mercados financieros.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/register" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
            Empezar ahora — es gratis
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="btn-secondary text-lg px-8 py-4">
            Ya tengo cuenta
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center mb-20">
          {[
            { value: "10", label: "Módulos completos" },
            { value: "50+", label: "Lecciones" },
            { value: "IA", label: "Profesor virtual" },
            { value: "0€", label: "Para empezar" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-brand-400">{stat.value}</div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
          {features.map((feature) => (
            <div key={feature.title} className="card text-left hover:border-brand-600/50 transition-colors">
              <feature.icon className="text-brand-400 w-8 h-8 mb-4" />
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk disclaimer */}
      <footer className="border-t border-surface-border px-6 py-6 text-center">
        <p className="text-slate-600 text-xs max-w-2xl mx-auto">
          ⚠️ <strong className="text-slate-500">Aviso de riesgo:</strong> TradeLingo AI es una plataforma
          educativa. No somos asesores financieros. El trading implica riesgo de pérdida de capital.
          Nunca inviertas dinero que no puedas permitirte perder. El rendimiento pasado no garantiza resultados futuros.
        </p>
        <p className="text-slate-700 text-xs mt-3">© 2025 TradeLingo AI — Solo con fines educativos</p>
      </footer>
    </main>
  );
}
