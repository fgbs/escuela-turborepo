import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cursos.escuelatvp.cl',
    },{
      protocol: 'https',
      hostname: 'dabrdpdopssigtsyzrbx.supabase.co',
    },{
      protocol: 'https',
      hostname: 'images.unsplash.com',
    }]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  transpilePackages: [
    "@repo/ui",
    "@repo/supabase",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
