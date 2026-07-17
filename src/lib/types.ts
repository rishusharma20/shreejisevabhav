/* ═══════════════════════════════════════════════════════════════
   Shreeji Seva Bhav — TypeScript Interfaces
   Core data shapes for the devotional e-commerce platform
   ═══════════════════════════════════════════════════════════════ */

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "radha-dresses" | "krishna-vastra" | "jewellery";
  rating: number;
  reviewCount: number;
  badge?: "new" | "bestseller" | "festival";
  festival?: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Festival {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  // Future Phase 2: Razorpay integration
  // orderId?: string;
  // paymentStatus?: 'pending' | 'completed' | 'failed';
}

export type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: "normal" | "tall" | "wide";
}
