import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendTelegramMessage, buildReminderMessage } from "@/lib/telegram/bot";

// Vercel Cron llama con GET. También acepta POST para llamadas manuales.
async function handleNotifications(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET ?? "tradelingo-cron-secret";

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const currentHour = new Date().getUTCHours();

  const supabase = await createServiceClient();

  // Obtener usuarios que tengan Telegram configurado y cuya hora coincida
  const { data: usersRaw } = await supabase
    .from("profiles")
    .select("id, username, telegram_id, notify_hour")
    .not("telegram_id", "is", null)
    .eq("notify_hour", currentHour);

  const users = (usersRaw ?? []) as {
    id: string;
    username: string | null;
    telegram_id: string;
    notify_hour: number;
  }[];

  if (!users.length) {
    return NextResponse.json({ sent: 0, message: "No hay usuarios para notificar esta hora" });
  }

  // Obtener stats de racha de esos usuarios
  const userIds = users.map((u) => u.id);
  const { data: statsRaw } = await supabase
    .from("user_stats")
    .select("user_id, streak_days, last_activity")
    .in("user_id", userIds);

  const statsMap: Record<string, { streak_days: number; last_activity: string | null }> = {};
  for (const s of (statsRaw ?? []) as { user_id: string; streak_days: number; last_activity: string | null }[]) {
    statsMap[s.user_id] = s;
  }

  const results = { sent: 0, failed: 0, skipped: 0 };

  for (const user of users) {
    const stats = statsMap[user.id];
    const lastActivity = stats?.last_activity ?? null;

    // No mandar si ya estudió hoy
    if (lastActivity) {
      const today = new Date().toISOString().split("T")[0];
      if (lastActivity === today) {
        results.skipped++;
        continue;
      }
    }

    const message = buildReminderMessage(user.username, stats?.streak_days ?? 0);
    const { ok } = await sendTelegramMessage(user.telegram_id, message);

    // Guardar log
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as unknown as any).from("notification_log").insert({
      user_id: user.id,
      channel: "telegram",
      status: ok ? "sent" : "failed",
    });

    if (ok) results.sent++;
    else results.failed++;
  }

  return NextResponse.json(results);
}

// Vercel Cron llama con GET — ejecuta las notificaciones directamente
export async function GET(req: NextRequest) {
  return handleNotifications(req);
}

// POST para llamadas manuales con Authorization header
export async function POST(req: NextRequest) {
  return handleNotifications(req);
}
