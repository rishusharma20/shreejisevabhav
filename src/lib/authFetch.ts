import { getAuthToken } from "@/app/actions/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Authenticated fetch wrapper for cross-origin API calls.
 * 
 * Since the frontend (Vercel) and backend (Render) are on different domains,
 * cross-origin cookies are blocked by modern browsers. This utility reads the
 * auth token from the Next.js httpOnly cookie via server action and sends it
 * via the Authorization header instead.
 */
export async function authFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  // Ensure JSON content type for requests with body (unless it's FormData)
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", // Still send cookies as fallback
  });
}

/**
 * Same as authFetch but for full URLs (when the path already includes the base URL).
 */
export async function authFetchUrl(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
