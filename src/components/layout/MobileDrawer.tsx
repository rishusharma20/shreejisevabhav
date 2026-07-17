"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, User, MessageCircle } from "lucide-react";
import { LotusIcon, PeacockFeatherIcon } from "@/components/icons/DevotionalIcons";
import { navLinks } from "@/lib/seed-data";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-cream z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header with temple arch motif */}
            <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-cream-dark to-cream">
              {/* Decorative arch at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PeacockFeatherIcon size={28} className="text-peacock" />
                  <span className="font-display text-lg font-bold text-charcoal">
                    Shreeji Seva Bhav
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-warm-gray hover:text-charcoal transition-colors rounded-full hover:bg-cream-dark cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Gold divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-start to-transparent mx-6" />

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4 px-6">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center px-4 py-3.5 text-base font-medium text-charcoal hover:text-saffron-deep hover:bg-saffron/5 rounded-lg transition-all"
                    >
                      {link.label}
                    </a>
                    {index < navLinks.length - 1 && (
                      <div className="h-px bg-cream-dark mx-4" />
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Quick actions */}
              <div className="mt-6 pt-6 border-t border-cream-dark space-y-2">
                <a
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal hover:text-saffron-deep hover:bg-saffron/5 rounded-lg transition-all"
                >
                  <Heart size={18} />
                  Wishlist
                </a>
                <a
                  href="/cart"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal hover:text-saffron-deep hover:bg-saffron/5 rounded-lg transition-all"
                >
                  <ShoppingBag size={18} />
                  Cart
                </a>
                <a
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal hover:text-saffron-deep hover:bg-saffron/5 rounded-lg transition-all"
                >
                  <User size={18} />
                  Login / Signup
                </a>
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 pb-6 space-y-3">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366] text-white font-semibold rounded-pill hover:bg-[#1EB554] transition-colors"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              {/* Lotus motif */}
              <div className="flex justify-center pt-2">
                <LotusIcon size={32} className="text-gold-start/40" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
