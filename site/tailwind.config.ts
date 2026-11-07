import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          deep: "var(--brand-deep)",
          soft: "var(--brand-soft)",
        },
        mist: "var(--mist)",
        fog: "var(--fog)",
        amber: {
          DEFAULT: "var(--amber)",
          deep: "var(--amber-deep)",
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(15, 76, 74, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        drift: "drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
