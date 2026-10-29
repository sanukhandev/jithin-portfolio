import React from "react";

interface SkipLinkProps {
  label: string;
}

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-action-bg focus:text-action-text focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ink font-medium text-sm transition-all"
    >
      {label}
    </a>
  );
}
