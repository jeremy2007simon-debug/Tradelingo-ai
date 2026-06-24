import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLevelFromXP, getXPProgressInLevel, getLevelTitle } from "@/lib/gamification/xp";
import type { UserStats, Module } from "@/types/database";

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const [statsRes, profileRes, modulesRes, progressRes, lessonCountRes] = await Promise.all([
    supabase.from("user_stats").select("*").eq("user_id", user.id).single(),
    supabase.from("profiles").select("username, avatar_url").eq("id", user.id).single(),
    supabase.from("modules").select("*").order("order_index"),
    supabase.from("user_lesson_progress").select("lesson_id, lessons(module_id)").eq("user_id", user.id).eq("completed", true),
    supabase.from("lessons").select("module_id"),
  ]);

  const stats = statsRes.data as UserStats | null;
  const profile = profileRes.data as { username: string | null; avatar_url: string | null } | null;
  const modules = (modulesRes.data ?? []) as Module[];
  const completedRows = (progressRes.data ?? []) as { lesson_id: number; lessons: { module_id: number } | null }[];
  const allLessons = (lessonCountRes.data ?? []) as { module_id: number }[];

  const totalXP = stats?.total_xp ?? 0;
  const level = getLevelFromXP(totalXP);
  const xpProgress = getXPProgressInLevel(totalXP);
  const levelTitle = getLevelTitle(level);

  const completedByModule: Record<number, number> = {};
  for (const p of completedRows) {
    const moduleId = p.lessons?.module_id;
    if (moduleId) completedByModule[moduleId] = (completedByModule[moduleId] ?? 0) + 1;
  }

  const totalByModule: Record<number, number> = {};
  for (const l of allLessons) {
    totalByModule[l.module_id] = (totalByModule[l.module_id] ?? 0) + 1;
  }

  const modulesWithProgress = modules.map((m) => ({
    ...m,
    completed_lessons: completedByModule[m.id] ?? 0,
    total_lessons: totalByModule[m.id] ?? 0,
    unlocked: totalXP >= m.required_xp,
  }));

  return NextResponse.json({
    profile,
    stats: {
      total_xp: totalXP,
      level,
      level_title: levelTitle,
      xp_current: xpProgress.current,
      xp_required: xpProgress.required,
      xp_percent: xpProgress.percent,
      streak_days: stats?.streak_days ?? 0,
      longest_streak: stats?.longest_streak ?? 0,
      last_activity: stats?.last_activity ?? null,
    },
    modules: modulesWithProgress,
  });
}
