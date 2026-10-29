import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function LocalizedNotFound() {
  return (
    <div className="py-40 text-center bg-surface">
      <Container>
        <div className="max-w-md mx-auto">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-muted mb-2 block">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-ink mb-4 font-normal">
            Page Not Found
          </h1>
          <p className="text-sm text-ink-muted mb-8 leading-relaxed font-sans">
            The requested page does not exist or has been relocated.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-action-text bg-action-bg px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Return to overview</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
