"use client";

import { LotusIcon } from "@/components/icons/DevotionalIcons";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} mb-12 ${className}`}>
      <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Lotus divider */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold-start" />
        <LotusIcon size={28} className="text-gold-start" />
        <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold-start" />
      </div>
    </div>
  );
}
