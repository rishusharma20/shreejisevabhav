import { NextRequest } from "next/server";
import { products } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return Response.json({ products: [], query: query || "" });
  }

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return Response.json({ products: results, query });
}
