interface BadgeProps {
  variant: "new" | "bestseller" | "festival";
  className?: string;
}

const variantStyles = {
  new: "bg-peacock text-white",
  bestseller: "bg-saffron text-white",
  festival: "bg-gold-gradient text-charcoal",
};

const variantLabels = {
  new: "New Arrival",
  bestseller: "Best Seller",
  festival: "Festival Special",
};

export default function Badge({ variant, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-badge ${variantStyles[variant]} ${className}`}
    >
      {variantLabels[variant]}
    </span>
  );
}
