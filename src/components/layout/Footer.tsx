"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
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
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4">
              {siteConfig.role[locale]}
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
          <p className="text-center sm:text-end text-[11px] text-ink-muted/70">
            Apple-inspired minimalism · Swiss typography · Strictly monochrome
          </p>
        </div>
      </Container>
    </footer>
  );
}
