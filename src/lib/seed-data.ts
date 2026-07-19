/* ═══════════════════════════════════════════════════════════════
   Shreeji Seva Bhav — Seed Data
   Realistic devotional product catalog with Indian naming
   ═══════════════════════════════════════════════════════════════ */

import type { Product, Category, Festival, Testimonial, GalleryImage } from "./types";

// ── Categories ──────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Radha Dresses",
    slug: "radha-dresses",
    image: "/images/category-radha.jpg",
    description:
      "Exquisite handcrafted dresses for Ladli Laal Ji — adorned with zari, resham, and divine embroidery for daily seva and festival shringar.",
    productCount: 42,
  },
  {
    id: "cat-2",
    name: "Krishna Vastra",
    slug: "krishna-vastra",
    image: "/images/category-krishna.jpg",
    description:
      "Royal poshak and vastra sets for Thakurji — designed with devotion, crafted in pure silk, velvet, and rich brocade for every utsav.",
    productCount: 38,
  },
  {
    id: "cat-3",
    name: "Jewellery Sets",
    slug: "jewellery",
    image: "/images/category-jewellery.jpg",
    description:
      "Delicate kundan, pearl, and gold-plated jewellery sets — mukut, haar, kaanphool, and bangles to complete your Thakurji's shringar.",
    productCount: 27,
  },
];

// ── Products ────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "prod-1",
    name: "Royal Zari Poshak — Radha Ji",
    slug: "royal-zari-poshak-radha",
    price: 2499,
    originalPrice: 3199,
    image: "/images/product-1.jpg",
    category: "radha-dresses",
    rating: 4.8,
    reviewCount: 124,
    badge: "bestseller",
    description:
      "Handwoven zari poshak with intricate gold thread work, designed for Radha Rani's daily seva shringar.",
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Silk Pitambari Vastra — Krishna Ji",
    slug: "silk-pitambari-vastra",
    price: 1899,
    originalPrice: 2399,
    image: "/images/product-2.jpg",
    category: "krishna-vastra",
    rating: 4.9,
    reviewCount: 89,
    badge: "bestseller",
    description:
      "Pure Banarasi silk pitambari vastra with golden border, perfect for Thakurji's festive shringar.",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Kundan Mukut & Haar Set",
    slug: "kundan-mukut-haar-set",
    price: 3499,
    originalPrice: 4299,
    image: "/images/product-3.jpg",
    category: "jewellery",
    rating: 4.7,
    reviewCount: 67,
    badge: "new",
    description:
      "Exquisite kundan mukut with matching haar — hand-set stones with meenakari detailing for Thakurji.",
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Velvet Janmashtami Special Poshak",
    slug: "velvet-janmashtami-poshak",
    price: 2999,
    image: "/images/product-4.jpg",
    category: "krishna-vastra",
    rating: 4.6,
    reviewCount: 45,
    badge: "festival",
    festival: "Janmashtami",
    description:
      "Royal velvet poshak with peacock motif embroidery — specially designed for Janmashtami celebrations.",
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Resham Embroidered Lehenga — Radha Ji",
    slug: "resham-embroidered-lehenga",
    price: 1799,
    image: "/images/product-5.jpg",
    category: "radha-dresses",
    rating: 4.5,
    reviewCount: 92,
    badge: "new",
    description:
      "Delicate resham embroidered lehenga with mirror work, ideal for Radhashtami and daily seva.",
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Pearl Mala & Kaanphool Set",
    slug: "pearl-mala-kaanphool",
    price: 999,
    originalPrice: 1499,
    image: "/images/product-6.jpg",
    category: "jewellery",
    rating: 4.8,
    reviewCount: 156,
    badge: "bestseller",
    description:
      "Elegant freshwater pearl mala with matching kaanphool — timeless beauty for Thakurji's daily shringar.",
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Brocade Festival Vastra Set",
    slug: "brocade-festival-vastra",
    price: 3999,
    originalPrice: 4999,
    image: "/images/product-7.jpg",
    category: "krishna-vastra",
    rating: 4.9,
    reviewCount: 34,
    badge: "festival",
    festival: "Diwali",
    description:
      "Premium Banaras brocade vastra set with matching pagdi — crafted for Diwali Annakut seva.",
    inStock: true,
  },
  {
    id: "prod-8",
    name: "Daily Seva Cotton Poshak Set",
    slug: "daily-seva-cotton-poshak",
    price: 699,
    image: "/images/product-8.jpg",
    category: "radha-dresses",
    rating: 4.4,
    reviewCount: 213,
    description:
      "Comfortable pure cotton poshak set with delicate block print — perfect for everyday seva.",
    inStock: true,
  },
  {
    id: "prod-9",
    name: "Gold-Plated Bajuband & Bangle Set",
    slug: "gold-plated-bajuband-bangle",
    price: 1299,
    originalPrice: 1799,
    image: "/images/product-9.jpg",
    category: "jewellery",
    rating: 4.6,
    reviewCount: 78,
    badge: "new",
    description:
      "Intricate gold-plated bajuband with matching bangles — meenakari work with ruby stones.",
    inStock: true,
  },
  {
    id: "prod-10",
    name: "Sharad Purnima Silk Poshak",
    slug: "sharad-purnima-silk-poshak",
    price: 2799,
    image: "/images/product-10.jpg",
    category: "radha-dresses",
    rating: 4.7,
    reviewCount: 41,
    badge: "festival",
    festival: "Sharad Purnima",
    description:
      "Moonlight-white silk poshak with silver thread work — designed for Sharad Purnima raas celebration.",
    inStock: true,
  },
];

