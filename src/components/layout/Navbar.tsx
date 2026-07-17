"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, MessageCircle } from "lucide-react";
import Image from "next/image";
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

// ── PREMIUM LOGO COMPONENT: Renders the beautiful Radha Krishna medallion, cropping out the bottom text using CSS ──
export const ShreejiLogo = ({ size = 68 }: { size?: number }) => {
  // To display the top circular medallion and crop out the bottom text, we use a 1:0.78 aspect-ratio crop
  const cropHeight = Math.round(size * 0.78);
  return (
    <div 
      className="relative overflow-hidden select-none pointer-events-none rounded-full flex items-center justify-center"
      style={{ width: `${size}px`, height: `${cropHeight}px` }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src="/images/logo.png"
          alt="Shreeji Seva Bhav Premium Medallion Emblem"
          width={size}
          height={size}
          priority
          className="object-cover object-top filter contrast-[1.01] brightness-[1.01]"
        />
      </div>
    </div>
  );
};;

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
