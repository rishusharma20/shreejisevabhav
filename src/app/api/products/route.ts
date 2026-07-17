import { NextRequest } from "next/server";
import { products } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category");
  const badge = searchParams.get("badge");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (badge) {
    filtered = filtered.filter((p) => p.badge === badge);
  }

  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  return Response.json({
    products: paginated,
    total,
    limit,
    offset,
  });
}
