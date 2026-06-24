"use client";

import { Flame, Star, Zap } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface StatsBarProps {
  level: number;
  levelTitle: string;
  totalXP: number;
  xpCurrent: number;
  xpRequired: number;
  xpPercent: number;
  streakDays: number;
}

export default function StatsBar({
  level,
  levelTitle,
  totalXP,
  xpCurrent,
  xpRequired,
  xpPercent,
  streakDays,
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Nivel */}
      <div className="card flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
          <Star className="text-brand-400 w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-400 text-sm">Nivel {level}</span>
            <span className="text-xs text-slate-500">{xpCurrent}/{xpRequired} XP</span>
          </div>
          <p className="text-white font-semibold text-sm mb-2">{levelTitle}</p>
          <ProgressBar percent={xpPercent} color="bg-brand-500" height="h-2" />
        </div>
      </div>

      {/* XP Total */}
      <div className="card flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-xp/20 flex items-center justify-center flex-shrink-0">
          <Zap className="text-xp w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-400 text-sm">XP Total</p>
          <p className="text-white font-bold text-2xl">{totalXP.toLocaleString()}</p>
          <p className="text-slate-500 text-xs">puntos de experiencia</p>
        </div>
      </div>

      {/* Racha */}
      <div className="card flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            streakDays > 0 ? "bg-orange-500/20 animate-streak-glow" : "bg-surface-border"
          }`}
        >
          <Flame className={`w-6 h-6 ${streakDays > 0 ? "text-orange-400" : "text-slate-600"}`} />
        </div>
        <div>
          <p className="text-slate-400 text-sm">Racha actual</p>
          <p className={`font-bold text-2xl ${streakDays > 0 ? "text-orange-400" : "text-slate-500"}`}>
            {streakDays} {streakDays === 1 ? "día" : "días"}
          </p>
          <p className="text-slate-500 text-xs">
            {streakDays === 0 ? "Estudia hoy para empezar" : "¡Sigue así!"}
          </p>
        </div>
      </div>
    </div>
  );
}
