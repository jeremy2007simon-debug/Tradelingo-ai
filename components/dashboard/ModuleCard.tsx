"use client";

import Link from "next/link";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface ModuleCardProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  required_xp: number;
  completed_lessons: number;
  total_lessons: number;
  unlocked: boolean;
}

export default function ModuleCard({
  slug,
  title,
  icon,
  color,
  order_index,
  required_xp,
  completed_lessons,
  total_lessons,
  unlocked,
}: ModuleCardProps) {
  const percent = total_lessons > 0 ? Math.round((completed_lessons / total_lessons) * 100) : 0;
  const completed = percent === 100;

  const cardContent = (
    <div
      className={`card flex items-start gap-4 transition-all duration-200 group
        ${unlocked ? "hover:border-slate-500 cursor-pointer" : "opacity-50 cursor-not-allowed"}
        ${completed ? "border-success/40" : ""}
      `}
    >
      {/* Icono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${color}22` }}
      >
        {unlocked ? icon : <Lock className="text-slate-600 w-5 h-5" />}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-500 text-xs">Módulo {order_index}</span>
          {completed && <CheckCircle className="text-success w-4 h-4" />}
          {!completed && unlocked && (
            <ChevronRight className="text-slate-600 w-4 h-4 group-hover:text-slate-300 transition-colors" />
          )}
          {!unlocked && (
            <span className="text-xs text-slate-600">{required_xp} XP para desbloquear</span>
          )}
        </div>

        <h3 className="text-white font-semibold text-sm mb-2 truncate">{title}</h3>

        {unlocked && (
          <>
            <ProgressBar
              percent={percent}
              color={completed ? "bg-success" : "bg-brand-500"}
              height="h-1.5"
            />
            <p className="text-slate-500 text-xs mt-1">
              {completed_lessons}/{total_lessons} lecciones
            </p>
          </>
        )}
      </div>
    </div>
  );

  if (!unlocked) return cardContent;

  return (
    <Link href={`/modules/${slug}`} className="block">
      {cardContent}
    </Link>
  );
}
