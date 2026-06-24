"use client";

const STEPS = ["Explicación", "Quiz", "Ejercicio", "Resumen"];

interface LessonStepProps {
  current: number; // 0-3
}

export default function LessonStep({ current }: LessonStepProps) {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {STEPS.map((label, idx) => {
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                ${done ? "bg-success text-white" : active ? "bg-brand-600 text-white" : "bg-surface-border text-slate-500"}
              `}>
                {done ? "✓" : idx + 1}
              </div>
              <span className={`text-xs hidden sm:block font-medium transition-colors
                ${active ? "text-white" : done ? "text-success" : "text-slate-500"}
              `}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-0.5 w-4 md:w-8 rounded flex-shrink-0 transition-colors ${done ? "bg-success" : "bg-surface-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
