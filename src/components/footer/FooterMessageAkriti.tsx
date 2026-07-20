"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FooterMessageAkriti() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 relative z-10 text-center border-t border-gold-start/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="bg-white/60 backdrop-blur-xl border border-gold-start/30 rounded-[40px] p-8 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.05)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#5C1A1A]/5 to-transparent blur-[50px] pointer-events-none" />
        
        <h4 className="font-display text-2xl font-bold text-[#5C1A1A] tracking-wider mb-8 relative z-10">
          RADHE RADHE.
        </h4>
        
        <div className="w-12 h-[1px] bg-gold-start/50 mx-auto mb-8 relative z-10" />
        
        <div className="font-medium italic text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-12 space-y-6 relative z-10">
          <p>
            Thank you for lovingly becoming a part of our Divine Family.
          </p>
          <p>
            Every Divine Offering created by Shreeji Seva Bhav is prepared with Bhakti, Prem & Seva.
          </p>
          <p>
            May Shri Radha Raman Ji forever bless your beautiful family.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gold-start/30 shadow-sm mb-4">
            <Image
              src="https://images.unsplash.com/photo-1616239401777-6d2c49b6b772?q=80&w=200&auto=format&fit=crop"
              alt="Akriti Sharma"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F4E]">
            ~ Akriti Sharma
          </span>
          <span className="text-[8px] uppercase tracking-widest font-medium text-warm-gray mt-1">
            A Humble Servant of Thakurji
          </span>
        </div>
      </motion.div>
    </div>
  );
}
