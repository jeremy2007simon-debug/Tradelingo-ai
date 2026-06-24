import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { streamMentorResponse } from "@/lib/ai/claude";
import type { ChatMessage } from "@/lib/ai/claude";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { messages, conversationId, moduleContext } = (await req.json()) as {
    messages: ChatMessage[];
    conversationId: string | null;
    moduleContext?: string;
  };

  if (!messages.length) {
    return NextResponse.json({ error: "Mensajes requeridos" }, { status: 400 });
  }

  // Limitar historial a los últimos 20 mensajes para no exceder tokens
  const trimmedMessages = messages.slice(-20);

  try {
    const stream = await streamMentorResponse(trimmedMessages, moduleContext);

    // Guardar conversación en background (sin bloquear el stream)
    saveConversation(supabase, user.id, messages, conversationId).catch(console.error);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error llamando a Claude:", error);
    return NextResponse.json({ error: "Error del profesor IA. Inténtalo de nuevo." }, { status: 500 });
  }
}

async function saveConversation(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  userId: string,
  messages: ChatMessage[],
  conversationId: string | null
) {
  const messagesWithTimestamp = messages.map((m) => ({
    ...m,
    timestamp: new Date().toISOString(),
  }));

  if (conversationId) {
    await (supabase as unknown as any)
      .from("ai_conversations")
      .update({ messages: messagesWithTimestamp, updated_at: new Date().toISOString() })
      .eq("id", conversationId)
      .eq("user_id", userId);
  } else {
    await (supabase as unknown as any)
      .from("ai_conversations")
      .insert({ user_id: userId, messages: messagesWithTimestamp });
  }
}
