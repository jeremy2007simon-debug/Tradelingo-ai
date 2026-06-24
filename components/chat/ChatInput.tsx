"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

const SUGGESTIONS = [
  "¿Qué es una vela japonesa?",
  "Explícame el stop loss",
  "¿Cómo funciona el apalancamiento?",
  "¿Cuál es la diferencia entre Forex y acciones?",
];

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [text, setText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize del textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [text]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    setShowSuggestions(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="space-y-3">
      {/* Sugerencias */}
      {showSuggestions && !disabled && text.length === 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { onSend(s); setShowSuggestions(false); }}
              className="text-xs bg-surface-card border border-surface-border hover:border-brand-600/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-3 bg-surface-card border border-surface-border rounded-2xl p-3 focus-within:border-brand-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder ?? "Pregunta algo al profesor Marco..."}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm resize-none outline-none leading-relaxed disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
        >
          {disabled
            ? <Loader2 className="w-4 h-4 text-white animate-spin" />
            : <Send className="w-4 h-4 text-white" />
          }
        </button>
      </div>
      <p className="text-slate-600 text-xs text-center">
        Marco es un profesor virtual. No es asesor financiero. ⚠️
      </p>
    </div>
  );
}
