import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { CartProvider } from "@/context/CartContext";

import EternalTempleFooter from "@/components/footer/EternalTempleFooter";
import DivinePageAtmosphere from "@/components/layout/DivinePageAtmosphere";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shreeji Seva Bhav — Divine Clothing & Jewellery for Thakurji",
  description:
    "Premium handcrafted poshak, vastra & jewellery for Radha-Krishna. Exquisite Janmashtami, Radhashtami & daily seva collections. Handmade with love & bhakti. Pan-India delivery.",
  manifest: "/manifest.json",
  keywords: [
    "Thakurji vastra",
    "Krishna poshak",
    "Radha dresses",
    "deity jewellery",
    "Janmashtami clothes",
    "devotional clothing",
    "Shreeji Seva Bhav",
    "laddu gopal vastra",
    "kanhaji dress",
  ],
  openGraph: {
    title: "Shreeji Seva Bhav — Divine Clothing & Jewellery for Thakurji",
    description:
      "Handcrafted poshak, vastra & jewellery for your beloved Thakurji. Premium quality. Pan-India delivery.",
    type: "website",
    locale: "en_IN",
    siteName: "Shreeji Seva Bhav",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    title: "Shreeji",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBF4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-body pb-[70px] md:pb-0">
        <CartProvider>
          <DivinePageAtmosphere />
          {children}
          <EternalTempleFooter />
        </CartProvider>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
