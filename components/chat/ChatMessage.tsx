"use client";

import ReactMarkdown from "react-markdown";
import { TrendingUp, User } from "lucide-react";
import clsx from "clsx";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div className={clsx("flex gap-3 animate-slide-up", isAssistant ? "items-start" : "items-start flex-row-reverse")}>
      {/* Avatar */}
      <div className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
        isAssistant ? "bg-brand-600/30" : "bg-surface-border"
      )}>
        {isAssistant
          ? <TrendingUp className="text-brand-400 w-4 h-4" />
          : <User className="text-slate-400 w-4 h-4" />
        }
      </div>

      {/* Burbuja */}
      <div className={clsx(
        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        isAssistant
          ? "bg-surface-card border border-surface-border text-slate-200 rounded-tl-none"
          : "bg-brand-600 text-white rounded-tr-none"
      )}>
        {isAssistant ? (
          <div className="prose prose-sm prose-invert max-w-none
            prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5
            prose-strong:text-white prose-strong:font-semibold
            prose-headings:text-white prose-headings:font-semibold
          ">
            <ReactMarkdown>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-brand-400 animate-pulse ml-0.5 rounded-sm" />
            )}
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}
