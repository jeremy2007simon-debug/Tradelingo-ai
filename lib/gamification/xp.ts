export function getLevelFromXP(xp: number): number {
  // Cada nivel requiere 100 * nivel XP (nivel 1→2: 100xp, 2→3: 200xp, etc.)
  let level = 1;
  let required = 100;
  let accumulated = 0;

  while (accumulated + required <= xp) {
    accumulated += required;
    level++;
    required = level * 100;
  }

  return level;
}

export function getXPForNextLevel(level: number): number {
  return level * 100;
}

export function getXPProgressInLevel(xp: number): { current: number; required: number; percent: number } {
  let level = 1;
  let required = 100;
  let accumulated = 0;

  while (accumulated + required <= xp) {
    accumulated += required;
    level++;
    required = level * 100;
  }

  const current = xp - accumulated;
  const percent = Math.round((current / required) * 100);

  return { current, required, percent };
}

export function getLevelTitle(level: number): string {
  if (level < 3)  return "Principiante";
  if (level < 5)  return "Aprendiz";
  if (level < 8)  return "Intermedio";
  if (level < 12) return "Avanzado";
  if (level < 16) return "Experto";
  if (level < 20) return "Maestro";
  return "Leyenda";
}

export function shouldUpdateStreak(lastActivity: string | null): {
  newStreak: number;
  reset: boolean;
} {
  if (!lastActivity) return { newStreak: 1, reset: false };

  const last = new Date(lastActivity);
  const today = new Date();

  last.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { newStreak: 0, reset: false }; // ya estudió hoy
  if (diffDays === 1) return { newStreak: 1, reset: false };  // racha continúa
  return { newStreak: 1, reset: true };                        // racha rota
}

export const BADGE_THRESHOLDS = {
  streak: [3, 7, 30],
  levels: [5, 10],
} as const;
