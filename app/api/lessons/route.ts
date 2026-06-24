import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*, modules(title, slug, icon, color)")
    .eq("id", id)
    .single();

  if (error || !lesson) return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 });

  const { data: progress } = await supabase
    .from("user_lesson_progress")
    .select("completed, score")
    .eq("user_id", user.id)
    .eq("lesson_id", id)
    .single();

  return NextResponse.json({ lesson, progress: progress ?? null });
}
