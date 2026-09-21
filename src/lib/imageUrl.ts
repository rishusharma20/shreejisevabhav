const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PLACEHOLDER = "/images/products/placeholder.svg";

export type ImageInput = string | { url?: string; fileId?: string; type?: string } | null | undefined;

/**
 * Resolves a stored image reference (GridFS path, static path, external URL, or object)
 * into an absolute browser-loadable URL.
 */
export function resolveImageUrl(input?: ImageInput): string {
  if (!input) return PLACEHOLDER;

  let path = "";
  if (typeof input === "object") {
    path = input.url || (input.fileId ? `/api/v1/images/${input.fileId}` : "");
  } else if (typeof input === "string") {
    path = input.trim();
  }

  if (!path) return PLACEHOLDER;

  // 1. External absolute URLs - use directly without modifying
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Normalize path with single leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = API_BASE.replace(/\/+$/, "");

  // 2. MongoDB GridFS images served by Express backend
  if (normalizedPath.startsWith("/api/")) {
    return `${base}${normalizedPath}`;
  }

  // 3. Legacy uploads directory served by Express backend
  if (normalizedPath.startsWith("/uploads/")) {
    return `${base}${normalizedPath}`;
  }

  // 4. Static frontend images (/images/...) served by Next.js public directory
  return normalizedPath;
}

/**
 * Resolves an array of stored image references into browser-loadable URLs.
 */
export function resolveImageUrls(paths?: (string | { url?: string; fileId?: string })[] | null): string[] {
  if (!paths || paths.length === 0) return [PLACEHOLDER];
  return paths.map(resolveImageUrl);
}
