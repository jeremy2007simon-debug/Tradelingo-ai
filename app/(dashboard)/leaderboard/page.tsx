import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Trophy, Flame, Zap, Medal, TrendingUp } from "lucide-react";
import { getLevelTitle, getLevelFromXP } from "@/lib/gamification/xp";

interface LeaderboardEntry {
  user_id: string;
  total_xp: number;
  level: number;
  streak_days: number;
  profiles: { username: string | null } | null;
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: rowsRaw } = await supabase
    .from("user_stats")
    .select("user_id, total_xp, level, streak_days, profiles(username)")
    .order("total_xp", { ascending: false })
    .limit(50);

  const rows = (rowsRaw ?? []) as LeaderboardEntry[];

  const currentUserRank = rows.findIndex((r) => r.user_id === user.id) + 1;

  function getMedalIcon(rank: number) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-xp/20 flex items-center justify-center">
          <Trophy className="text-xp w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Clasificación</h1>
          <p className="text-slate-400 text-sm">Los traders más dedicados de TradeLingo AI</p>
        </div>
      </div>

      {/* Tu posición */}
      {currentUserRank > 0 && (
        <div className="card border-brand-600/30 bg-brand-600/5 flex items-center gap-4">
          <Medal className="text-brand-400 w-6 h-6 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">Tu posición actual</p>
            <p className="text-brand-400 font-bold text-xl">#{currentUserRank}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-slate-400 text-xs">de {rows.length} traders</p>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="card text-center py-12">
          <TrendingUp className="text-slate-600 w-12 h-12 mx-auto mb-3" />
          <p className="text-slate-400">Sé el primero en completar lecciones.</p>
          <p className="text-slate-500 text-sm mt-1">¡Empieza tu primera lección ahora!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((entry, idx) => {
            const rank = idx + 1;
            const medal = getMedalIcon(rank);
            const isMe = entry.user_id === user.id;
            const levelTitle = getLevelTitle(getLevelFromXP(entry.total_xp));

            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isMe
                    ? "bg-brand-600/10 border-brand-600/30"
                    : rank <= 3
                    ? "bg-xp/5 border-xp/20"
                    : "bg-surface-card border-surface-border"
                }`}
              >
                {/* Posición */}
                <div className="w-10 text-center flex-shrink-0">
                  {medal ? (
                    <span className="text-2xl">{medal}</span>
                  ) : (
                    <span className={`font-bold text-sm ${isMe ? "text-brand-400" : "text-slate-500"}`}>
                      #{rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  isMe ? "bg-brand-600/30 text-brand-400" : "bg-surface-border text-slate-400"
                }`}>
                  {(entry.profiles?.username ?? "T")[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm truncate ${isMe ? "text-white" : "text-slate-200"}`}>
                      {entry.profiles?.username ?? "Trader Anónimo"}
                    </p>
                    {isMe && (
                      <span className="text-xs text-brand-400 font-medium bg-brand-600/20 px-2 py-0.5 rounded-full flex-shrink-0">
                        Tú
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs">{levelTitle} · Nivel {entry.level}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {entry.streak_days > 0 && (
                    <div className="flex items-center gap-1 text-orange-400 text-xs">
                      <Flame className="w-3 h-3" />
                      <span>{entry.streak_days}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xp text-sm font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{entry.total_xp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-slate-600 text-xs text-center pb-2">
        Clasificación actualizada en tiempo real · Gana XP completando lecciones
      </p>
    </div>
  );
}
