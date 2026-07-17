"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import DivineCollections from "@/components/sections/DivineCollections";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FestivalCollection from "@/components/sections/FestivalCollection";
import BhaktiGallery from "@/components/sections/BhaktiGallery";
import Testimonials from "@/components/sections/Testimonials";
import DivineIntro from "@/components/ui/DivineIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenDivineIntro");
    if (hasSeen === "true") {
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }
  }, []);

  if (showIntro === null) {
    return <div className="fixed inset-0 bg-[#FFFBF4] z-50" />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <DivineIntro key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={showIntro ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        {/* Navbar and Announcement Bar fade from top */}
        <motion.div
          initial={showIntro ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: showIntro ? 0.3 : 0, ease: "easeOut" }}
          className="z-40"
        >
          <AnnouncementBar />
          <Navbar />
        </motion.div>

        {/* Hero & sections appear with upward slide */}
        <motion.main
          id="main-content"
          initial={showIntro ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: showIntro ? 0.5 : 0, ease: "easeOut" }}
          className="flex-grow"
        >
          <HeroSection />
          <DivineCollections />
          <FeaturedProducts />
          <WhyChooseUs />
          <FestivalCollection />
          <BhaktiGallery />
          <Testimonials />
        </motion.main>

        <Footer />
      </motion.div>
    </>
  );
}
