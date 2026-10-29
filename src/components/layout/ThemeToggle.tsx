"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  lightLabel: string;
  darkLabel: string;
}

export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const label = theme === "light" ? darkLabel : lightLabel;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="group inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border-subtle bg-surface hover:border-border-strong text-ink transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {mounted ? (
        theme === "light" ? (
          <Moon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-115" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-115" strokeWidth={1.75} aria-hidden="true" />
        )
      ) : (
        <span className="w-4 h-4 inline-block" />
      )}
    </button>
  );
}
