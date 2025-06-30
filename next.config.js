/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['vercel.com'],
    unoptimized: true,
  },
  // Enable more verbose build output
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Disable React's experimental features that might cause issues
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
  },
  // Add webpack configuration to handle potential module resolution issues
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: process.env.NODE_ENV === 'production',
};

module.exports = nextConfig;
