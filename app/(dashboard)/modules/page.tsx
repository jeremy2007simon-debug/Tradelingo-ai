import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Module, UserStats } from "@/types/database";

export default async function ModulesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [modulesRes, statsRes, progressRes, lessonCountRes] = await Promise.all([
    supabase.from("modules").select("*").order("order_index"),
    supabase.from("user_stats").select("total_xp").eq("user_id", user.id).single(),
    supabase.from("user_lesson_progress").select("lessons(module_id)").eq("user_id", user.id).eq("completed", true),
    supabase.from("lessons").select("module_id"),
  ]);

  const modules = (modulesRes.data ?? []) as Module[];
  const totalXP = ((statsRes.data as UserStats | null)?.total_xp) ?? 0;
  const completedRows = (progressRes.data ?? []) as { lessons: { module_id: number } | null }[];
  const allLessons = (lessonCountRes.data ?? []) as { module_id: number }[];

  const completedByModule: Record<number, number> = {};
  for (const p of completedRows) {
    const mid = p.lessons?.module_id;
    if (mid) completedByModule[mid] = (completedByModule[mid] ?? 0) + 1;
  }
  const totalByModule: Record<number, number> = {};
  for (const l of allLessons) {
    totalByModule[l.module_id] = (totalByModule[l.module_id] ?? 0) + 1;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Módulos del curso</h1>
        <p className="text-slate-400 mt-1">10 módulos para convertirte en trader informado.</p>
      </div>

      <div className="space-y-3">
        {modules.map((m) => {
          const completed = completedByModule[m.id] ?? 0;
          const total = totalByModule[m.id] ?? 0;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          const unlocked = totalXP >= m.required_xp;
          const done = percent === 100;

          return (
            <div key={m.id}>
              {unlocked ? (
                <Link href={`/modules/${m.slug}`}>
                  <div className={`card flex items-center gap-4 hover:border-slate-500 transition-colors group cursor-pointer ${done ? "border-success/30" : ""}`}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: `${m.color}22` }}>
                      {m.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-500 text-xs">Módulo {m.order_index}</span>
                        {done
                          ? <CheckCircle className="text-success w-4 h-4" />
                          : <ChevronRight className="text-slate-600 group-hover:text-slate-300 w-4 h-4 transition-colors" />
                        }
                      </div>
                      <h2 className="text-white font-semibold truncate">{m.title}</h2>
                      <p className="text-slate-500 text-sm truncate mb-2">{m.description}</p>
                      <div className="flex items-center gap-3">
                        <ProgressBar percent={percent} color={done ? "bg-success" : "bg-brand-500"} height="h-1.5" />
                        <span className="text-xs text-slate-500 flex-shrink-0">{completed}/{total}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="card flex items-center gap-4 opacity-50 cursor-not-allowed">
                  <div className="w-14 h-14 rounded-xl bg-surface-border flex items-center justify-center flex-shrink-0">
                    <Lock className="text-slate-600 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-500 text-xs">Módulo {m.order_index}</span>
                    <h2 className="text-slate-400 font-semibold">{m.title}</h2>
                    <p className="text-slate-600 text-sm">Necesitas {m.required_xp} XP para desbloquear</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
