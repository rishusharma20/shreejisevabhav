import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if we're trying to access the admin panel
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      // No token -> Redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload (base64url)
      // A JWT consists of 3 parts separated by dots: header.payload.signature
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const payloadBase64 = parts[1];
      // Convert base64url to base64
      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      // Decode base64
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      
      const payload = JSON.parse(jsonPayload);

      // Verify the role
      if (payload.role !== "ADMIN") {
        // Not an admin -> Redirect to home
        return NextResponse.redirect(new URL("/", request.url));
      }
      
      // Allow admin
      return NextResponse.next();
    } catch (error) {
      // Error decoding or parsing -> Redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on /admin routes to save performance
export const config = {
  matcher: "/admin/:path*",
};
