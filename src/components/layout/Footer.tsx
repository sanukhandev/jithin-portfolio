"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, Heart } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}#pillars`, label: dict.nav.pillars },
    { href: `/${locale}#approach`, label: dict.nav.approach },
    { href: `/${locale}#insights`, label: dict.nav.insights },
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border-subtle bg-surface-raised py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-border-subtle">
          {/* Identity & Mission */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-ink mb-2">
              {siteConfig.name}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-1.5">
              {siteConfig.role[locale]} · {siteConfig.company.name}
            </span>
            <span className="text-[11px] font-mono text-ink-muted/70 tracking-wider uppercase mb-4 block">
              {siteConfig.company.presence} · {siteConfig.location[locale]}
            </span>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed mb-6 font-sans">
              {siteConfig.heroMission[locale]}
            </p>
            <div className="text-xs text-ink-muted/80 font-mono border-s-2 border-border-strong ps-3">
              {dict.footer.disclaimerNotice}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-4">
              {dict.nav.work} &amp; {dict.nav.about}
            </span>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors p-2 rounded border border-border-subtle hover:border-border-strong bg-surface"
              aria-label={dict.footer.backToTop}
            >
              <span>{dict.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-1" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="mt-6 md:mt-0 text-start md:text-end text-xs font-mono text-ink-muted">
              <span>LOCALE: {locale.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {dict.footer.copyright}
          </p>
          <p className="text-center sm:text-end text-[11px] text-ink-muted/80 flex items-center justify-center sm:justify-end flex-wrap gap-1">
            <span>Swiss Monochrome — Designed with</span>
            <motion.span
              className="inline-flex items-center mx-0.5 text-red-500"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.25, 1, 1.2, 1],
                    }
              }
              transition={{
                duration: 1.3,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
              aria-label="love"
            >
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" strokeWidth={1.5} aria-hidden="true" />
            </motion.span>
            <span>by</span>
            <a
              href="https://sanukhan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink hover:underline underline-offset-4 transition-colors"
            >
              SanuKhan
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
