import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Circle, Lock, ArrowLeft, Zap } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Module, Lesson, UserStats } from "@/types/database";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ModuleDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [moduleRes, statsRes] = await Promise.all([
    supabase.from("modules").select("*").eq("slug", slug).single(),
    supabase.from("user_stats").select("total_xp").eq("user_id", user.id).single(),
  ]);

  const moduleData = moduleRes.data as Module | null;
  if (!moduleData) notFound();

  const module = moduleData;
  const totalXP = ((statsRes.data as UserStats | null)?.total_xp) ?? 0;
  const unlocked = totalXP >= module.required_xp;

  if (!unlocked) redirect("/modules");

  const [lessonsRes, progressRes] = await Promise.all([
    supabase.from("lessons").select("id, title, order_index, xp_reward").eq("module_id", module.id).order("order_index"),
    supabase.from("user_lesson_progress").select("lesson_id, completed, score").eq("user_id", user.id),
  ]);

  const lessons = (lessonsRes.data ?? []) as Pick<Lesson, "id" | "title" | "order_index" | "xp_reward">[];
  const progressMap: Record<number, { completed: boolean; score: number }> = {};
  for (const p of (progressRes.data ?? []) as { lesson_id: number; completed: boolean; score: number }[]) {
    progressMap[p.lesson_id] = { completed: p.completed, score: p.score };
  }

  const completedCount = lessons.filter((l) => progressMap[l.id]?.completed).length;
  const percent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  // Primera lección no completada
  const nextLesson = lessons.find((l) => !progressMap[l.id]?.completed);

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 max-w-2xl">
      {/* Volver */}
      <Link href="/modules" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver a módulos
      </Link>

      {/* Cabecera del módulo */}
      <div className="card" style={{ borderColor: `${module.color}44` }}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0" style={{ backgroundColor: `${module.color}22` }}>
            {module.icon}
          </div>
          <div className="flex-1">
            <p className="text-slate-500 text-sm mb-1">Módulo {module.order_index}</p>
            <h1 className="text-white font-bold text-xl mb-1">{module.title}</h1>
            <p className="text-slate-400 text-sm mb-4">{module.description}</p>
            <div className="flex items-center gap-3">
              <ProgressBar percent={percent} height="h-2" />
              <span className="text-slate-500 text-xs flex-shrink-0">{completedCount}/{lessons.length} lecciones</span>
            </div>
          </div>
        </div>

        {nextLesson && (
          <div className="mt-4 pt-4 border-t border-surface-border">
            <Link href={`/lesson/${nextLesson.id}`} className="btn-primary w-full text-center block">
              {completedCount === 0 ? "Empezar módulo" : "Continuar"}
            </Link>
          </div>
        )}

        {percent === 100 && (
          <div className="mt-4 pt-4 border-t border-surface-border flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Módulo completado</span>
          </div>
        )}
      </div>

      {/* Lista de lecciones */}
      <div>
        <h2 className="text-white font-semibold mb-3">Lecciones</h2>
        <div className="space-y-2">
          {lessons.map((lesson, idx) => {
            const progress = progressMap[lesson.id];
            const done = progress?.completed ?? false;
            const isNext = lesson.id === nextLesson?.id;
            const locked = !done && idx > 0 && !progressMap[lessons[idx - 1]?.id]?.completed;

            return (
              <div key={lesson.id}>
                {!locked ? (
                  <Link href={`/lesson/${lesson.id}`}>
                    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                      ${done ? "bg-success/5 border-success/20" : isNext ? "bg-brand-600/10 border-brand-600/30 hover:border-brand-500" : "border-surface-border hover:border-slate-500"}
                    `}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${done ? "bg-success/20" : isNext ? "bg-brand-600/20" : "bg-surface-border"}
                      `}>
                        {done
                          ? <CheckCircle className="text-success w-4 h-4" />
                          : <Circle className={`w-4 h-4 ${isNext ? "text-brand-400" : "text-slate-500"}`} />
                        }
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${done ? "text-slate-300" : isNext ? "text-white" : "text-slate-400"}`}>
                          {lesson.order_index}. {lesson.title}
                        </p>
                        {done && progress?.score > 0 && (
                          <p className="text-slate-500 text-xs mt-0.5">Puntuación: {progress.score}%</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xp text-xs font-bold flex-shrink-0">
                        <Zap className="w-3 h-3" />
                        {lesson.xp_reward} XP
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-surface-border opacity-40 cursor-not-allowed">
                    <div className="w-8 h-8 rounded-full bg-surface-border flex items-center justify-center flex-shrink-0">
                      <Lock className="text-slate-600 w-4 h-4" />
                    </div>
                    <p className="text-slate-500 text-sm">{lesson.order_index}. {lesson.title}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
