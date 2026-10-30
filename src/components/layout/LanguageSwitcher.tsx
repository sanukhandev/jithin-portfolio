"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, LOCALE_LABELS } from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  selectLabel: string;
}

export function LanguageSwitcher({
  currentLocale,
  selectLabel,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (targetLocale: Locale) => {
    setIsOpen(false);
    if (targetLocale === currentLocale) return;

    // Persist explicit user selection to cookie so root redirects honor their preference
    try {
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore in non-browser environments
    }

    // Replace the locale prefix in current pathname, e.g. /en/work/xyz -> /it/work/xyz
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-start" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${selectLabel}: ${LOCALE_LABELS[currentLocale]}`}
        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-surface hover:border-border-strong text-ink text-xs font-mono uppercase tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[38px]"
      >
        <Globe className="w-3.5 h-3.5 text-ink/70 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-115" strokeWidth={1.75} aria-hidden="true" />
        <span>{currentLocale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute end-0 mt-2 w-36 rounded-lg border border-border-subtle bg-surface shadow-xl py-1 z-50 focus:outline-none backdrop-blur-md"
        >
          {LOCALES.map((loc) => {
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(loc)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start transition-colors ${
                  isActive
                    ? "font-semibold text-ink bg-surface-panel"
                    : "text-ink/80 hover:bg-surface-panel/60 hover:text-ink"
                }`}
              >
                <span>{LOCALE_LABELS[loc]}</span>
                <span className="font-mono text-[10px] text-ink/50 uppercase">
                  {loc}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
