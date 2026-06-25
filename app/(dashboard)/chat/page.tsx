"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { TrendingUp, Trash2 } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import type { ChatMessage as ChatMessageType } from "@/lib/ai/claude";

const WELCOME_MESSAGE: ChatMessageType = {
  role: "assistant",
  content: `¡Hola! Soy **Marco**, tu profesor de trading en TradeLingo AI. 👋

Estoy aquí para ayudarte a entender los mercados financieros desde cero, explicarte cualquier concepto que no quede claro en las lecciones, y guiarte en tu aprendizaje.

¿Qué te gustaría aprender hoy? Puedes preguntarme sobre:
- **Conceptos básicos**: qué es el mercado, cómo funcionan los precios
- **Análisis técnico**: velas, tendencias, soportes y resistencias
- **Gestión del riesgo**: la habilidad más importante en trading
- **Psicología**: cómo controlar las emociones al operar

⚠️ *Recuerda: soy un profesor educativo, no un asesor financiero. Nunca daré señales de compra o venta.*`,
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);

  // Auto-scroll al fondo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Pre-rellenar con pregunta de la URL ?q=
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !sentInitialRef.current) {
      sentInitialRef.current = true;
      handleSend(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSend(userText: string) {
    const userMessage: ChatMessageType = { role: "user", content: userText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.role !== "assistant" || m !== WELCOME_MESSAGE),
          conversationId,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Error del servidor");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        setStreamingContent(fullContent);
      }

      const assistantMessage: ChatMessageType = { role: "assistant", content: fullContent };
      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");

      // Guardar ID de conversación si viene en el header (futuro)
      const newId = res.headers.get("X-Conversation-Id");
      if (newId) setConversationId(newId);

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, tuve un problema al responder. Por favor, inténtalo de nuevo.",
        },
      ]);
      setStreamingContent("");
    } finally {
      setIsStreaming(false);
    }
  }

  function handleClear() {
    setMessages([WELCOME_MESSAGE]);
    setConversationId(null);
    setStreamingContent("");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] max-w-2xl">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-600/20 flex items-center justify-center">
            <TrendingUp className="text-brand-400 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-white font-bold">Marco — Profesor IA</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-slate-500 text-xs">Disponible ahora</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="btn-ghost flex items-center gap-2 text-xs"
          title="Limpiar conversación"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Limpiar</span>
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}

        {/* Mensaje en streaming */}
        {isStreaming && streamingContent && (
          <ChatMessage role="assistant" content={streamingContent} isStreaming />
        )}

        {/* Indicador de escritura (antes de recibir primer chunk) */}
        {isStreaming && !streamingContent && (
          <div className="flex gap-3 items-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-brand-600/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-brand-400 w-4 h-4" />
            </div>
            <div className="bg-surface-card border border-surface-border rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pt-3 border-t border-surface-border">
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
}
