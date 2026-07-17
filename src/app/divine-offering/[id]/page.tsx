"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OfferingGallery from "@/components/offering/OfferingGallery";
import OfferingDetails from "@/components/offering/OfferingDetails";
import OfferingStory from "@/components/offering/OfferingStory";
import CompleteOffering from "@/components/offering/CompleteOffering";
import { useParams } from "next/navigation";

export default function DivineOfferingPage() {
  const params = useParams();
  // Using a mock offering for now based on the dynamic ID
  const offeringId = params.id as string;
  const isJewellery = offeringId?.startsWith("al-");

  const mockOffering = {
    title: isJewellery ? "Pure Gold Plated Peacock Mukut" : "Midnight Blue Zardozi Vastra",
    price: isJewellery ? "₹8,500" : "₹4,100",
    category: isJewellery ? "Mukut Collections" : "Premium Zardozi",
    deity: isJewellery ? "Shri Radha Raman Ji" : "Shri Radha Raman Ji",
    sizes: isJewellery ? ["Standard", "Large"] : ["Size 2", "Size 3", "Size 4"],
    isPremium: true,
    festival: "Janmashtami",
    images: ["/placeholder1.png", "/placeholder2.png", "/placeholder3.png", "/placeholder4.png"],
  };

  return (
    <main className="min-h-screen w-full bg-[#FFFBF4] relative overflow-hidden pb-24 pt-32">
      
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#FFF5E6] to-transparent opacity-60" />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2 }}
          className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-radial from-gold-start/20 via-[#FFF3DF]/50 to-transparent filter blur-[100px]" 
        />
      </div>

      {/* ── DIVINE BREADCRUMBS ── */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-8 relative z-50 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
        <Link href="/" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Temple</Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <Link href="/collections" className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <Link href={isJewellery ? "/jewellery" : "/krishna-vastra"} className="text-[#8B6F4E] hover:text-[#5C1A1A] transition-colors">
          {isJewellery ? "Ratna Alankaar" : "Krishna Vastra"}
        </Link>
        <ChevronRight className="w-3 h-3 text-gold-start/50" />
        <span className="text-[#5C1A1A]">{mockOffering.title}</span>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── TOP FOLD (GALLERY + DETAILS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <OfferingGallery images={mockOffering.images} title={mockOffering.title} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="sticky top-32"
          >
            <OfferingDetails 
              title={mockOffering.title}
              price={mockOffering.price}
              category={mockOffering.category}
              deity={mockOffering.deity}
              sizes={mockOffering.sizes}
              isPremium={mockOffering.isPremium}
            />
          </motion.div>
        </div>

        {/* ── THE STORY SECTION ── */}
        <OfferingStory festival={mockOffering.festival} />

        {/* ── COMPLETE YOUR DIVINE OFFERING ── */}
        <CompleteOffering offeringType={isJewellery ? "jewellery" : "poshak"} />

      </div>
    </main>
  );
}
