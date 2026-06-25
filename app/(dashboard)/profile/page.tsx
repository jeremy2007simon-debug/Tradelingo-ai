import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getLevelFromXP, getLevelTitle, getXPProgressInLevel } from "@/lib/gamification/xp";
import { Flame, Zap, Trophy, BookOpen, Star, TrendingUp } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import type { UserStats, Badge } from "@/types/database";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profileRes, statsRes, badgesRes, progressRes] = await Promise.all([
    supabase.from("profiles").select("username, avatar_url, created_at").eq("id", user.id).single(),
    supabase.from("user_stats").select("*").eq("user_id", user.id).single(),
    supabase.from("user_badges").select("earned_at, badges(id, slug, title, description, icon)").eq("user_id", user.id).order("earned_at", { ascending: false }),
    supabase.from("user_lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
  ]);

  const profile = profileRes.data as { username: string | null; avatar_url: string | null; created_at: string } | null;
  const stats = statsRes.data as UserStats | null;
  const earnedBadges = (badgesRes.data ?? []) as { earned_at: string; badges: Badge | null }[];
  const completedLessons = (progressRes.data ?? []).length;

  const totalXP = stats?.total_xp ?? 0;
  const level = getLevelFromXP(totalXP);
  const levelTitle = getLevelTitle(level);
  const xpProgress = getXPProgressInLevel(totalXP);
  const streakDays = stats?.streak_days ?? 0;
  const longestStreak = stats?.longest_streak ?? 0;

  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "long" })
    : null;

  // Badges de todos los disponibles para mostrar los no ganados como bloqueados
  const { data: allBadgesRaw } = await supabase.from("badges").select("*").order("id");
  const allBadges = (allBadgesRaw ?? []) as Badge[];
  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.badges?.id).filter(Boolean));

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 max-w-2xl">
      {/* Tarjeta principal del perfil */}
      <div className="card">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="text-brand-400 w-8 h-8" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{profile?.username ?? "Trader"}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="level-badge">Nivel {level} · {levelTitle}</span>
              {streakDays > 0 && (
                <span className="streak-badge">🔥 {streakDays} días de racha</span>
              )}
            </div>
            {joinDate && <p className="text-slate-500 text-xs mt-2">Estudiando desde {joinDate}</p>}
          </div>
        </div>

        {/* XP Progress */}
        <div className="mt-5 pt-5 border-t border-surface-border">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">Progreso al nivel {level + 1}</span>
            <span className="text-xp font-bold">{xpProgress.current} / {xpProgress.required} XP</span>
          </div>
          <ProgressBar percent={xpProgress.percent} color="bg-xp" height="h-3" showLabel />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Zap, label: "XP Total", value: totalXP.toLocaleString(), color: "text-xp", bg: "bg-xp/10" },
          { icon: Flame, label: "Racha máx.", value: `${longestStreak}d`, color: "text-orange-400", bg: "bg-orange-500/10" },
          { icon: BookOpen, label: "Lecciones", value: completedLessons, color: "text-brand-400", bg: "bg-brand-600/10" },
          { icon: Trophy, label: "Insignias", value: earnedBadges.length, color: "text-success", bg: "bg-success/10" },
        ].map((stat) => (
          <div key={stat.label} className="card text-center p-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`${stat.color} w-5 h-5`} />
            </div>
            <p className={`font-bold text-xl ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Nivel actual detallado */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-brand-400 w-5 h-5" />
          <h2 className="text-white font-semibold">Sistema de niveles</h2>
        </div>
        <div className="space-y-2 text-sm">
          {[
            { range: "1-2", title: "Principiante", xp: "0 XP" },
            { range: "3-4", title: "Aprendiz", xp: "300 XP" },
            { range: "5-7", title: "Intermedio", xp: "1.000 XP" },
            { range: "8-11", title: "Avanzado", xp: "3.600 XP" },
            { range: "12-15", title: "Experto", xp: "7.800 XP" },
            { range: "16+", title: "Maestro / Leyenda", xp: "14.000+ XP" },
          ].map((l) => (
            <div key={l.range} className={`flex items-center justify-between px-3 py-2 rounded-lg ${level >= parseInt(l.range) ? "bg-brand-600/10 border border-brand-600/20" : "opacity-40"}`}>
              <span className="text-slate-300">Nivel {l.range} — <span className="text-white font-medium">{l.title}</span></span>
              <span className="text-slate-500 text-xs">{l.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insignias */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-xp w-5 h-5" />
          <h2 className="text-white font-semibold">Insignias ({earnedBadges.length}/{allBadges.length})</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allBadges.map((badge) => {
            const earned = earnedBadgeIds.has(badge.id);
            const earnedData = earnedBadges.find((b) => b.badges?.id === badge.id);
            return (
              <div
                key={badge.id}
                className={`card p-4 text-center transition-all ${earned ? "border-xp/30 bg-xp/5" : "opacity-30"}`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className={`font-semibold text-sm ${earned ? "text-white" : "text-slate-500"}`}>{badge.title}</p>
                <p className="text-slate-500 text-xs mt-1">{badge.description}</p>
                {earned && earnedData && (
                  <p className="text-xp text-xs mt-2">
                    {new Date(earnedData.earned_at).toLocaleDateString("es-ES")}
                  </p>
                )}
                {!earned && <p className="text-slate-600 text-xs mt-2">🔒 Bloqueada</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
