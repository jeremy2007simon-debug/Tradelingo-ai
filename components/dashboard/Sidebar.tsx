"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  TrendingUp, LayoutDashboard, BookOpen, MessageCircle,
  User, Settings, LogOut, Trophy
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard",  icon: LayoutDashboard, label: "Panel" },
  { href: "/modules",    icon: BookOpen,         label: "Módulos" },
  { href: "/chat",       icon: MessageCircle,    label: "Profesor IA" },
  { href: "/profile",    icon: Trophy,           label: "Mi progreso" },
  { href: "/settings",   icon: Settings,         label: "Ajustes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-surface-card border-r border-surface-border flex-col z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-surface-border">
          <TrendingUp className="text-brand-400 w-6 h-6" />
          <span className="text-lg font-bold text-white">
            TradeLingo <span className="text-brand-400">AI</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-brand-600/20 text-brand-400 border border-brand-600/30"
                    : "text-slate-400 hover:bg-surface-border hover:text-slate-200"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-surface-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-danger/10 hover:text-danger transition-all duration-150"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-card border-t border-surface-border z-40 flex justify-around px-2 py-2">
        {navItems.slice(0, 4).map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors",
                active ? "text-brand-400" : "text-slate-500"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-slate-500"
        >
          <LogOut className="w-5 h-5" />
          <span>Salir</span>
        </button>
      </nav>
    </>
  );
}
