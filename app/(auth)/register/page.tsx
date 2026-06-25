"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TrendingUp, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (signUpError) {
      console.error("Supabase signUp error:", signUpError);
      const msg = signUpError.message;
      setError(
        msg === "User already registered"
          ? "Este email ya está registrado."
          : `Error: ${msg || JSON.stringify(signUpError)}`
      );
      setLoading(false);
      return;
    }

    if (data.user) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="card text-center max-w-md w-full animate-fade-in">
          <CheckCircle className="text-success w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">¡Cuenta creada!</h2>
          <p className="text-slate-400">Redirigiendo a tu panel de aprendizaje...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-8">
          <TrendingUp className="text-brand-400 w-8 h-8" />
          <span className="text-2xl font-bold text-white">
            TradeLingo <span className="text-brand-400">AI</span>
          </span>
        </div>

        <div className="card">
          <h1 className="text-2xl font-bold text-white mb-2">Empieza a aprender</h1>
          <p className="text-slate-400 mb-8">Crea tu cuenta gratuita y empieza hoy.</p>

          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Jeremy"
                required
                minLength={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="input-field pr-12"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear cuenta gratis"
              )}
            </button>
          </form>

          <p className="text-slate-600 text-xs text-center mt-6 leading-relaxed">
            Al registrarte aceptas que TradeLingo AI es una plataforma educativa.
            No somos asesores financieros.
          </p>

          <p className="text-center text-slate-500 text-sm mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
