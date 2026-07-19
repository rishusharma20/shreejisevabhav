import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import Footer from "@/components/layout/Footer";

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/products/${slug}`, {
      next: { revalidate: 60 } // Optional caching
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data; // { product, variants }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data = await getProduct(params.slug);
  
  if (!data || !data.product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFFBF4]">
      <ProductDetails product={data.product} variants={data.variants} />
      <Footer />
    </main>
  );
}
