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
