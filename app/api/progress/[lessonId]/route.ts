/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLevelFromXP, shouldUpdateStreak, BADGE_THRESHOLDS } from "@/lib/gamification/xp";
import type { UserStats } from "@/types/database";

interface Props {
  params: Promise<{ lessonId: string }>;
}

// El SDK de Supabase con claves sb_publishable no infiere tipos en writes correctamente.
// Usamos un helper tipado-as-any solo para operaciones de escritura.
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

  const earnedBadges: string[] = [];

  const { count } = await supabase
    .from("user_lesson_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("completed", true);

  if (count === 1 && await awardBadge(supabase, user.id, "primera-leccion")) earnedBadges.push("primera-leccion");

  for (const t of BADGE_THRESHOLDS.streak) {
    if (newStreak >= t && await awardBadge(supabase, user.id, `racha-${t}`)) earnedBadges.push(`racha-${t}`);
  }
  for (const t of BADGE_THRESHOLDS.levels) {
    if (newLevel >= t && await awardBadge(supabase, user.id, `nivel-${t}`)) earnedBadges.push(`nivel-${t}`);
  }

  return NextResponse.json({ xp_earned: lesson.xp_reward, new_xp: newXP, new_level: newLevel, new_streak: newStreak, earned_badges: earnedBadges, already_completed: false });
}

async function awardBadge(supabase: any, userId: string, slug: string): Promise<boolean> {
  const { data: badgeRaw } = await supabase.from("badges").select("id").eq("slug", slug).single();
  const badge = badgeRaw as { id: number } | null;
  if (!badge) return false;

  const { data: existing } = await supabase.from("user_badges").select("badge_id").eq("user_id", userId).eq("badge_id", badge.id).single();
  if (existing) return false;

  await db(supabase).from("user_badges").insert({ user_id: userId, badge_id: badge.id });
  return true;
}
