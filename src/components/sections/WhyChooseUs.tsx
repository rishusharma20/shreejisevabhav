"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { features } from "@/lib/seed-data";
import {
  Heart,
  Sparkles,
  Shield,
  Truck,
  RefreshCw,
  Calendar,
  Headphones,
} from "lucide-react";
import { LotusIcon } from "@/components/icons/DevotionalIcons";

const iconMap: Record<string, React.ReactNode> = {
  lotus: <LotusIcon size={28} className="text-saffron" />,
  sparkles: <Sparkles size={28} className="text-saffron" />,
  heart: <Heart size={28} className="text-saffron" />,
  shield: <Shield size={28} className="text-saffron" />,
  truck: <Truck size={28} className="text-saffron" />,
  refresh: <RefreshCw size={28} className="text-saffron" />,
  calendar: <Calendar size={28} className="text-saffron" />,
  headset: <Headphones size={28} className="text-saffron" />,
};

export default function WhyChooseUs() {
  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream-dark/50 content-below-fold"
      aria-label="Why Choose Shreeji Seva Bhav"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose Shreeji Seva Bhav?"
          subtitle="Not just a store — a seva. Every piece carries the energy of devotion, quality, and care."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group bg-white rounded-card p-6 text-center hover:shadow-card-hover transition-all duration-500 border border-transparent hover:border-gold-start/20"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-saffron/10 flex items-center justify-center group-hover:bg-saffron/15 group-hover:scale-110 transition-all duration-500">
                {iconMap[feature.icon]}
              </div>

              {/* Title */}
              <h3 className="font-display text-base font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-warm-gray leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
