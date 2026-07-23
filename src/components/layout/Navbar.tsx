"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, MessageCircle, LogOut } from "lucide-react";
import { LotusIcon, PeacockFeatherIcon } from "@/components/icons/DevotionalIcons";
import { useCart } from "@/context/CartContext";
import { checkAuth, removeAuthCookie } from "@/app/actions/auth";

import MobileDrawer from "./MobileDrawer";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Festive Offers", href: "/collections/festive-offers", hasDropdown: true },
  { label: "Poshaks", href: "/collections/thakurjis-summer-collection", hasDropdown: true },
  { label: "Jewellery", href: "/collections/divine-jewelry", hasDropdown: true },
];

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  const handleLogout = async () => {
    await removeAuthCookie();
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-gold-start/5 transform-gpu ${
          isScrolled ? "bg-cream/95 backdrop-blur-md py-1 shadow-[0_2px_24px_rgba(45,42,38,0.08)]" : "bg-cream py-2 shadow-none"
        }`}
      >
        {/* Subtle gold line at bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-start/20 to-transparent" />

        <motion.nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Shreeji Seva Bhav - Home">
              <div className="relative">
                <PeacockFeatherIcon size={34} className="text-peacock transition-transform duration-500 group-hover:rotate-3" />
                <LotusIcon size={12} className="absolute -bottom-0.5 -right-1 text-saffron" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-lg font-bold tracking-wide block leading-none" style={{ color: "#5C1A1A" }}>
                  Shreeji Seva Bhav
                </span>
                <span className="block text-[8px] tracking-[0.25em] uppercase mt-1" style={{ color: "#8B6F4E" }}>
                  Divine Clothing & Jewellery
                </span>
              </div>
            </a>

            {/* Desktop nav links with dropdown chevrons */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-1 px-3 py-2 text-[13px] tracking-wide font-medium text-charcoal transition-colors group whitespace-nowrap"
                  style={{ color: "#3D2E24" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#5C1A1A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3D2E24")}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={11} className="text-warm-gray group-hover:text-saffron-deep transition-all duration-300 transform group-hover:translate-y-0.5" />
                  )}
                  {/* Golden underline sweep */}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-gold-start to-gold-end scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal hover:text-saffron-deep transition-colors rounded-full hover:bg-saffron/5 cursor-pointer"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Cart with live count badge */}
              <a
                href="/cart"
                className="relative p-2 text-charcoal hover:text-saffron-deep transition-colors rounded-full hover:bg-saffron/5"
                aria-label={`Cart (${totalItems} items)`}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={totalItems}
                    className="absolute top-0 right-0 min-w-[16px] h-[16px] text-[9px] font-bold flex items-center justify-center rounded-full border border-cream/50 shadow-sm"
                    style={{ background: "linear-gradient(135deg, #D4A853, #F0D78C)", color: "#3D2E24" }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </a>

              {/* Login / Logout */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1 px-4 py-2 text-[12px] uppercase tracking-wider font-semibold rounded-pill border transition-all duration-300 cursor-pointer"
                  style={{ color: "#5C1A1A", borderColor: "rgba(212, 168, 83, 0.3)" }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.borderColor = "#5C1A1A";
                    e.currentTarget.style.background = "rgba(92, 26, 26, 0.03)";
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <LogOut size={13} />
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="hidden sm:flex items-center gap-1 px-4 py-2 text-[12px] uppercase tracking-wider font-semibold rounded-pill border transition-all duration-300"
                  style={{ color: "#5C1A1A", borderColor: "rgba(212, 168, 83, 0.3)" }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.borderColor = "#5C1A1A";
                    e.currentTarget.style.background = "rgba(92, 26, 26, 0.03)";
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <User size={13} />
                  Login
                </a>
              )}

              {/* WhatsApp — deep maroon pill with subtle gold hover glow */}
              <a
                href="https://wa.me/918869996210"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold text-white rounded-pill transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
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
                WhatsApp Us
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-charcoal hover:text-saffron-deep transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </motion.nav>
      </header>

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
