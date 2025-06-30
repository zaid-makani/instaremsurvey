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
  // Disable static optimization to avoid potential issues
  output: 'standalone',
  // Disable React's concurrent features that might cause issues
  experimental: {
    serverActions: false,
    optimizeCss: false,
    scrollRestoration: false,
  },
  // Add webpack configuration to handle potential module resolution issues
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

// Enable production source maps for better error tracking
if (process.env.NODE_ENV === 'production') {
  nextConfig.productionBrowserSourceMaps = true;
}

module.exports = nextConfig;
