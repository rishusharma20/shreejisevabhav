"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, CreditCard, ShoppingBag, Settings, LogOut, Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("adminPinVerified") === "true") {
      setIsPinVerified(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "630720") {
      sessionStorage.setItem("adminPinVerified", "true");
      setIsPinVerified(true);
      setError("");
    } else {
      setError("Invalid PIN Code");
      setPin("");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  if (!isPinVerified) {
    return (
      <div className="min-h-screen bg-cream bg-lotus-watermark flex items-center justify-center p-4">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(212,168,83,0.15)] border border-gold-start/40 max-w-md w-full relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-gold-start/20 to-saffron/10 rounded-full blur-[40px] pointer-events-none" />
          <div className="flex justify-center mb-6 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-gold-start to-saffron rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider text-center mb-2 relative z-10">Admin Access</h2>
          <p className="text-[11px] tracking-[0.15em] text-[#8B6F4E] uppercase font-bold text-center mb-8 relative z-10">Enter digital boutique security PIN</p>
          
          <form onSubmit={handlePinSubmit} className="space-y-4 relative z-10">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full text-center tracking-[1em] font-mono text-2xl py-4 bg-white/40 backdrop-blur-sm border border-gold-start/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all text-charcoal shadow-inner"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-600 text-center font-bold bg-red-50/50 py-2 rounded-lg border border-red-200/50">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white rounded-xl font-bold uppercase tracking-[0.15em] text-xs shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500"
            >
              Verify Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Collections", href: "/admin/collections", icon: FolderTree },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-cream bg-lotus-watermark pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-gold-start/20 flex flex-col hidden md:flex h-full fixed top-20 bottom-0 shadow-[4px_0_24px_rgba(212,168,83,0.05)]">
        <div className="p-6 border-b border-gold-start/10">
          <h2 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-wider">Admin Panel</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6F4E] mt-1">Shreeji Seva Bhav</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-gold-start/15 text-saffron-deep shadow-sm"
                        : "text-charcoal/70 hover:bg-gold-start/5 hover:text-saffron-deep"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-saffron-deep" : "text-warm-gray"}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gold-start/10">
          <button
            onClick={() => {
              sessionStorage.removeItem("adminPinVerified");
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto md:ml-64 relative z-10">
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
