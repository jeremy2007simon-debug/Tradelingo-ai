import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const moduleSlug = searchParams.get("module_slug");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // Devuelve las lecciones de un módulo por slug
  if (moduleSlug) {
    const { data: moduleData } = await supabase
      .from("modules")
      .select("id")
      .eq("slug", moduleSlug)
      .single();

    if (!moduleData) return NextResponse.json({ error: "Módulo no encontrado" }, { status: 404 });

    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, title, order_index, xp_reward")
      .eq("module_id", (moduleData as { id: number }).id)
      .order("order_index");

    return NextResponse.json({ lessons: lessons ?? [] });
  }

  // Devuelve una lección por ID
  if (!id) return NextResponse.json({ error: "Parámetro requerido: id o module_slug" }, { status: 400 });

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
