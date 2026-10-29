import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "subtle" | "outline" | "solid";
  className?: string;
}

export function Badge({
  children,
  variant = "outline",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wide uppercase rounded-md transition-colors glass-badge-spatial";

  const variantStyles = {
    outline: "border border-border-strong text-ink bg-surface/70",
    subtle: "bg-surface-panel/85 text-ink border border-border-subtle",
    solid: "bg-action-bg text-action-text border border-action-bg",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
      {children}
    </span>
  );
}
