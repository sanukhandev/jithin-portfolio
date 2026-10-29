import React from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";
import { ContactBackgroundAnimation } from "../ui/ContactBackgroundAnimation";
import { ContactForm } from "../ui/ContactForm";

interface ContactProps {
  dict: Dictionary;
}

export function Contact({ dict }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 border-b border-border-subtle bg-surface overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Pattern Animation with Opaque Bézier Spline Lines (Echoing Hero) */}
      <ContactBackgroundAnimation />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <SectionHeader
            eyebrow={dict.contact.eyebrow}
            heading={dict.contact.heading}
            subheading={dict.contact.subheading}
            align="center"
            className="mb-8 sm:mb-10"
          />

          {/* Centered Executive Contact Form */}
          <MotionWrapper delay={0.15}>
            <ContactForm dict={dict} />
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
}
