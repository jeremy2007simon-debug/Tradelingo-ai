"use client";

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  percent,
  color = "bg-brand-500",
  height = "h-2",
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-surface-border rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full ${animated ? "transition-all duration-700 ease-out" : ""}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-slate-500 mt-1 block text-right">{clamped}%</span>
      )}
    </div>
  );
}
