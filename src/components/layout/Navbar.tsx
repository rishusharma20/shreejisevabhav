"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import MobileDrawer from "./MobileDrawer";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Radha Dresses", href: "/radha-dresses", hasDropdown: true },
  { label: "Krishna Vastra", href: "/krishna-vastra", hasDropdown: true },
  { label: "Jewellery Sets", href: "/jewellery", hasDropdown: true },
  { label: "About Us", href: "/about", hasDropdown: false },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

// ── NEW PREMIUM VECTOR LOGO: Shri Radha Krishna Silhouette, Radha Rani Mahal, Flute, Peacock Feather, Lotus & Ghungroo ──
export const ShreejiLogo = ({ size = 68 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_2px_8px_rgba(212,168,83,0.25)] select-none pointer-events-none">
    <defs>
      {/* High-end metallic gold gradients */}
      <linearGradient id="logo-gold-metallic" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="25%" stopColor="#FDEAA8" />
        <stop offset="50%" stopColor="#D4A853" />
        <stop offset="75%" stopColor="#AA8232" />
        <stop offset="100%" stopColor="#705219" />
      </linearGradient>
      {/* Peacock gem colors */}
      <radialGradient id="logo-peacock-gem" cx="50%" cy="35%" r="30%">
        <stop offset="0%" stopColor="#00F5D4" />
        <stop offset="50%" stopColor="#00BBF9" />
        <stop offset="100%" stopColor="#03045E" />
      </radialGradient>
      {/* Ruby red highlights */}
      <linearGradient id="logo-ruby-red" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF4D4D" />
        <stop offset="100%" stopColor="#990000" />
      </linearGradient>
    </defs>

    {/* 1. Circular Temple Arch Boundary with Beaded Details */}
    <circle cx="60" cy="60" r="54" stroke="url(#logo-gold-metallic)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="51" stroke="url(#logo-gold-metallic)" strokeWidth="0.75" strokeDasharray="3 3" />

    {/* 2. Radha Rani Mahal Silhouette (Temple Domes & Spire) */}
    {/* Center Dome/Spire */}
    <path d="M 60 16 C 58 22 55 24 55 28 L 65 28 C 65 24 62 22 60 16 Z" fill="url(#logo-gold-metallic)" />
    <path d="M 50 36 C 50 28 70 28 70 36 L 50 36 Z" fill="url(#logo-gold-metallic)" opacity="0.85" />
    {/* Left Side Dome */}
    <path d="M 38 42 C 38 36 48 36 48 42 L 38 42 Z" fill="url(#logo-gold-metallic)" opacity="0.7" />
    {/* Right Side Dome */}
    <path d="M 72 42 C 72 36 82 36 82 42 L 72 42 Z" fill="url(#logo-gold-metallic)" opacity="0.7" />

    {/* 3. Temple Pillars and Archways */}
    <rect x="52" y="36" width="2" height="18" fill="url(#logo-gold-metallic)" />
    <rect x="66" y="36" width="2" height="18" fill="url(#logo-gold-metallic)" />
    <rect x="42" y="42" width="1.5" height="12" fill="url(#logo-gold-metallic)" opacity="0.7" />
    <rect x="76" y="42" width="1.5" height="12" fill="url(#logo-gold-metallic)" opacity="0.7" />
    {/* Arch Curves */}
    <path d="M 52 38 C 55 35 65 35 66 38" stroke="url(#logo-gold-metallic)" strokeWidth="1" />
    <path d="M 42 43 C 45 41 50 41 52 43" stroke="url(#logo-gold-metallic)" strokeWidth="0.8" opacity="0.7" />
    <path d="M 68 43 C 70 41 75 41 76 43" stroke="url(#logo-gold-metallic)" strokeWidth="0.8" opacity="0.7" />

    {/* 4. Shri Radha Krishna Silhouette Motif (Centered in the archway) */}
    {/* Krishna's Crown and tilt */}
    <path d="M 53 44 C 54 41 58 41 59 44 L 56 46 Z" fill="url(#logo-gold-metallic)" />
    {/* Radha's Crown and veil curve */}
    <path d="M 62 45 C 64 43 67 43 68 46 L 65 47 Z" fill="url(#logo-gold-metallic)" />
    {/* Combined blessing posture/profiles */}
    <path d="M 51 55 C 51 48 69 48 69 55 C 69 59 51 59 51 55 Z" fill="url(#logo-gold-metallic)" opacity="0.9" />

    {/* 5. Shri Krishna's Mor Pankh (Peacock Feather - emerging from behind the temple spire) */}
    <g transform="translate(68, 14) rotate(22) scale(0.35)">
      {/* Stem */}
      <path d="M 50 140 C 50 90 48 40 50 10" stroke="url(#logo-gold-metallic)" strokeWidth="4" />
      {/* Eye outer */}
      <ellipse cx="50" cy="40" rx="25" ry="30" fill="url(#logo-gold-metallic)" />
      {/* Eye mid (Emerald/Sapphire) */}
      <ellipse cx="50" cy="40" rx="16" ry="20" fill="url(#logo-peacock-gem)" />
      {/* Eye inner */}
      <ellipse cx="50" cy="40" rx="8" ry="10" fill="#03045E" />
      {/* Shimmer */}
      <circle cx="47" cy="36" r="2" fill="#FFF" />
    </g>

    {/* 6. Shri Krishna's Murli (Flute - crossing diagonally behind/below the profiles) */}
    <g transform="translate(15, 68) rotate(-8) scale(0.45)">
      <rect x="10" y="20" width="180" height="8" rx="4" fill="url(#logo-gold-metallic)" />
      {/* Bindings */}
      <rect x="25" y="19" width="3" height="10" fill="url(#logo-ruby-red)" />
      <rect x="75" y="19" width="3" height="10" fill="url(#logo-ruby-red)" />
      <rect x="125" y="19" width="3" height="10" fill="url(#logo-ruby-red)" />
      {/* Hanging Silk Tassels */}
      <path d="M 183 24 Q 192 36 188 46" stroke="url(#logo-gold-metallic)" strokeWidth="2.5" />
      <circle cx="188" cy="46" r="4" fill="url(#logo-ruby-red)" />
    </g>

    {/* 7. Divine Lotus Petals (Blossoming at the base of the logo) */}
    <g transform="translate(18, 72) scale(0.7)">
      {/* Center main petal */}
      <path d="M60 65 C48 50 45 15 60 5 C75 15 72 50 60 65 Z" fill="url(#logo-gold-metallic)" />
      {/* Left side petals */}
      <path d="M60 65 C35 55 30 25 45 15 C52 25 58 45 60 65 Z" fill="url(#logo-gold-metallic)" opacity="0.85" />
      <path d="M60 65 C20 62 18 35 32 28 C40 35 48 50 60 65 Z" fill="url(#logo-gold-metallic)" opacity="0.65" />
      {/* Right side petals */}
      <path d="M60 65 C85 55 90 25 75 15 C68 25 62 45 60 65 Z" fill="url(#logo-gold-metallic)" opacity="0.85" />
      <path d="M60 65 C100 62 102 35 88 28 C80 35 72 50 60 65 Z" fill="url(#logo-gold-metallic)" opacity="0.65" />
    </g>

    {/* 8. Small hanging bells (Ghungroos) at the base circle */}
    <circle cx="60" cy="113" r="2.5" fill="url(#logo-gold-metallic)" />
    <circle cx="45" cy="110" r="2" fill="url(#logo-gold-metallic)" opacity="0.8" />
    <circle cx="75" cy="110" r="2" fill="url(#logo-gold-metallic)" opacity="0.8" />
    <circle cx="32" cy="102" r="1.8" fill="url(#logo-gold-metallic)" opacity="0.6" />
    <circle cx="88" cy="102" r="1.8" fill="url(#logo-gold-metallic)" opacity="0.6" />
  </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 80], ["96px", "72px"]);
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.9]);
  const navShadow = useTransform(
    scrollY,
    [0, 50],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 25px rgba(212,168,83,0.06)"]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{ boxShadow: navShadow, height: headerHeight }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-[#D4A853]/25 flex items-center ${
          isScrolled ? "bg-[#FFFBF4]/80 backdrop-blur-[20px]" : "bg-[#FFFBF4]"
        }`}
      >
        {/* Subtle gold line at bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A853]/35 to-transparent" />

        {/* ── DESKTOP & TABLET VIEWPORT (LG / MD) ── */}
        <div className="hidden lg:flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
          {/* Logo & Live Brand Typography */}
          <a href="/" className="flex items-center gap-3.5 shrink-0 group" aria-label="Shreeji Seva Bhav - Home">
            <motion.div
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.04 }}
              className="relative cursor-pointer transition-all duration-300 hover:drop-shadow-[0_4px_16px_rgba(212,168,83,0.35)]"
            >
              {/* Desktop logo size (72px) */}
              <ShreejiLogo size={72} />
            </motion.div>
            <div>
              <span className="font-display text-lg font-bold tracking-widest block leading-none hover:text-gold-start transition-colors duration-300" style={{ color: "#5C1A1A" }}>
                SHREEJI SEVA BHAV
              </span>
              <span className="block text-[8px] tracking-[0.28em] uppercase mt-1.5 font-bold" style={{ color: "#8B6F4E" }}>
                Divine Clothing & Jewellery
              </span>
            </div>
          </a>

          {/* Desktop nav links with dropdown chevrons */}
          <div className="flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1 px-3 py-2 text-[13px] tracking-wide font-semibold text-charcoal transition-colors group whitespace-nowrap"
                style={{ color: "#3D2E24" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#5C1A1A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3D2E24")}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown size={11} className="text-warm-gray group-hover:text-gold-start transition-all duration-300 transform group-hover:translate-y-0.5" />
                )}
                {/* Golden underline sweep */}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-gold-start to-gold-end scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-charcoal hover:text-gold-start transition-colors rounded-full hover:bg-[#D4A853]/5 cursor-pointer"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Button */}
            <a
              href="/wishlist"
              className="relative p-2.5 text-charcoal hover:text-gold-start transition-colors rounded-full hover:bg-[#D4A853]/5"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] bg-[#D4A853] text-[#3D2E24] text-[9px] font-extrabold flex items-center justify-center rounded-full border border-cream"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </a>

            {/* Cart Button */}
            <a
              href="/cart"
              className="relative p-2.5 text-charcoal hover:text-gold-start transition-colors rounded-full hover:bg-[#D4A853]/5"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] text-[9px] font-extrabold flex items-center justify-center rounded-full border border-cream shadow-sm"
                  style={{ background: "linear-gradient(135deg, #D4A853, #F0D78C)", color: "#3D2E24" }}
                >
                  {totalItems}
                </motion.span>
              )}
            </a>

            {/* User Login */}
            <a
              href="/login"
              className="flex items-center gap-1.5 px-4.5 py-2 text-[11px] uppercase tracking-wider font-bold rounded-pill border transition-all duration-300"
              style={{ color: "#5C1A1A", borderColor: "rgba(212, 168, 83, 0.4)" }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = "#5C1A1A";
                e.currentTarget.style.background = "rgba(92, 26, 26, 0.03)";
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.4)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <User size={13} />
              <span>Login</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold text-white rounded-pill transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
              style={{ 
                background: "linear-gradient(135deg, #4F1313, #6B2323)",
                boxShadow: "0 2px 10px rgba(79, 19, 19, 0.15)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 168, 83, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(79, 19, 19, 0.15)";
              }}
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* ── MOBILE & TABLET VIEWPORT (LG HIDDEN) ── */}
        <div className="flex lg:hidden items-center justify-between gap-2 w-full px-4 max-w-7xl mx-auto h-full">
          {/* Mobile Logo & Live Brand Typography (Never hidden!) */}
          <a href="/" className="flex items-center gap-2 shrink-0 group" aria-label="Shreeji Seva Bhav - Home">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="relative cursor-pointer transition-all duration-300"
            >
              {/* Mobile logo size (48px) */}
              <ShreejiLogo size={48} />
            </motion.div>
            <div>
              <span className="font-display text-sm font-bold tracking-widest block leading-none" style={{ color: "#5C1A1A" }}>
                SHREEJI SEVA BHAV
              </span>
              <span className="block text-[7px] tracking-[0.2em] uppercase mt-0.5 font-bold" style={{ color: "#8B6F4E" }}>
                Divine Boutique
              </span>
            </div>
          </a>

          {/* Right Action Controls for Mobile (LOGO + SHREEJI SEVA BHAV + Search + Cart + Hamburger Menu) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-charcoal hover:text-gold-start transition-colors rounded-full"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Cart Icon with badge */}
            <a
              href="/cart"
              className="relative p-2 text-charcoal hover:text-gold-start transition-colors rounded-full"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute top-0 right-0 min-w-[14px] h-[14px] text-[8px] font-extrabold flex items-center justify-center rounded-full border border-cream shadow-sm"
                  style={{ background: "linear-gradient(135deg, #D4A853, #F0D78C)", color: "#3D2E24" }}
                >
                  {totalItems}
                </motion.span>
              )}
            </a>

            {/* Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-charcoal hover:text-gold-start transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search Overlay Bar */}
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </motion.header>

      {/* Mobile Drawer (Wishlist, Login and WhatsApp are nested inside drawer on mobile) */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
