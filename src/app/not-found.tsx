import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "@/styles/globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-surface text-ink antialiased flex flex-col min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <span className="font-mono text-xs tracking-widest uppercase text-ink-muted mb-2 block">
            404 Error
          </span>
          <h1 className="text-4xl font-serif text-ink mb-4 font-normal">
            Page Not Found
          </h1>
          <p className="text-sm text-ink-muted mb-8 leading-relaxed font-sans">
            The requested resource is not available.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-action-text bg-action-bg px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Go to homepage</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
