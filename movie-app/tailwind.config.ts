import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        surface: "#141414",
        surfaceHover: "#1c1c1c",
        accent: {
          DEFAULT: "#ff3b3b",
          dim: "#c92e2e",
          glow: "#ff5c5c",
        },
        muted: "#8a8a8a",
        line: "#232323",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "fade-bottom": "linear-gradient(to bottom, transparent 0%, #090909 100%)",
        "fade-top": "linear-gradient(to top, transparent 0%, #090909 100%)",
        "fade-left": "linear-gradient(to left, transparent 0%, #090909 85%)",
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(255,59,59,0.15) 0%, transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(255,59,59,0.35)",
        card: "0 10px 40px rgba(0,0,0,0.6)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;
