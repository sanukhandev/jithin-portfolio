import React from "react";
import { ArrowUpRight, Globe, MapPin, Mail, Phone } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";
import { MotionWrapper } from "../ui/MotionWrapper";
import { ContactBackgroundAnimation } from "../ui/ContactBackgroundAnimation";
import { ContactForm } from "../ui/ContactForm";

interface ContactProps {
  locale?: Locale;
  dict: Dictionary;
}

export function Contact({ locale = "en", dict }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative py-14 sm:py-24 lg:py-32 border-b border-border-subtle bg-surface overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Pattern Animation with Opaque Bézier Spline Lines (Echoing Hero) */}
      <ContactBackgroundAnimation />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-start">
          {/* Column 1: Executive Contact Intel & Text (Left in LTR, Right in Arabic RTL) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <MotionWrapper delay={0.1}>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-ink-muted font-sans font-medium mb-3 block">
                  {dict.contact.eyebrow}
                </span>
                <h2
                  id="contact-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink tracking-tight font-normal leading-[1.12] mb-4"
                >
                  {dict.contact.heading}
                </h2>
                <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
                  {dict.contact.subheading}
                </p>
              </div>

              {/* Executive Coordinates & Corporate Presence */}
              <div className="space-y-3 pt-6 border-t border-border-subtle/80 text-xs font-mono">
                {/* Organization & Executive Role */}
                <div className="p-4 rounded-xl glass-card-spatial bg-surface-raised/85">
                  <span className="text-ink-muted uppercase tracking-wider block text-[10px] mb-1">
                    EXECUTIVE ROLE & FIRM
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-ink font-semibold text-sm">
                      {siteConfig.role[locale]}
                    </span>
                    <a
                      href={siteConfig.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-ink underline underline-offset-4 font-mono text-xs hover:opacity-80 shrink-0"
                    >
                      <span>{siteConfig.company.name}</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                </div>

                {/* Footprint & Location Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface-raised/70 border border-border-subtle/70">
                    <div className="flex items-center gap-1.5 mb-1 text-ink-muted">
                      <Globe className="w-3.5 h-3.5 text-ink/70" strokeWidth={1.75} />
                      <span className="uppercase tracking-wider text-[10px]">PRESENCE</span>
                    </div>
                    <span className="text-ink font-semibold text-xs block">
                      {siteConfig.company.presence}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-raised/70 border border-border-subtle/70">
                    <div className="flex items-center gap-1.5 mb-1 text-ink-muted">
                      <MapPin className="w-3.5 h-3.5 text-ink/70" strokeWidth={1.75} />
                      <span className="uppercase tracking-wider text-[10px]">BASE LOCATION</span>
                    </div>
                    <span className="text-ink font-semibold text-xs block">
                      {siteConfig.location[locale]}
                    </span>
                  </div>
                </div>

                {/* Direct Communications Card */}
                <div className="p-3.5 rounded-xl bg-surface-raised/70 border border-border-subtle/70 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-ink-muted">
                      <Mail className="w-3.5 h-3.5 text-ink/70" strokeWidth={1.75} />
                      <span className="uppercase tracking-wider text-[10px]">DIRECT EMAIL</span>
                    </div>
                    <a
                      href={`mailto:${siteConfig.verifiedLinks.email}`}
                      className="text-ink font-medium hover:underline underline-offset-2 truncate"
                    >
                      {siteConfig.verifiedLinks.email}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-subtle/50">
                    <div className="flex items-center gap-1.5 text-ink-muted">
                      <Phone className="w-3.5 h-3.5 text-ink/70" strokeWidth={1.75} />
                      <span className="uppercase tracking-wider text-[10px]">DIRECT PHONE</span>
                    </div>
                    <span className="text-ink font-medium">
                      {siteConfig.phone}
                    </span>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Column 2: Contact Form (Right in LTR, Left in Arabic RTL) */}
          <div className="lg:col-span-7">
            <MotionWrapper delay={0.2}>
              <ContactForm dict={dict} />
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
