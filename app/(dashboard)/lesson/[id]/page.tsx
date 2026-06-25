"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import LessonStep from "@/components/lesson/LessonStep";
import ExplanationStep from "@/components/lesson/ExplanationStep";
import QuizStep from "@/components/lesson/QuizStep";
import ExerciseStep from "@/components/lesson/ExerciseStep";
import SummaryStep from "@/components/lesson/SummaryStep";
import type { LessonContent } from "@/types/database";

interface LessonData {
  id: number;
  title: string;
  xp_reward: number;
  content: LessonContent;
  modules: { title: string; slug: string; icon: string; color: string };
}

interface EarnedBadge {
  slug: string;
  title: string;
  icon: string;
}

interface CompletionResult {
  xp_earned: number;
  new_xp: number;
  new_level: number;
  new_streak: number;
  earned_badges: EarnedBadge[];
  already_completed: boolean;
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); // 0=explicación, 1=quiz, 2=ejercicio, 3=resumen
  const [quizScore, setQuizScore] = useState(0);
  const [result, setResult] = useState<CompletionResult | null>(null);
  const [nextLessonId, setNextLessonId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/lessons?id=${id}`);
      if (!res.ok) { router.push("/modules"); return; }
      const { lesson } = await res.json() as { lesson: LessonData };
      setLesson(lesson);
      setLoading(false);
    }
    load();
  }, [id, router]);

  const completeLesson = useCallback(async (score: number) => {
    const res = await fetch(`/api/progress/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    });
    const data = await res.json() as CompletionResult;
    setResult(data);

    // Buscar siguiente lección del mismo módulo
    if (lesson) {
      const modRes = await fetch(`/api/lessons?module_slug=${lesson.modules.slug}`);
      if (modRes.ok) {
        const { lessons } = await modRes.json() as { lessons: { id: number }[] };
        const currentIdx = lessons.findIndex((l) => l.id === Number(id));
        const next = lessons[currentIdx + 1];
        setNextLessonId(next?.id ?? null);
      }
    }

    setStep(3);
  }, [id, lesson]);

  function handleQuizDone(score: number) {
    setQuizScore(score);
    setStep(2);
  }

  async function handleExerciseDone(passed: boolean) {
    const finalScore = Math.round((quizScore + (passed ? 100 : 50)) / 2);
    await completeLesson(finalScore);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-slate-400 animate-pulse">Cargando lección...</div>
      </div>
    );
  }

  if (!lesson) return null;

  const content = lesson.content;

  return (
    <div className="max-w-2xl space-y-6 pb-20 md:pb-0 animate-fade-in">
      {/* Cabecera */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link
          href={`/modules/${lesson.modules.slug}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {lesson.modules.title}
        </Link>
        <div className="flex items-center gap-1 text-xp text-sm font-bold">
          <Zap className="w-4 h-4" />
          {lesson.xp_reward} XP
        </div>
      </div>

      {/* Título y pasos */}
      <div className="space-y-3">
        <h1 className="text-xl md:text-2xl font-bold text-white">{lesson.title}</h1>
        <LessonStep current={step} />
      </div>

      {/* Contenido según paso */}
      {step === 0 && (
        <ExplanationStep
          explanation={content.explanation}
          example={content.example}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <QuizStep
          questions={content.quiz}
          onNext={handleQuizDone}
        />
      )}
      {step === 2 && (
        <ExerciseStep
          exercise={content.exercise}
          onNext={handleExerciseDone}
        />
      )}
      {step === 3 && result && (
        <SummaryStep
          summary={content.summary}
          xpEarned={result.xp_earned}
          newXP={result.new_xp}
          newLevel={result.new_level}
          newStreak={result.new_streak}
          quizScore={quizScore}
          moduleSlug={lesson.modules.slug}
          nextLessonId={nextLessonId}
          earnedBadges={result.earned_badges}
          alreadyCompleted={result.already_completed}
        />
      )}
    </div>
  );
}
