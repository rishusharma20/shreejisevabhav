"use client";

import { useState } from "react";
import { Heart, Camera, Users, Play, MessageCircle, Send } from "lucide-react";
import { LotusIcon, PeacockFeatherIcon } from "@/components/icons/DevotionalIcons";
import { navLinks } from "@/lib/seed-data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const shopLinks = [
    { label: "Radha Dresses", href: "/divine-wardrobe" },
    { label: "Krishna Vastra", href: "/krishna-vastra" },
    { label: "Jewellery Sets", href: "/jewellery" },
  ];

  return (
    <footer className="bg-charcoal text-cream-dark relative overflow-hidden">
      {/* Lotus watermark */}
      <div className="absolute top-10 right-10 opacity-[0.03]">
        <LotusIcon size={300} className="text-gold-end" />
      </div>

      {/* Gold top border */}
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PeacockFeatherIcon size={32} className="text-peacock-light" />
              <span className="font-display text-xl font-bold text-cream">
                Shreeji Seva Bhav
              </span>
            </div>
            <p className="text-sm text-warm-gray-light leading-relaxed mb-5">
              Divine clothing & jewellery for your beloved Thakurji. Handcrafted
              with love, devotion, and the finest materials — from Vrindavan to your mandir.
            </p>
            {/* Social icons */}
            {/* Social icons removed for V1 (Zero Dead Click Policy) */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-cream mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-light hover:text-saffron-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-display text-base font-semibold text-cream mb-4">
              Shop Categories
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-light hover:text-saffron-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-display text-base font-semibold text-cream mb-4">
              Stay Connected
            </h3>
            <p className="text-sm text-warm-gray-light mb-4">
              Get blessed with early access to new collections & festival specials.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-warm-gray/20 border border-warm-gray/30 rounded-pill text-sm text-cream placeholder-warm-gray-light focus:outline-none focus:border-saffron/50 transition-colors"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-saffron-gradient text-white rounded-pill hover:shadow-gold transition-all cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-peacock-light mb-4">
                ✓ Radhe Radhe! You&apos;re subscribed.
              </p>
            )}

            {/* Contact */}
            <div className="space-y-2 text-sm text-warm-gray-light">
              <p>📧 seva@shreejisevabhav.com</p>
              <p>📞 +91 99999 99999</p>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-pill hover:bg-[#1EB554] transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Divider with lotus */}
        <div className="flex items-center gap-4 my-10">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-warm-gray/30" />
          <LotusIcon size={24} className="text-gold-start/40" />
          <PeacockFeatherIcon size={20} className="text-peacock/30" />
          <LotusIcon size={24} className="text-gold-start/40" />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-warm-gray/30" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-gray-light">
          <p>© {new Date().getFullYear()} Shreeji Seva Bhav. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-display italic">
            Made with <Heart size={12} className="text-saffron fill-saffron" /> & Seva — Shreeji Seva Bhav
          </p>
        </div>
      </div>
    </footer>
  );
}
