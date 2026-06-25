import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="text-brand-400 w-8 h-8 animate-spin" />
        <p className="text-slate-500 text-sm">Cargando...</p>
      </div>
    </div>
  );
}
