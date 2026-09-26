import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");
    return [
      {
        source: "/api/v1/images/:path*",
        destination: `${backendUrl}/api/v1/images/:path*`,
      },
      {
        source: "/api/images/:path*",
        destination: `${backendUrl}/api/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
