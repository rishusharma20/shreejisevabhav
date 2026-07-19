"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AuthForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectPath, setRedirectPath] = useState("/my-seva");
  const [isLogin, setIsLogin] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // If it's a validation error with an errors object, extract the first error message
        if (data.errors && Object.keys(data.errors).length > 0) {
          const firstErrorKey = Object.keys(data.errors)[0];
          throw new Error(data.errors[firstErrorKey]);
        }
        throw new Error(data.message || "Authentication failed");
      }

      // Success
      await setAuthCookie(data.data.accessToken);

      // Simple Base64 decode to check role
      try {
        const parts = data.data.accessToken.split(".");
        if (parts.length === 3) {
          const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(payloadBase64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const decoded = JSON.parse(jsonPayload);
          
          if (decoded.role === "ADMIN") {
            setRedirectPath("/admin");
          }
        }
      } catch (err) {
        console.error("Failed to decode token on client");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-white/40 backdrop-blur-xl border border-gold-start/20 rounded-xl px-11 py-3.5 text-sm text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] hover:bg-white/50";

  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray w-4 h-4";

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/40 backdrop-blur-[32px] border border-gold-start/40 p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(212,168,83,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] relative overflow-hidden"
          >
            {/* Subtle inner mandala glows (Vision OS inspired) */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-gold-start/20 to-saffron/10 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-lotus/15 to-saffron-muted/20 rounded-full blur-[40px] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 space-y-1">
                {/* Jai Shri Radhe Greeting */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-saffron-deep mb-2"
                >
                  Jai Shri Radhe
                </motion.div>

                <motion.h2
                  key={isLogin ? "login-title" : "signup-title"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2"
                >
                  {isLogin ? "Welcome Back" : "Begin Your Journey"}
                </motion.h2>
                <p className="text-[11px] tracking-[0.15em] text-[#8B6F4E] uppercase font-bold">
                  {isLogin ? "Enter the digital temple boutique" : "Join Shreeji Seva Bhav"}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs text-center font-bold">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden group"
                    >
                      <User className={`${iconClasses} group-focus-within:text-gold-start transition-colors`} />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className={inputClasses} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group">
                  <Mail className={`${iconClasses} group-focus-within:text-gold-start transition-colors`} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className={inputClasses} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="relative group">
                  <Lock className={`${iconClasses} group-focus-within:text-gold-start transition-colors`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={inputClasses}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-gold-start transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Forgot Password removed for V1 */ }

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(212,168,83,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white rounded-xl font-bold uppercase tracking-[0.15em] text-xs shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                >
                  {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Social Auth removed for V1 (Zero Dead Click Policy) */}

              {/* Toggle Mode & Guest Link */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-[11px] text-warm-gray font-bold tracking-wider uppercase">
                  {isLogin ? "New to Shreeji Seva Bhav?" : "Already a member?"}{" "}
                  <button
                    onClick={toggleAuthMode}
                    className="text-[#5C1A1A] font-extrabold tracking-widest hover:text-saffron-deep transition-colors uppercase ml-1 relative group"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron-deep transition-all group-hover:w-full"></span>
                  </button>
                </p>

                <div>
                  <Link
                    href="/"
                    className="inline-block text-[10px] uppercase tracking-[0.2em] text-warm-gray font-bold hover:text-charcoal transition-colors relative group"
                  >
                    Continue as Guest
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal transition-all group-hover:w-full"></span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Premium Login Success Animation ── */
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/40 backdrop-blur-[32px] border border-gold-start/40 p-12 text-center rounded-[2rem] shadow-[0_20px_60px_rgba(212,168,83,0.15)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
          >
            {/* Glowing backdrop for success */}
            <div className="absolute inset-0 bg-gold-start/10 blur-[30px] z-0 pointer-events-none animate-pulse" />
            
            {/* Floating lotus petals in success state */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-0 pointer-events-none"
                initial={{ y: -50, opacity: 0, rotate: 0 }}
                animate={{ y: 500, opacity: [0, 1, 0], rotate: 360, x: Math.random() * 100 - 50 }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                style={{ left: `${15 + Math.random() * 70}%` }}
              >
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5 C10 18 10 32 20 35 C30 32 30 18 20 5 Z" fill="#FFB7B2" opacity="0.8" />
                </svg>
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-gold-start to-saffron flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,168,83,0.5)]"
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 space-y-3"
            >
              <h3 className="font-display text-2xl font-extrabold text-[#5C1A1A] tracking-widest uppercase">
                Jai Shri Radhe
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6F4E]">
                Welcome To Shreeji Seva Bhav
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="relative z-10 mt-8"
            >
              <Link href={redirectPath}>
                <button className="px-6 py-3 bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5C1A1A] hover:bg-white hover:shadow-lg transition-all">
                  Continue to Temple
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
