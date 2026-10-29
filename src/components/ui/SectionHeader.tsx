import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "start",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses =
    align === "center"
      ? "text-center mx-auto items-center"
      : "text-start items-start";

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 lg:mb-20 max-w-4xl ${alignmentClasses} ${className}`}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest text-ink-muted font-sans font-medium mb-3 sm:mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink tracking-tight font-normal leading-[1.15] mb-4 sm:mb-6">
        {heading}
      </h2>
      {subheading && (
        <p className="text-base sm:text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
          {subheading}
        </p>
      )}
    </div>
  );
}
