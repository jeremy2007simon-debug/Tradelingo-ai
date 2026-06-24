"use client";

import { useEffect, useState } from "react";
import { Zap, Flame, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

interface SummaryStepProps {
  summary: string;
  xpEarned: number;
  newXP: number;
  newLevel: number;
  newStreak: number;
  quizScore: number;
  moduleSlug: string;
  nextLessonId: number | null;
  earnedBadges: string[];
  alreadyCompleted: boolean;
}

export default function SummaryStep({
  summary,
  xpEarned,
  newXP,
  newLevel,
  newStreak,
  quizScore,
  moduleSlug,
  nextLessonId,
  earnedBadges,
  alreadyCompleted,
}: SummaryStepProps) {
  const [showXP, setShowXP] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowXP(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Recompensa XP */}
      {!alreadyCompleted && (
        <div className={`card border-xp/30 bg-xp/5 text-center transition-all duration-500 ${showXP ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-xp/20 mb-3 mx-auto animate-xp-pop">
            <Zap className="text-xp w-8 h-8" />
          </div>
          <p className="text-xp font-bold text-3xl mb-1">+{xpEarned} XP</p>
          <p className="text-slate-400 text-sm">¡Lección completada!</p>
          <p className="text-slate-500 text-xs mt-1">Total acumulado: {newXP.toLocaleString()} XP</p>
        </div>
      )}

      {alreadyCompleted && (
        <div className="card border-slate-600/30 text-center">
          <RotateCcw className="text-slate-500 w-8 h-8 mx-auto mb-2" />
          <p className="text-slate-300 font-semibold">Lección repasada</p>
          <p className="text-slate-500 text-sm">Ya habías completado esta lección. El XP solo se otorga la primera vez.</p>
        </div>
      )}

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center p-3">
          <p className="text-slate-500 text-xs mb-1">Puntuación</p>
          <p className={`font-bold text-xl ${quizScore >= 70 ? "text-success" : "text-xp"}`}>{quizScore}%</p>
        </div>
        <div className="card text-center p-3">
          <p className="text-slate-500 text-xs mb-1">Nivel</p>
          <p className="text-brand-400 font-bold text-xl">{newLevel}</p>
        </div>
        <div className="card text-center p-3">
          <p className="text-slate-500 text-xs mb-1">Racha</p>
          <div className="flex items-center justify-center gap-1">
            <Flame className="text-orange-400 w-4 h-4" />
            <p className="text-orange-400 font-bold text-xl">{newStreak}</p>
          </div>
        </div>
      </div>

      {/* Insignias ganadas */}
      {earnedBadges.length > 0 && (
        <div className="card border-brand-600/30">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="text-xp w-5 h-5" />
            <span className="text-white font-semibold">¡Insignia{earnedBadges.length > 1 ? "s" : ""} obtenida{earnedBadges.length > 1 ? "s" : ""}!</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((slug) => (
              <span key={slug} className="bg-xp/10 border border-xp/30 text-xp text-xs font-medium px-3 py-1.5 rounded-full">
                🏆 {slug.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resumen */}
      <div className="card">
        <h3 className="text-white font-semibold mb-3">Resumen de la lección</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Navegación */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/modules/${moduleSlug}`} className="btn-secondary flex-1 text-center">
          Volver al módulo
        </Link>
        {nextLessonId && (
          <Link href={`/lesson/${nextLessonId}`} className="btn-primary flex-1 flex items-center justify-center gap-2">
            Siguiente lección
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
