const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export interface TelegramUser {
  user_id: string;
  username: string | null;
  telegram_id: string;
  streak_days: number;
  notify_hour: number;
}

export async function sendTelegramMessage(
  chatId: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    const data = await res.json() as { ok: boolean; description?: string };
    return data.ok ? { ok: true } : { ok: false, error: data.description };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export function buildReminderMessage(username: string | null, streakDays: number): string {
  const name = username ?? "Trader";
  const streakText =
    streakDays === 0
      ? "Hoy puedes empezar una nueva racha 🔥"
      : streakDays === 1
      ? "Llevas 1 día de racha. ¡Sigue así! 🔥"
      : `Llevas *${streakDays} días* de racha. ¡No la rompas! 🔥`;

  return [
    `📈 *TradeLingo AI — Recordatorio diario*`,
    ``,
    `Hola *${name}*, hoy toca tu lección de trading.`,
    ``,
    streakText,
    ``,
    `👉 Abre la app y completa tu lección de hoy.`,
    ``,
    `_"El éxito en trading es consistencia, no suerte."_`,
    ``,
    `⚠️ _TradeLingo AI es educativo. No somos asesores financieros._`,
  ].join("\n");
}

export async function verifyTelegramChat(
  chatId: string
): Promise<{ ok: boolean; firstName?: string }> {
  try {
    const res = await fetch(`${TELEGRAM_API}/getChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId }),
    });
    const data = await res.json() as { ok: boolean; result?: { first_name?: string } };
    return { ok: data.ok, firstName: data.result?.first_name };
  } catch {
    return { ok: false };
  }
}
