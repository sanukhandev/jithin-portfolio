import React from "react";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      icon,
      iconPosition = "end",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none glass-button-spatial";

    const variantStyles = {
      primary:
        "bg-action-bg text-action-text border border-action-bg hover:opacity-95",
      secondary:
        "bg-surface-panel/90 text-ink border border-border-subtle hover:border-border-strong hover:bg-surface",
      outline:
        "bg-surface/80 text-ink border border-border-strong hover:bg-surface-panel",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 rounded-md min-h-[38px] gap-2",
      md: "text-sm px-5 py-2.5 rounded-lg min-h-[44px] gap-2.5",
      lg: "text-base px-6 py-3 rounded-lg min-h-[48px] gap-3",
    };

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
      <>
        {icon && iconPosition === "start" && (
          <span className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1 rtl:group-hover:translate-x-1 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "end" && (
          <span className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-1 group-hover:scale-110">
            {icon}
          </span>
        )}
      </>
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
