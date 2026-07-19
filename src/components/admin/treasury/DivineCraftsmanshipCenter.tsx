"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronRight, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AiDivineCurator from "./AiDivineCurator";

const CRAFT_STAGES = [
  { id: 1, label: "SELECT COLLECTION", title: "Which Divine Collection does this belong to?" },
  { id: 2, label: "ADD DIVINE DETAILS", title: "Describe the beautiful details of this Offering." },
  { id: 3, label: "VARIANT DETAILS", title: "Add Sizing, Pricing and Stock." },
  { id: 4, label: "ADD PREMIUM IMAGES", title: "Upload Ultra HD Images & 360° Views." },
  { id: 5, label: "COMPLETE OFFERING", title: "The Divine Offering is beautifully prepared." }
];

const CATEGORIES = ["radha-dresses", "krishna-vastra", "jewellery", "mukut", "shringar"];

export default function DivineCraftsmanshipCenter() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // Form State
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  
  const [formData, setFormData] = useState({
    collectionId: "",
    category: "",
    name: "",
    shortDescription: "",
    description: "",
    size: "",
    price: "",
    quantity: "",
  });
  
  const [images, setImages] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/collections");
        const data = await res.json();
        if (data.success) {
          setCollections(data.data.collections || []);
        }
      } catch (err) {
        console.error("Failed to fetch collections", err);
      } finally {
        setIsLoadingCollections(false);
      }
    };
    fetchCollections();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      
      // 1. Create Product
      const productPayload = {
        name: formData.name,
        shortDescription: formData.shortDescription,
        description: formData.description,
        collectionId: formData.collectionId,
        category: formData.category
      };
      
      const prodRes = await fetch("http://localhost:8000/api/v1/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productPayload)
      });
      
      const prodData = await prodRes.json();
      
      if (!prodRes.ok) {
        throw new Error(prodData.message || "Failed to create product");
      }
      
      const productId = prodData.data.product._id;
      
      // 2. Create Variant with Images
      const variantFormData = new FormData();
      variantFormData.append("size", formData.size);
      variantFormData.append("price", formData.price);
      variantFormData.append("quantity", formData.quantity);
      
      if (images) {
        for (let i = 0; i < images.length; i++) {
          variantFormData.append("images", images[i]);
        }
      }
      
      const varRes = await fetch(`http://localhost:8000/api/v1/products/${productId}/variants`, {
        method: "POST",
        credentials: "include",
        body: variantFormData
      });
      
      if (!varRes.ok) {
        throw new Error("Failed to create variant");
      }
      
      // Success
      setDirection(1);
      setCurrentStep(5); // Move to complete stage
      router.refresh();
      
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 4) {
      submitForm();
      return;
    }
    
    if (currentStep < 5) {
      setDirection(1);
      setCurrentStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1 && currentStep < 5) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0, filter: "blur(4px)" }),
    center: { zIndex: 1, x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 50 : -50, opacity: 0, filter: "blur(4px)" })
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 relative z-10 mb-20">
      
      {/* PROGRESS INDICATOR */}
      <div className="flex flex-wrap justify-center md:justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold-start/20 -translate-y-1/2 hidden md:block z-0" />
        
        {CRAFT_STAGES.map((stage) => {
          const isActive = currentStep === stage.id;
          const isCompleted = currentStep > stage.id;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2 w-1/3 md:w-auto mb-6 md:mb-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-rose-100 text-rose-500 border border-rose-200 scale-110 shadow-md' :
                isCompleted ? 'bg-gold-start/10 text-gold-start border border-gold-start/30' :
                'bg-white text-charcoal/30 border border-charcoal/10'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{stage.id}</span>}
              </div>
              <span className={`text-[8px] uppercase tracking-widest font-bold text-center ${
                isActive ? 'text-[#5C1A1A]' : 'text-charcoal/50'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STAGE CONTENT */}
      <div className="bg-white/70 backdrop-blur-xl border border-gold-start/40 rounded-[40px] p-8 md:p-16 shadow-[0_20px_50px_rgba(212,168,83,0.1)] relative overflow-hidden min-h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col"
          >
            <h4 className="font-display text-2xl md:text-3xl font-bold text-[#5C1A1A] tracking-wider mb-8 text-center uppercase">
              {CRAFT_STAGES[currentStep - 1].title}
            </h4>

            <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
              
              {currentStep === 1 && (
                <div className="w-full max-w-xl space-y-6">
                  {isLoadingCollections ? (
                    <div className="text-center text-charcoal/50">Loading Collections...</div>
                  ) : (
                    <>
                      <select 
                        name="collectionId" 
                        value={formData.collectionId} 
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal font-bold tracking-wider"
                      >
                        <option value="">Select a Collection</option>
                        {collections.map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>

                      <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal font-bold tracking-wider uppercase"
                      >
                        <option value="">Select a Category</option>
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c.replace("-", " ")}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="w-full max-w-xl space-y-4">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Divine Offering Name" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider" />
                  <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} placeholder="Short Description (1 sentence)" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider text-sm" />
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the handcrafted details..." className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 h-24 resize-none" />
                </div>
              )}

              {currentStep === 3 && (
                <div className="w-full max-w-xl space-y-4">
                  <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="Size (e.g., Size-4 or M)" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider" />
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (₹)" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider" />
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Inventory Stock (Quantity)" className="w-full bg-transparent border-b border-gold-start/30 p-4 outline-none text-charcoal placeholder-charcoal/40 font-bold tracking-wider" />
                </div>
              )}

              {currentStep === 4 && (
                <div className="w-full max-w-xl flex flex-col items-center">
                  <label htmlFor="image-upload" className="w-full h-40 border-2 border-dashed border-gold-start/40 rounded-3xl flex flex-col items-center justify-center text-charcoal/50 hover:bg-gold-start/5 hover:border-gold-start/60 transition-colors cursor-pointer gap-2">
                    <ImageIcon className="w-8 h-8 text-gold-start/50" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                      {images ? `${images.length} Image(s) Selected` : "Select Ultra HD Images"}
                    </span>
                  </label>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </div>
              )}

              {currentStep === 5 && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gold-start/10 text-gold-start flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h5 className="font-display text-2xl font-bold text-[#5C1A1A] mb-2">Beautifully Accepted.</h5>
                  <p className="text-xs uppercase tracking-widest font-bold text-[#8B6F4E]">
                    Now Blessing The Divine Family
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between items-center mt-12 border-t border-gold-start/20 pt-8">
                {currentStep > 1 ? (
                  <button onClick={prevStep} disabled={isSubmitting} className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 hover:text-[#5C1A1A] transition-colors disabled:opacity-50">
                    Go Back
                  </button>
                ) : <div />}
                
                <button 
                  onClick={nextStep} 
                  disabled={isSubmitting || (currentStep === 1 && (!formData.collectionId || !formData.category))}
                  className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2B2B] text-white rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep === 4 ? "Craft Offering" : "Continue"} 
                  {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
