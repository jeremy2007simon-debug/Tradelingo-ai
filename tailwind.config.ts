import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        xp: {
          DEFAULT: "#f59e0b",
          light:   "#fde68a",
          dark:    "#b45309",
        },
        success: {
          DEFAULT: "#10b981",
          light:   "#d1fae5",
          dark:    "#065f46",
        },
        danger: {
          DEFAULT: "#ef4444",
          light:   "#fee2e2",
          dark:    "#991b1b",
        },
        surface: {
          DEFAULT: "#0f172a",
          card:    "#1e293b",
          border:  "#334155",
          muted:   "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl:  "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "xp-pop": "xpPop 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "streak-glow": "streakGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        xpPop: {
          "0%":   { transform: "scale(1)" },
          "50%":  { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        streakGlow: {
          "0%, 100%": { boxShadow: "0 0 8px #f59e0b" },
          "50%":      { boxShadow: "0 0 24px #f59e0b" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
