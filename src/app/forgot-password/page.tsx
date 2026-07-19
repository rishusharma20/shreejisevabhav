"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Object.keys(data.errors).length > 0) {
          const firstErrorKey = Object.keys(data.errors)[0];
          throw new Error(data.errors[firstErrorKey]);
        }
        throw new Error(data.message || "Failed to send reset link");
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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements matching V1 aesthetics */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-saffron/10 to-lotus/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-gold-start/15 to-saffron/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="w-full max-w-md mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="forgot-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/40 backdrop-blur-[32px] border border-gold-start/40 p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(212,168,83,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] relative overflow-hidden"
            >
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8 space-y-1">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-saffron-deep mb-2"
                  >
                    Divine Recovery
                  </motion.div>

                  <h2 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
                    Forgot Password
                  </h2>
                  <p className="text-[11px] tracking-[0.15em] text-[#8B6F4E] uppercase font-bold">
                    Enter email to receive reset link
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs text-center font-bold">
                    {error}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray w-4 h-4 group-focus-within:text-gold-start transition-colors" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className={inputClasses} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(212,168,83,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white rounded-xl font-bold uppercase tracking-[0.15em] text-xs shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#5C1A1A] font-extrabold hover:text-saffron-deep transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Login
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/40 backdrop-blur-[32px] border border-gold-start/40 p-12 text-center rounded-[2rem] shadow-[0_20px_60px_rgba(212,168,83,0.15)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gold-start/10 blur-[30px] z-0 pointer-events-none animate-pulse" />
              
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
                  Email Sent
                </h3>
                <p className="text-xs tracking-wider font-bold text-[#8B6F4E] leading-relaxed max-w-[250px] mx-auto">
                  If an account exists for that email, a password reset link has been sent.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="relative z-10 mt-8"
              >
                <Link href="/login">
                  <button className="px-6 py-3 bg-white/70 backdrop-blur-md border border-gold-start/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5C1A1A] hover:bg-white hover:shadow-lg transition-all">
                    Return to Login
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
