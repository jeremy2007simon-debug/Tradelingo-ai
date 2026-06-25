"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle, AlertCircle, Send, Bell, User } from "lucide-react";

interface Settings {
  username: string;
  telegram_id: string;
  notify_hour: number;
}

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${i.toString().padStart(2, "0")}:00`,
}));

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({ username: "", telegram_id: "", notify_hour: 9 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d: { settings: Partial<Settings> }) => {
        setSettings({
          username: d.settings.username ?? "",
          telegram_id: d.settings.telegram_id ?? "",
          notify_hour: d.settings.notify_hour ?? 9,
        });
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    const data = await res.json() as { success?: boolean; error?: string };

    if (data.success) {
      setMessage({ type: "success", text: "Ajustes guardados correctamente." });
    } else {
      setMessage({ type: "error", text: data.error ?? "Error al guardar. Inténtalo de nuevo." });
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="text-brand-400 w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-6 animate-fade-in pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Ajustes</h1>
        <p className="text-slate-400 mt-1">Personaliza tu experiencia de aprendizaje.</p>
      </div>

      {message && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
          message.type === "success"
            ? "bg-success/10 border-success/30 text-success"
            : "bg-danger/10 border-danger/30 text-danger"
        }`}>
          {message.type === "success"
            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />
          }
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Perfil */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <User className="text-brand-400 w-5 h-5" />
            <h2 className="text-white font-semibold">Perfil</h2>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Nombre de usuario</label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => setSettings({ ...settings, username: e.target.value })}
              className="input-field"
              minLength={2}
              maxLength={30}
              placeholder="Tu nombre"
            />
          </div>
        </div>

        {/* Telegram */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Send className="text-brand-400 w-5 h-5" />
            <h2 className="text-white font-semibold">Recordatorios por Telegram</h2>
          </div>

          {/* Instrucciones */}
          <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-4 text-sm space-y-2">
            <p className="text-brand-300 font-medium">Cómo obtener tu Chat ID:</p>
            <ol className="text-slate-400 space-y-1.5 list-decimal list-inside">
              <li>
                Abre Telegram y busca{" "}
                <span className="text-brand-400 font-mono">@userinfobot</span>
              </li>
              <li>Pulsa <span className="text-white font-mono">/start</span></li>
              <li>El bot te responderá con tu <span className="text-white font-semibold">Id</span> (número)</li>
              <li>Pega ese número en el campo de abajo y guarda</li>
            </ol>
            <p className="text-slate-500 pt-1">
              Al guardar, recibirás un mensaje de confirmación de{" "}
              <span className="text-brand-400 font-mono">@TradeLingo_bot</span>.
            </p>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Tu Chat ID de Telegram</label>
            <input
              type="text"
              value={settings.telegram_id}
              onChange={(e) => setSettings({ ...settings, telegram_id: e.target.value })}
              className="input-field font-mono"
              placeholder="Ej: 123456789"
              pattern="\d*"
            />
            <p className="text-slate-600 text-xs mt-1.5">
              Solo números. Al guardar recibirás un mensaje de confirmación.
            </p>
          </div>
        </div>

        {/* Hora del recordatorio */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="text-brand-400 w-5 h-5" />
            <h2 className="text-white font-semibold">Hora del recordatorio</h2>
          </div>
          <p className="text-slate-400 text-sm">
            Recibirás un recordatorio diario a esta hora si no has estudiado todavía (hora UTC).
          </p>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Hora (UTC)</label>
            <select
              value={settings.notify_hour}
              onChange={(e) => setSettings({ ...settings, notify_hour: Number(e.target.value) })}
              className="input-field"
            >
              {HOURS.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
            <p className="text-slate-600 text-xs mt-1.5">
              España peninsular: UTC+1 (invierno) / UTC+2 (verano).
              Para las 9:00 AM en invierno, selecciona 08:00.
            </p>
          </div>
        </div>

        {/* Aviso legal */}
        <div className="card border-surface-border/50 bg-surface/50">
          <p className="text-slate-500 text-xs leading-relaxed">
            ⚠️ <strong className="text-slate-400">Aviso legal:</strong> TradeLingo AI es una plataforma
            educativa. No somos asesores financieros ni intermediarios regulados. El contenido de esta
            plataforma es exclusivamente educativo. El trading conlleva riesgo de pérdida de capital.
            Nunca inviertas dinero que no puedas permitirte perder.
          </p>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar ajustes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
