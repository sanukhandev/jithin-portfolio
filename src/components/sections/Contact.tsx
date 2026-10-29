import React from "react";
import { Mail, ShieldAlert, ArrowUpRight } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { MotionWrapper } from "../ui/MotionWrapper";

interface ContactProps {
  dict: Dictionary;
}

export function Contact({ dict }: ContactProps) {
  const verifiedEmail = siteConfig.verifiedLinks.email;
  const verifiedLinkedIn = siteConfig.verifiedLinks.linkedin;

  return (
    <section id="contact" className="py-24 sm:py-32 border-b border-border-subtle bg-surface-raised">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow={dict.contact.eyebrow}
            heading={dict.contact.heading}
            subheading={dict.contact.subheading}
            align="center"
          />

          <MotionWrapper delay={0.2}>
            {verifiedEmail ? (
              /* Configured verified email scenario */
              <div className="p-8 sm:p-12 rounded-2xl glass-card-spatial bg-surface/90 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-surface-panel flex items-center justify-center text-ink mb-6">
                  <Mail className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-ink mb-3">
                  {dict.contact.configuredEmail}
                </h3>
                <p className="text-sm text-ink-muted mb-8 max-w-md font-sans">
                  {dict.contact.connectPrompt}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    href={`mailto:${verifiedEmail}`}
                    variant="primary"
                    size="lg"
                    icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                  >
                    {verifiedEmail}
                  </Button>
                  {verifiedLinkedIn && (
                    <Button
                      href={verifiedLinkedIn}
                      isExternal
                      variant="outline"
                      size="lg"
                      icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                    >
                      LinkedIn
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Honest pending-verification status card */
              <div className="p-8 sm:p-12 rounded-2xl glass-card-spatial bg-surface/90 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-surface-panel flex items-center justify-center text-ink mb-6">
                  <ShieldAlert className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">
                  {dict.contact.statusTitle}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif text-ink mb-4 max-w-lg">
                  {dict.contact.statusMessage}
                </h3>

                <p className="text-sm text-ink-muted mb-6 max-w-md font-sans leading-relaxed">
                  {dict.contact.statusDetail}
                </p>

                <div className="p-4 rounded-lg bg-surface-raised border border-border-subtle/80 max-w-lg text-xs font-mono text-ink-muted leading-relaxed text-start">
                  <span className="font-semibold text-ink block mb-1">
                    System Protocol Note:
                  </span>
                  {dict.contact.connectPrompt}
                </div>
              </div>
            )}
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
}
