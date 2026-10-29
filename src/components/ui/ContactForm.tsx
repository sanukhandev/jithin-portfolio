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
      // Fallback
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
    <div className="relative w-full p-8 sm:p-10 lg:p-12 rounded-2xl glass-card-spatial bg-surface-raised/95 border border-border-subtle shadow-xl backdrop-blur-md">
      {status === "success" ? (
        /* Executive Success State */
        <div className="flex flex-col items-center text-center py-6 sm:py-8" role="status" aria-live="polite">
          <div className="w-14 h-14 rounded-full bg-surface border border-border-subtle flex items-center justify-center text-ink mb-6">
            <Check className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-ink mb-3">
            {t.successTitle}
          </h3>

          <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed max-w-lg mb-8">
            {t.successMessage}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <Button
              href={`mailto:${TARGET_EMAIL}`}
              variant="primary"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
            >
              {TARGET_EMAIL}
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-surface text-sm font-medium text-ink hover:bg-surface-raised transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-ink" strokeWidth={2} aria-hidden="true" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
                  <span>{t.copyEmail}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-transparent text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              <span>{t.sendAnother}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Executive Contact Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Prompt */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-subtle/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-ink shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block">
                  {dict.contact.configuredEmail}
                </span>
                <span className="text-sm font-medium text-ink">
                  {TARGET_EMAIL}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="self-start sm:self-center inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>{t.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2 font-medium"
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
                className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-border-subtle focus:border-ink text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2 font-medium"
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
                className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-border-subtle focus:border-ink text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* Subject / Engagement Focus */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2 font-medium"
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
              className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-border-subtle focus:border-ink text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Message Details */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2 font-medium"
            >
              {t.messageLabel} <span className="text-ink">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-border-subtle focus:border-ink text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none transition-colors duration-200 resize-y"
            />
          </div>

          {/* Error Banner */}
          {status === "error" && (
            <div
              className="p-4 rounded-xl bg-surface border border-border-strong flex items-start gap-3 text-xs"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-ink shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
              <div className="flex-1">
                <p className="text-ink font-medium leading-relaxed mb-2">
                  {errorMessage}
                </p>
                <a
                  href={directMailtoUrl}
                  className="inline-flex items-center gap-1.5 font-mono text-ink underline underline-offset-4 font-semibold hover:opacity-80"
                >
                  <span>{t.directEmailCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-subtle/80">
            <span className="text-xs font-mono text-ink-muted order-2 sm:order-1">
              {t.securityNotice}
            </span>

            <div className="order-1 sm:order-2 flex items-center gap-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
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
                      <Hand className="w-4 h-4 text-white group-hover:scale-110 transition-transform" strokeWidth={2} aria-hidden="true" />
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
