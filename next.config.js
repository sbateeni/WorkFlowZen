/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Performance optimizations
  swcMinify: true,
  
  // Explicitly configure to avoid conflicts
  transpilePackages: [], // Empty to avoid conflicts
  
  // Experimental configuration
  experimental: {
    // Only include packages that need external handling
    serverComponentsExternalPackages: [],
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