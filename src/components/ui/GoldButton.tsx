"use client";

import { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function GoldButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-pill transition-all duration-300 cursor-pointer select-none";

  const variantStyles =
    variant === "primary"
      ? "bg-gold-gradient text-charcoal hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]"
      : "border-2 border-gold-start text-gold-start hover:bg-gold-start/10 hover:scale-[1.02] active:scale-[0.98]";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
    : "";

  const allStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <a href={href} className={allStyles}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={allStyles}>
      {children}
    </button>
  );
}
