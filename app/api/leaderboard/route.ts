import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLevelFromXP, getLevelTitle } from "@/lib/gamification/xp";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: rowsRaw } = await supabase
    .from("user_stats")
    .select("user_id, total_xp, level, streak_days, profiles(username)")
    .order("total_xp", { ascending: false })
    .limit(50);

  const rows = (rowsRaw ?? []) as {
    user_id: string;
    total_xp: number;
    level: number;
    streak_days: number;
    profiles: { username: string | null } | null;
  }[];

  const leaderboard = rows.map((r, idx) => ({
    rank: idx + 1,
    user_id: r.user_id,
    username: r.profiles?.username ?? "Trader Anónimo",
    total_xp: r.total_xp,
    level: getLevelFromXP(r.total_xp),
    level_title: getLevelTitle(getLevelFromXP(r.total_xp)),
    streak_days: r.streak_days,
    is_me: r.user_id === user.id,
  }));

  return NextResponse.json({ leaderboard });
}
