"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Check, Copy, ArrowUpRight, Hand, AlertCircle, RefreshCw } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";
import { Button } from "./Button";

interface ContactFormProps {
  dict: Dictionary;
}

const TARGET_EMAIL = "jithinkjacob@live.it";

export function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const t = dict.contact.form;
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || t.error);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage(t.error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setStatus("idle");
    setErrorMessage("");
  };

  const directMailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    formData.subject || "Executive AI Transformation Inquiry"
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\n${formData.message}`
  )}`;

  return (
    <div className="relative w-full max-w-xl mx-auto p-5 sm:p-7 rounded-2xl glass-card-spatial bg-surface-raised/95 border border-border-subtle shadow-xl backdrop-blur-md">
      {status === "success" ? (
        /* Executive Success State - Compact */
        <div className="flex flex-col items-center text-center py-5 sm:py-6" role="status" aria-live="polite">
          <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center text-ink mb-4">
            <Check className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-ink mb-2">
            {t.successTitle}
          </h3>

          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed max-w-md mb-6">
            {t.successMessage}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <Button
              href={`mailto:${TARGET_EMAIL}`}
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />}
            >
              {TARGET_EMAIL}
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-subtle bg-surface text-xs font-medium text-ink hover:bg-surface-panel transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ink" strokeWidth={2} aria-hidden="true" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-ink-muted transition-transform duration-200 group-hover:scale-115" strokeWidth={1.75} aria-hidden="true" />
                  <span>{t.copyEmail}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-transparent text-xs font-medium text-ink-muted hover:text-ink transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:rotate-180" strokeWidth={1.75} aria-hidden="true" />
              <span>{t.sendAnother}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Sleek Concise Contact Form */
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Header Bar: Email + 1-Click Copy in Single Sleek Line */}
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle/70 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-ink shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-mono text-ink-muted/80 hidden sm:inline">{dict.contact.configuredEmail}:</span>
              <span className="font-mono font-medium text-ink">{TARGET_EMAIL}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors px-2 py-1 rounded hover:bg-surface"
              aria-label={t.copyEmail}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ink" strokeWidth={2} aria-hidden="true" />
                  <span className="text-ink font-semibold">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115" strokeWidth={1.75} aria-hidden="true" />
                  <span className="hover:underline underline-offset-2">{t.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          {/* Form Inputs Grid: 2 Columns for Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1 font-medium"
              >
                {t.nameLabel} <span className="text-ink">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface/90 border border-border-subtle focus:border-ink text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1 font-medium"
              >
                {t.emailLabel} <span className="text-ink">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface/90 border border-border-subtle focus:border-ink text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* Subject / Engagement Focus */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1 font-medium"
            >
              {t.subjectLabel}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t.subjectPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface/90 border border-border-subtle focus:border-ink text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Message Details (Compact 3 rows) */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1 font-medium"
            >
              {t.messageLabel} <span className="text-ink">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface/90 border border-border-subtle focus:border-ink text-xs sm:text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {/* Error Banner */}
          {status === "error" && (
            <div
              className="p-3.5 rounded-xl bg-surface border border-border-strong flex items-start gap-2.5 text-xs"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-ink shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
              <div className="flex-1">
                <p className="text-ink font-medium leading-relaxed mb-1.5">
                  {errorMessage}
                </p>
                <a
                  href={directMailtoUrl}
                  className="group inline-flex items-center gap-1 font-mono text-ink underline underline-offset-4 font-semibold hover:opacity-80"
                >
                  <span>{t.directEmailCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border-subtle/70">
            <span className="text-[11px] font-mono text-ink-muted/80 order-2 sm:order-1">
              {t.securityNotice}
            </span>

            <div className="order-1 sm:order-2 flex items-center gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === "submitting"}
                icon={
                  status === "submitting" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <motion.span
                      className="inline-flex origin-bottom-right rtl:origin-bottom-left"
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              rotate: [0, 16, -6, 14, -2, 0],
                            }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 2.4,
                        ease: "easeInOut",
                      }}
                    >
                      <Hand className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-115" strokeWidth={2} aria-hidden="true" />
                    </motion.span>
                  )
                }
              >
                {status === "submitting" ? t.submitting : t.submit}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
