import { categories } from "@/lib/seed-data";

export async function GET() {
  return Response.json({ categories });
}
