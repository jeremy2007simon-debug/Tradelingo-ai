"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setError("Error al enviar el email. Verifica la dirección e inténtalo de nuevo.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="card text-center max-w-md w-full animate-fade-in">
          <CheckCircle className="text-success w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Email enviado</h2>
          <p className="text-slate-400 mb-6">
            Si existe una cuenta con <strong className="text-white">{email}</strong>,
            recibirás un enlace para restablecer tu contraseña en breve.
          </p>
          <Link href="/login" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </Link>
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
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </Link>

          <h1 className="text-2xl font-bold text-white mb-2">Recuperar contraseña</h1>
          <p className="text-slate-400 mb-8">
            Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