// ── Festivals ───────────────────────────────────────────────────
export const festivals: Festival[] = [
  {
    id: "fest-1",
    name: "Janmashtami",
    slug: "janmashtami",
    image: "/images/festival-janmashtami.jpg",
    description: "Celebrate the divine birth of Lord Krishna with royal poshak & jewellery sets",
    color: "#1A8A7D",
  },
  {
    id: "fest-2",
    name: "Radhashtami",
    slug: "radhashtami",
    image: "/images/festival-radhashtami.jpg",
    description: "Honour Radha Rani with exquisite dresses and delicate shringar",
    color: "#FF9933",
  },
  {
    id: "fest-3",
    name: "Daily Seva",
    slug: "daily-seva",
    image: "/images/festival-daily-seva.jpg",
    description: "Beautiful everyday poshak sets for your Thakurji's daily shringar",
    color: "#D4A853",
  },
  {
    id: "fest-4",
    name: "Sharad Purnima",
    slug: "sharad-purnima",
    image: "/images/festival-sharad-purnima.jpg",
    description: "Moonlit raas celebration — white & silver poshak collections",
    color: "#7B68AE",
  },
  {
    id: "fest-5",
    name: "Diwali",
    slug: "diwali",
    image: "/images/festival-diwali.jpg",
    description: "Annakut special — rich brocade vastra and gold jewellery sets",
    color: "#E8850A",
  },
];

// ── Testimonials ────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Priya Sharma",
    location: "Vrindavan, UP",
    rating: 5,
    quote:
      "The zari poshak I received for Radha Ji was absolutely divine. Every stitch reflects pure bhakti. My Thakurji looks so beautiful in the daily seva!",
  },
  {
    id: "test-2",
    name: "Rajesh Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    quote:
      "Ordered the Janmashtami special vastra set — the quality of silk and the attention to detail is unmatched. Truly premium and made with devotion.",
  },
  {
    id: "test-3",
    name: "Meera Devi",
    location: "Jaipur, Rajasthan",
    rating: 4,
    quote:
      "The kundan mukut set arrived beautifully packaged. The craftsmanship is extraordinary. Shreeji Seva Bhav understands what devotees need.",
  },
  {
    id: "test-4",
    name: "Govind Das",
    location: "Nathdwara, Rajasthan",
    rating: 5,
    quote:
      "I have been ordering from Shreeji Seva Bhav for over a year now. Their festival collections are always fresh and the seva quality is consistent.",
  },
  {
    id: "test-5",
    name: "Ananya Krishnan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    quote:
      "Pan-India delivery was smooth and the poshak was even more beautiful in person. The packaging felt sacred — like receiving prasad.",
  },
  {
    id: "test-6",
    name: "Bhakti Mishra",
    location: "Mathura, UP",
    rating: 5,
    quote:
      "Every piece from Shreeji Seva Bhav carries the energy of devotion. The pearl mala set for my Ladli Ji is now my favourite seva shringar.",
  },
];

// ── Gallery Images ──────────────────────────────────────────────
export const galleryImages: GalleryImage[] = [
  { id: "gal-1", src: "/images/gallery-1.jpg", alt: "Radha Krishna dressed in royal zari poshak", span: "tall" },
  { id: "gal-2", src: "/images/gallery-2.jpg", alt: "Intricate kundan jewellery close-up", span: "normal" },
  { id: "gal-3", src: "/images/gallery-3.jpg", alt: "Festival shringar with peacock feather motif", span: "normal" },
  { id: "gal-4", src: "/images/gallery-4.jpg", alt: "Silk vastra draped on Krishna deity", span: "wide" },
  { id: "gal-5", src: "/images/gallery-5.jpg", alt: "Handcrafted gold embroidery detail", span: "tall" },
  { id: "gal-6", src: "/images/gallery-6.jpg", alt: "Radha Ji in Sharad Purnima white poshak", span: "normal" },
];

// ── Features / Why Choose Us ────────────────────────────────────
export const features = [
  {
    icon: "lotus",
    title: "Handmade with Love & Bhakti",
    description: "Every piece crafted by skilled artisans with devotion in their hearts.",
  },
  {
    icon: "sparkles",
    title: "Premium Quality Materials",
    description: "Pure silk, Banarasi brocade, genuine kundan — only the finest for your Thakurji.",
  },
  {
    icon: "heart",
    title: "Pure Devotion in Every Stitch",
    description: "Not just clothing — each poshak is a seva offering made with sacred intention.",
  },
  {
    icon: "shield",
    title: "Secure Divine Packaging",
    description: "Every order wrapped with care, as if packing prasad — protected and blessed.",
  },
  {
    icon: "truck",
    title: "Pan-India Delivery",
    description: "From Vrindavan to Chennai — delivering divine shringar across all of Bharat.",
  },
  {
    icon: "refresh",
    title: "Easy Returns & Exchange",
    description: "Hassle-free 7-day return policy — because your Thakurji deserves perfection.",
  },
  {
    icon: "calendar",
    title: "Festival Specials",
    description: "Curated collections for Janmashtami, Radhashtami, Diwali, and every sacred occasion.",
  },
  {
    icon: "headset",
    title: "Dedicated Seva Support",
    description: "Personal WhatsApp support — we guide you in choosing the perfect poshak.",
  },
];

// ── Navigation Links ────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Radha Dresses", href: "/divine-wardrobe" },
  { label: "Krishna Vastra", href: "/krishna-vastra" },
  { label: "Jewellery Sets", href: "/jewellery" },
];
