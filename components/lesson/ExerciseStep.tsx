"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Target } from "lucide-react";
import type { Exercise } from "@/types/database";
import clsx from "clsx";

interface ExerciseStepProps {
  exercise: Exercise;
  onNext: (passed: boolean) => void;
}

export default function ExerciseStep({ exercise, onNext }: ExerciseStepProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isMultiple = exercise.type === "multiple_choice" || exercise.type === "scenario";
  const isCorrect = isMultiple
    ? selected === exercise.correct_index
    : textAnswer.trim().length > 10; // para texto libre, validamos que tenga contenido

  function handleSubmit() {
    if (isMultiple && selected === null) return;
    if (!isMultiple && textAnswer.trim().length < 5) return;
    setSubmitted(true);
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card border-brand-600/30">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-brand-400 w-5 h-5" />
          <h2 className="text-brand-400 font-semibold">Ejercicio final</h2>
        </div>

        <p className="text-white font-medium text-base mb-6 leading-relaxed">{exercise.prompt}</p>

        {/* Opciones múltiples */}
        {isMultiple && exercise.options && (
          <div className="space-y-3">
            {exercise.options.map((option, idx) => {
              let variant = "border-surface-border hover:border-slate-500 text-slate-300";
              if (submitted) {
                if (idx === exercise.correct_index) variant = "border-success bg-success/10 text-success";
                else if (idx === selected && !isCorrect) variant = "border-danger bg-danger/10 text-danger";
                else variant = "border-surface-border text-slate-500 opacity-40";
              } else if (selected === idx) {
                variant = "border-brand-500 bg-brand-600/10 text-white";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !submitted && setSelected(idx)}
                  className={clsx(
                    "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
                    variant,
                    !submitted && "cursor-pointer"
                  )}
                >
                  <span className="mr-3 text-slate-600">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Respuesta de texto libre */}
        {!isMultiple && (
          <textarea
            value={textAnswer}
            onChange={(e) => !submitted && setTextAnswer(e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            rows={4}
            className="input-field resize-none"
            disabled={submitted}
          />
        )}

        {/* Feedback */}
        {submitted && (
          <div className={clsx(
            "mt-5 p-4 rounded-xl flex items-start gap-3 animate-slide-up",
            isCorrect ? "bg-success/10 border border-success/30" : "bg-danger/10 border border-danger/30"
          )}>
            {isCorrect
              ? <CheckCircle className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
              : <XCircle className="text-danger w-5 h-5 flex-shrink-0 mt-0.5" />
            }
            <p className={clsx("font-medium text-sm", isCorrect ? "text-success" : "text-danger")}>
              {isCorrect
                ? "¡Excelente! Respuesta correcta."
                : `La respuesta correcta era: "${exercise.options?.[exercise.correct_index ?? 0]}"`
              }
            </p>
          </div>
        )}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={isMultiple ? selected === null : textAnswer.trim().length < 5}
          className="btn-primary w-full"
        >
          Comprobar respuesta
        </button>
      ) : (
        <button onClick={() => onNext(isCorrect)} className="btn-primary w-full">
          Ver resumen y recompensa →
        </button>
      )}
    </div>
  );
}
