"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
  size?: "sm" | "md";
  label?: string;
}

const WHATSAPP_NUMBER = "919999999999"; // Replace with actual number

export default function WhatsAppButton({
  productName,
  className = "",
  size = "sm",
  label,
}: WhatsAppButtonProps) {
  const message = productName
    ? `Hi! I'm interested in "${productName}" from Shreeji Seva Bhav. Can you share more details?`
    : "Hi! I'd like to know more about your divine collections at Shreeji Seva Bhav.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const sizeStyles =
    size === "sm" ? "px-3 py-1.5 text-xs gap-1.5" : "px-5 py-2.5 text-sm gap-2";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium rounded-pill bg-[#25D366] text-white hover:bg-[#1EB554] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${sizeStyles} ${className}`}
      aria-label={`Buy ${productName || "products"} on WhatsApp`}
    >
      <MessageCircle size={size === "sm" ? 14 : 18} />
      {label || "WhatsApp"}
    </a>
  );
}
