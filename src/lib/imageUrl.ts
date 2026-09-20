const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PLACEHOLDER = "/images/products/placeholder.svg";

/**
 * Resolves a stored image path to a browser-loadable URL.
 * Upload paths (/uploads/...) are served by the backend API.
 * Static frontend assets (/images/...) are served by Next.js.
 */
export function resolveImageUrl(path?: string | null): string {
  if (!path) return PLACEHOLDER;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  return path;
}

export function resolveImageUrls(paths?: string[] | null): string[] {
  if (!paths || paths.length === 0) return [PLACEHOLDER];
  return paths.map(resolveImageUrl);
}
