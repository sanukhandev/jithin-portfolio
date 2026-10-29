import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        mono: {
          white: "#FFFFFF",
          grey: "#E5E5E5",
          black: "#0A0A0A",
        },
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "surface-panel": "var(--surface-panel)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        "action-bg": "var(--action-bg)",
        "action-text": "var(--action-text)",
      },
      fontFamily: {
        sans: [
          "var(--font-ui)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-editorial)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      maxWidth: {
        "8xl": "90rem", // 1440px
      },
    },
  },
  plugins: [],
};

export default config;
