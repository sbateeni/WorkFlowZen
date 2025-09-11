/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Performance optimizations
  swcMinify: true,
  
  // Experimental features for stability
  experimental: {
    serverComponentsExternalPackages: ['@radix-ui/react-toast'],
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Output for static export
  output: 'standalone',
};

module.exports = nextConfig;