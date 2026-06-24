"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/types/database";
import clsx from "clsx";

interface QuizStepProps {
  questions: QuizQuestion[];
  onNext: (score: number) => void;
}

export default function QuizStep({ questions, onNext }: QuizStepProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[current];
  const isCorrect = selected === question?.correct_index;
  const isLast = current === questions.length - 1;

  function handleSelect(idx: number) {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
  }

  function handleNext() {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setSelected(null);
    setShowFeedback(false);

    if (isLast) {
      const correct = newAnswers.filter(Boolean).length;
      const score = Math.round((correct / questions.length) * 100);
      onNext(score);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (!question) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Progreso del quiz */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Pregunta {current + 1} de {questions.length}</span>
        <span>{answers.filter(Boolean).length} correctas</span>
      </div>

      <div className="card">
        <h2 className="text-white font-semibold text-lg mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let variant = "border-surface-border hover:border-slate-500 text-slate-300";
            if (showFeedback) {
              if (idx === question.correct_index) variant = "border-success bg-success/10 text-success";
              else if (idx === selected && !isCorrect) variant = "border-danger bg-danger/10 text-danger";
              else variant = "border-surface-border text-slate-500 opacity-50";
            } else if (selected === idx) {
              variant = "border-brand-500 bg-brand-600/10 text-white";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={clsx(
                  "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium",
                  variant
                )}
              >
                <span className="mr-3 text-slate-600">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={clsx(
            "mt-5 p-4 rounded-xl flex items-start gap-3 animate-slide-up",
            isCorrect ? "bg-success/10 border border-success/30" : "bg-danger/10 border border-danger/30"
          )}>
            {isCorrect
              ? <CheckCircle className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
              : <XCircle className="text-danger w-5 h-5 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className={clsx("font-semibold text-sm mb-1", isCorrect ? "text-success" : "text-danger")}>
                {isCorrect ? "¡Correcto!" : "No exactamente"}
              </p>
              <p className="text-slate-400 text-sm">{question.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {showFeedback && (
        <button onClick={handleNext} className="btn-primary w-full">
          {isLast ? "Ver ejercicio final →" : "Siguiente pregunta →"}
        </button>
      )}
    </div>
  );
}
