import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import { use } from 'react';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/v1/products/${slug}`, {
      next: { revalidate: 60 } // Optional caching
    });
    
    console.log("Fetch product res status:", res.status, res.statusText);
    if (!res.ok) {
      console.log("Fetch failed for product", slug);
      return null;
    }
    
    const data = await res.json();
    console.log("Fetch product data:", data);
    return data.data; // { product, variants }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getProduct(resolvedParams.slug);
  
  if (!data || !data.product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFFBF4]">
      <ProductDetails product={data.product} variants={data.variants} />
    </main>
  );
}
