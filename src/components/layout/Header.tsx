"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}#pillars`, label: dict.nav.pillars },
    { href: `/${locale}#approach`, label: dict.nav.approach },
    { href: `/${locale}#insights`, label: dict.nav.insights },
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-md border-b border-border-subtle py-3.5 shadow-sm"
          : "bg-surface/50 backdrop-blur-sm py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md"
          >
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-ink">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-border-subtle text-ink-muted">
              CIO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs lg:text-sm font-sans text-ink/80 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Controls: Theme & Language & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher
              currentLocale={locale}
              selectLabel={dict.nav.language}
            />
            <ThemeToggle
              lightLabel={dict.nav.themeLight}
              darkLabel={dict.nav.themeDark}
            />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? dict.nav.close : dict.nav.menu}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border-subtle bg-surface text-ink hover:border-border-strong transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[60px] z-50 bg-surface/98 backdrop-blur-xl md:hidden flex flex-col p-6 overflow-y-auto border-t border-border-subtle"
        >
          <nav className="flex flex-col gap-5 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-ink hover:opacity-75 transition-opacity py-2 border-b border-border-subtle/40"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 text-xs text-ink-muted font-mono flex items-center justify-between border-t border-border-subtle">
            <span>{siteConfig.name}</span>
            <span>{siteConfig.role[locale]}</span>
          </div>
        </div>
      )}
    </header>
  );
}
