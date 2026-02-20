import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bg: {
          deep: "#020408", // Main Background
          surface: "#121212", // Card Background
        },
        primary: {
          DEFAULT: "#3B82F6", // Electric Blue
        },
        accent: {
          purple: "#A855F7", // Neon Purple
        },
        text: {
          main: "#FAFAFA", // Primary White
          muted: "#A1A1AA", // Secondary Grey
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        // ADDED: The wave effect for your text
        shine: "shine 5s linear infinite",
        // ADDED: The slow pulse for background blobs
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 2rem))" },
        },
        glow: {
          from: { boxShadow: "0 0 10px #3B82F6" },
          to: { boxShadow: "0 0 20px #A855F7" },
        },
        // ADDED: Keyframes for the shine effect
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
