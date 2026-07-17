"use client";

import { motion } from "framer-motion";
import { Sparkles, History, Scroll } from "lucide-react";

interface OfferingStoryProps {
  festival?: string;
}

export default function OfferingStory({ festival }: OfferingStoryProps) {
  return (
    <div className="w-full mt-24 mb-16 relative">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#5C1A1A] tracking-wider mb-2">
          The Story of this Divine Offering
        </h2>
        <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
          A Journey of Bhakti, Prem, and Seva
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Story Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center border border-gold-start/30">
              <Scroll className="w-5 h-5 text-gold-start" />
            </div>
            <div>
              <h3 className="text-[12px] uppercase tracking-widest font-bold text-charcoal">Sacred Inspiration</h3>
              <p className="text-[10px] text-warm-gray uppercase tracking-widest">Inspired by the Leelas of Vrindavan</p>
            </div>
          </div>

          <p className="text-sm text-warm-gray leading-relaxed text-justify">
            Every motif woven into this offering carries the essence of Vrindavan. The design is heavily inspired by the ancient temple architecture and the flora that surrounds the sacred Yamuna river. 
            {festival ? ` Crafted specifically with the mood of ${festival} in mind, it utilizes colors and gems that reflect the joyous celebrations of this divine pastime.` : ` It is crafted to bring a serene, majestic aura to Thakurji's daily darshan.`}
          </p>

          <p className="text-sm text-warm-gray leading-relaxed text-justify">
            It takes our master artisans weeks to prepare a single offering. They sit in meditation, listening to Bhajans, ensuring that the energy imbued within the fabric is that of pure devotion (*Prem*). This is not a garment; it is a prayer rendered in silk and gold.
          </p>
        </motion.div>

        {/* Visual / Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-cream/40 z-0 border border-gold-start/20 rounded-3xl" />
          
          <div 
            className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%238B6F4E' letter-spacing='3' opacity='0.3'%3EARTISAN CRAFTSMANSHIP%3C/text%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20 flex flex-col justify-end p-8">
            <h4 className="text-white font-display text-2xl font-bold tracking-wider mb-2">Handcrafted in Vrindavan</h4>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-start" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/90">24 Days of Seva</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
