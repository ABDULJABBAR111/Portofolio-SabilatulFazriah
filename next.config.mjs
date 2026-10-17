import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve("."),
  poweredByHeader: false, // jangan bocorkan "X-Powered-By: Next.js"
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // cache hasil optimasi gambar 30 hari
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei", "three", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
        ],
      },
      {
        // Gambar statis di /public: cache 30 hari agar refresh tidak mengunduh ulang
        source: "/(img|cert)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};
export default nextConfig;