import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen, Flame } from "lucide-react";
import { getLevelFromXP, getXPProgressInLevel, getLevelTitle } from "@/lib/gamification/xp";
import StatsBar from "@/components/dashboard/StatsBar";
import ModuleCard from "@/components/dashboard/ModuleCard";
import type { UserStats, Module } from "@/types/database";

interface ModuleWithProgress extends Module {
  completed_lessons: number;
  total_lessons: number;
  unlocked: boolean;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [statsRes, profileRes, modulesRes, progressRes, lessonCountRes] = await Promise.all([
    supabase.from("user_stats").select("*").eq("user_id", user.id).single(),
    supabase.from("profiles").select("username").eq("id", user.id).single(),
    supabase.from("modules").select("*").order("order_index"),
    supabase.from("user_lesson_progress").select("lesson_id, lessons(module_id)").eq("user_id", user.id).eq("completed", true),
    supabase.from("lessons").select("module_id"),
  ]);

  const stats = statsRes.data as UserStats | null;
  const username = (profileRes.data as { username: string | null } | null)?.username ?? "Trader";
  const modules = (modulesRes.data ?? []) as Module[];
  const completedRows = (progressRes.data ?? []) as { lesson_id: number; lessons: { module_id: number } | null }[];
  const allLessons = (lessonCountRes.data ?? []) as { module_id: number }[];

  const totalXP = stats?.total_xp ?? 0;
  const level = getLevelFromXP(totalXP);
  const xpProgress = getXPProgressInLevel(totalXP);
  const levelTitle = getLevelTitle(level);
  const streakDays = stats?.streak_days ?? 0;

  const completedByModule: Record<number, number> = {};
  for (const p of completedRows) {
    const moduleId = p.lessons?.module_id;
    if (moduleId) completedByModule[moduleId] = (completedByModule[moduleId] ?? 0) + 1;
  }

  const totalByModule: Record<number, number> = {};
  for (const l of allLessons) {
    totalByModule[l.module_id] = (totalByModule[l.module_id] ?? 0) + 1;
  }

  const modulesWithProgress: ModuleWithProgress[] = modules.map((m) => ({
    ...m,
    completed_lessons: completedByModule[m.id] ?? 0,
    total_lessons: totalByModule[m.id] ?? 0,
    unlocked: totalXP >= m.required_xp,
  }));

  const activeModule = modulesWithProgress.find(
    (m) => m.unlocked && m.completed_lessons < m.total_lessons
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="space-y-8 animate-fade-in pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {greeting}, <span className="text-brand-400">{username}</span> 👋
        </h1>
        <p className="text-slate-400 mt-1">
          {streakDays > 0
            ? `Llevas ${streakDays} ${streakDays === 1 ? "día" : "días"} de racha. ¡No lo pierdas!`
            : "Empieza tu primera lección de hoy."}
        </p>
      </div>

      <StatsBar
        level={level}
        levelTitle={levelTitle}
        totalXP={totalXP}
        xpCurrent={xpProgress.current}
        xpRequired={xpProgress.required}
        xpPercent={xpProgress.percent}
        streakDays={streakDays}
      />

      {activeModule && (
        <div className="card border-brand-600/40 bg-gradient-to-r from-brand-900/40 to-surface-card">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-600/30 flex items-center justify-center text-2xl">
                {activeModule.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="text-brand-400 w-4 h-4" />
                  <span className="text-brand-400 text-sm font-medium">Continúa aprendiendo</span>
                </div>
                <h2 className="text-white font-bold text-lg">{activeModule.title}</h2>
                <p className="text-slate-400 text-sm">
                  {activeModule.completed_lessons}/{activeModule.total_lessons} lecciones completadas
                </p>
              </div>
            </div>
            <Link href={`/modules/${activeModule.slug}`} className="btn-primary flex items-center gap-2">
              Continuar
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {streakDays === 0 && (
        <div className="card border-orange-500/20 bg-orange-500/5 flex items-center gap-4">
          <Flame className="text-orange-400 w-8 h-8 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">Empieza tu racha hoy</p>
            <p className="text-slate-400 text-sm">
              Completa al menos una lección para comenzar tu racha diaria.
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-white font-bold text-xl mb-4">Curso completo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modulesWithProgress.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
