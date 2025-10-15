import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly set the workspace root to silence multi-lockfile warnings
  outputFileTracingRoot: path.resolve(__dirname),
  // Enable gzip compression for all responses (default in Next, explicit here)
  compress: true,

  // Remove the X-Powered-By header for smaller headers and slight security hardening
  poweredByHeader: false,

  // Strip console.* calls from production client bundles to reduce size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    // Convert named imports into per-file deep imports to reduce bundle size
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
