import Link from "next/link";
import { TrendingUp, BookOpen, Brain, Trophy, Shield, ChevronRight, Zap, Target, BarChart3 } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "10 módulos estructurados",
    description: "Desde fundamentos hasta estrategias avanzadas. Aprende a tu ritmo con lecciones de 5-10 minutos.",
  },
  {
    icon: Brain,
    title: "Profesor virtual con IA",
    description: "Marco, tu mentor de IA, responde tus dudas en tiempo real con explicaciones claras y personalizadas.",
  },
  {
    icon: Trophy,
    title: "Gamificación real",
    description: "XP, rachas diarias, niveles e insignias. Aprende como si fueras a subir de nivel en un videojuego.",
  },
  {
    icon: Shield,
    title: "Enfoque en gestión del riesgo",
    description: "El 90% de los traders pierden por no gestionar el riesgo. Te enseñamos esto desde el día 1.",
  },
];

const steps = [
  {
    icon: Zap,
    step: "01",
    title: "Crea tu cuenta gratis",
    description: "Registro en 30 segundos. Sin tarjeta de crédito.",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Completa lecciones diarias",
    description: "Lecciones de 5-10 minutos con explicación, quiz y ejercicio práctico.",
  },
  {
    icon: Brain,
    step: "03",
    title: "Pregunta al profesor IA",
    description: "¿Algo no quedó claro? Marco te lo explica al instante, como un tutor privado.",
  },
  {
    icon: Target,
    step: "04",
    title: "Aplica con cuenta demo",
    description: "Practica lo aprendido en mercados reales sin arriesgar dinero.",
  },
];

const modules = [
  { icon: "📈", name: "Fundamentos del Mercado", xp: "0 XP" },
  { icon: "💰", name: "Tipos de Activos", xp: "100 XP" },
  { icon: "🕯️", name: "Velas Japonesas", xp: "200 XP" },
  { icon: "📊", name: "Tendencias de Mercado", xp: "350 XP" },
  { icon: "🧱", name: "Soporte y Resistencia", xp: "500 XP" },
  { icon: "🛡️", name: "Gestión del Riesgo", xp: "700 XP" },
  { icon: "🧠", name: "Psicología del Trading", xp: "900 XP" },
  { icon: "🔬", name: "Backtesting", xp: "1.100 XP" },
  { icon: "🎮", name: "Cuenta Demo", xp: "1.300 XP" },
  { icon: "🏆", name: "Tu Estrategia Personal", xp: "1.500 XP" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-surface-border px-6 py-4 flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-brand-400 w-7 h-7" />
          <span className="text-xl font-bold text-white">TradeLingo <span className="text-brand-400">AI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm hidden sm:block">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-5">
            Empezar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-600/20 text-brand-300 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-brand-600/30">
          <span>🎓</span>
          <span>La forma más rápida de aprender trading desde cero</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight mb-6">
          Aprende trading como si fuera{" "}
          <span className="text-brand-400">un videojuego</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Lecciones diarias de 10 minutos, un mentor con IA disponible 24/7, y un sistema de recompensas
          que hace el aprendizaje adictivo. Porque el trading es una habilidad, no una suerte.
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
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: "10", label: "Módulos completos", icon: "📚" },
            { value: "50+", label: "Lecciones", icon: "📝" },
            { value: "24/7", label: "Profesor con IA", icon: "🤖" },
            { value: "0€", label: "Para empezar", icon: "🎯" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-400">{stat.value}</div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-6 py-16 border-t border-surface-border bg-surface-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">¿Cómo funciona?</h2>
            <p className="text-slate-400">De cero a trader informado en cuatro pasos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="card text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-brand-400 w-6 h-6" />
                </div>
                <div className="text-brand-400 font-mono text-sm font-bold mb-2">{step.step}</div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-surface-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">¿Por qué TradeLingo AI?</h2>
            <p className="text-slate-400">No somos un curso más. Somos tu compañero de aprendizaje.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card hover:border-brand-600/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-brand-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos del curso */}
      <section className="px-6 py-16 border-t border-surface-border bg-surface-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">El curso completo</h2>
            <p className="text-slate-400">10 módulos diseñados por expertos en educación financiera.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((mod, idx) => (
              <div key={mod.name} className="flex items-center gap-4 bg-surface-card border border-surface-border rounded-xl px-4 py-3">
                <span className="text-2xl">{mod.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{mod.name}</p>
                  <p className="text-slate-500 text-xs">Módulo {idx + 1}</p>
                </div>
                <span className="text-xs text-slate-600 font-mono">{mod.xp}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/register" className="btn-primary inline-flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Empezar el curso gratis
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-20 border-t border-surface-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para aprender trading?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Únete hoy. La primera lección está disponible ahora mismo, sin tarjeta de crédito.
          </p>
          <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Crear mi cuenta gratis
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="text-brand-400 w-5 h-5" />
          <span className="text-white font-bold">TradeLingo <span className="text-brand-400">AI</span></span>
        </div>
        <p className="text-slate-600 text-xs max-w-2xl mx-auto leading-relaxed">
          ⚠️ <strong className="text-slate-500">Aviso de riesgo:</strong> TradeLingo AI es una plataforma
          educativa. No somos asesores financieros ni intermediarios regulados. El trading implica riesgo real
          de pérdida de capital. Nunca inviertas dinero que no puedas permitirte perder.
          El rendimiento pasado no garantiza resultados futuros.
        </p>
        <p className="text-slate-700 text-xs mt-4">© 2025 TradeLingo AI — Solo con fines educativos</p>
      </footer>
    </main>
  );
}
