/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLevelFromXP, shouldUpdateStreak, BADGE_THRESHOLDS } from "@/lib/gamification/xp";
import type { UserStats } from "@/types/database";

interface Props {
  params: Promise<{ lessonId: string }>;
}

function db(supabase: any) {
  return supabase as {
    from: (table: string) => {
      upsert: (row: object, opts?: object) => Promise<{ error: unknown }>;
      insert: (row: object) => Promise<{ error: unknown }>;
      select: (cols: string) => {
        eq: (col: string, val: unknown) => {
          single: () => Promise<{ data: any; error: unknown }>;
          eq: (col: string, val: unknown) => { single: () => Promise<{ data: any; error: unknown }>; count?: unknown };
        };
        count?: unknown;
      };
    };
  };
}

export async function POST(req: NextRequest, { params }: Props) {
  const { lessonId } = await params;
  const { score } = (await req.json()) as { score: number };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: lessonRaw } = await supabase
    .from("lessons")
    .select("xp_reward, module_id")
    .eq("id", lessonId)
    .single();
  const lesson = lessonRaw as { xp_reward: number; module_id: number } | null;
  if (!lesson) return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 });

  const { data: existingRaw } = await supabase
    .from("user_lesson_progress")
    .select("completed")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .single();
  const alreadyCompleted = (existingRaw as { completed: boolean } | null)?.completed ?? false;

  await db(supabase).from("user_lesson_progress").upsert(
    { user_id: user.id, lesson_id: Number(lessonId), completed: true, score, completed_at: new Date().toISOString() },
    { onConflict: "user_id,lesson_id" }
  );

  if (alreadyCompleted) {
    const { data: statsRaw } = await supabase.from("user_stats").select("total_xp, level, streak_days").eq("user_id", user.id).single();
    const s = statsRaw as UserStats | null;
    return NextResponse.json({ xp_earned: 0, new_xp: s?.total_xp ?? 0, new_level: s?.level ?? 1, new_streak: s?.streak_days ?? 0, earned_badges: [], already_completed: true });
  }

  const { data: statsRaw } = await supabase.from("user_stats").select("*").eq("user_id", user.id).single();
  const stats = statsRaw as UserStats | null;

  const currentXP = stats?.total_xp ?? 0;
  const currentStreak = stats?.streak_days ?? 0;
  const newXP = currentXP + lesson.xp_reward;
  const newLevel = getLevelFromXP(newXP);
  const { newStreak: inc, reset } = shouldUpdateStreak(stats?.last_activity ?? null);
  const newStreak = inc === 0 ? currentStreak : (reset ? 1 : currentStreak + 1);
  const newLongest = Math.max(stats?.longest_streak ?? 0, newStreak);

  await db(supabase).from("user_stats").upsert(
    { user_id: user.id, total_xp: newXP, level: newLevel, streak_days: newStreak, last_activity: new Date().toISOString().split("T")[0], longest_streak: newLongest },
    { onConflict: "user_id" }
  );

  const earnedBadges: { slug: string; title: string; icon: string }[] = [];

  const { count } = await supabase
    .from("user_lesson_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("completed", true);

  if (count === 1) {
    const b = await awardBadge(supabase, user.id, "primera-leccion");
    if (b) earnedBadges.push(b);
  }

  for (const t of BADGE_THRESHOLDS.streak) {
    if (newStreak >= t) {
      const b = await awardBadge(supabase, user.id, `racha-${t}`);
      if (b) earnedBadges.push(b);
    }
  }

  for (const t of BADGE_THRESHOLDS.levels) {
    if (newLevel >= t) {
      const b = await awardBadge(supabase, user.id, `nivel-${t}`);
      if (b) earnedBadges.push(b);
    }
  }

  // Verificar si el módulo completo fue terminado
  const { data: moduleLessonsRaw } = await supabase
    .from("lessons")
    .select("id")
    .eq("module_id", lesson.module_id);
  const moduleLessonIds = ((moduleLessonsRaw ?? []) as { id: number }[]).map((l) => l.id);

  if (moduleLessonIds.length > 0) {
    const { count: completedCount } = await supabase
      .from("user_lesson_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("completed", true)
      .in("lesson_id", moduleLessonIds);

    if (completedCount === moduleLessonIds.length) {
      const { data: moduleRaw } = await supabase.from("modules").select("slug").eq("id", lesson.module_id).single();
      const moduleSlug = (moduleRaw as { slug: string } | null)?.slug;
      if (moduleSlug) {
        const MODULE_BADGE_MAP: Record<string, string> = {
          "fundamentos":         "modulo-1",
          "tipos-activos":       "modulo-2",
          "velas-japonesas":     "modulo-3",
          "tendencias":          "modulo-4",
          "soporte-resistencia": "modulo-5",
          "gestion-riesgo":      "modulo-riesgo",
          "psicologia":          "modulo-7",
          "backtesting":         "modulo-8",
          "cuenta-demo":         "modulo-9",
          "estrategia":          "modulo-10",
        };
        const badgeSlug = MODULE_BADGE_MAP[moduleSlug];
        if (badgeSlug) {
          const b = await awardBadge(supabase, user.id, badgeSlug);
          if (b) earnedBadges.push(b);
        }
      }

      // Verificar si TODOS los módulos están completos → badge "maestro"
      const { data: allModulesRaw } = await supabase.from("modules").select("id");
      const allModuleIds = ((allModulesRaw ?? []) as { id: number }[]).map((m) => m.id);
      const { data: allModuleLessonsRaw } = await supabase.from("lessons").select("id").in("module_id", allModuleIds);
      const allLessonIds = ((allModuleLessonsRaw ?? []) as { id: number }[]).map((l) => l.id);
      if (allLessonIds.length > 0) {
        const { count: totalCompleted } = await supabase
          .from("user_lesson_progress")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", true)
          .in("lesson_id", allLessonIds);
        if (totalCompleted === allLessonIds.length) {
          const b = await awardBadge(supabase, user.id, "maestro");
          if (b) earnedBadges.push(b);
        }
      }
    }
  }

  return NextResponse.json({
    xp_earned: lesson.xp_reward,
    new_xp: newXP,
    new_level: newLevel,
    new_streak: newStreak,
    earned_badges: earnedBadges,
    already_completed: false,
  });
}

async function awardBadge(
  supabase: any,
  userId: string,
  slug: string
): Promise<{ slug: string; title: string; icon: string } | null> {
  const { data: badgeRaw } = await supabase.from("badges").select("id, title, icon").eq("slug", slug).single();
  const badge = badgeRaw as { id: number; title: string; icon: string } | null;
  if (!badge) return null;

  const { data: existing } = await supabase.from("user_badges").select("badge_id").eq("user_id", userId).eq("badge_id", badge.id).single();
  if (existing) return null;

  await db(supabase).from("user_badges").insert({ user_id: userId, badge_id: badge.id });
  return { slug, title: badge.title, icon: badge.icon };
}
