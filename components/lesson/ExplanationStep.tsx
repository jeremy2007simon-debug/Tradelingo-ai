"use client";

import { Lightbulb, BookOpen } from "lucide-react";

interface ExplanationStepProps {
  explanation: string;
  example: string;
  onNext: () => void;
}

export default function ExplanationStep({ explanation, example, onNext }: ExplanationStepProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Explicación */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-brand-400 w-5 h-5" />
          <h2 className="text-brand-400 font-semibold">Explicación</h2>
        </div>
        <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {explanation}
        </div>
      </div>

      {/* Ejemplo práctico */}
      <div className="card border-xp/20 bg-xp/5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-xp w-5 h-5" />
          <h2 className="text-xp font-semibold">Ejemplo práctico</h2>
        </div>
        <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {example}
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full text-center">
        Continuar al quiz →
      </button>
    </div>
  );
}
