import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyTelegramChat } from "@/lib/telegram/bot";
import { z } from "zod";

const SettingsSchema = z.object({
  username: z.string().min(2).max(30).optional(),
  telegram_id: z.string().regex(/^\d+$/, "El ID de Telegram debe ser numérico").optional().or(z.literal("")),
  notify_hour: z.number().int().min(0).max(23).optional(),
});

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data } = await supabase
    .from("profiles")
    .select("username, telegram_id, notify_hour")
    .eq("id", user.id)
    .single();

  return NextResponse.json({ settings: data ?? {} });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json();
  const parsed = SettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const updates = parsed.data;

  // Si cambia el telegram_id, verificamos que sea válido
  if (updates.telegram_id && updates.telegram_id !== "") {
    const { ok, firstName } = await verifyTelegramChat(updates.telegram_id);
    if (!ok) {
      return NextResponse.json(
        { error: "ID de Telegram no válido. Asegúrate de haber iniciado el bot primero." },
        { status: 400 }
      );
    }
    // Enviar mensaje de confirmación
    const { sendTelegramMessage } = await import("@/lib/telegram/bot");
    await sendTelegramMessage(
      updates.telegram_id,
      `✅ *TradeLingo AI conectado*\n\nHola ${firstName ?? ""}! Recibirás recordatorios diarios aquí.\n\n⚠️ _Plataforma educativa. No somos asesores financieros._`
    );
  }

  const updatePayload: Record<string, unknown> = {};
  if (updates.username !== undefined) updatePayload.username = updates.username;
  if (updates.telegram_id !== undefined) updatePayload.telegram_id = updates.telegram_id || null;
  if (updates.notify_hour !== undefined) updatePayload.notify_hour = updates.notify_hour;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as unknown as any)
    .from("profiles")
    .update(updatePayload)
    .eq("id", user.id);

  return NextResponse.json({ success: true });
}
