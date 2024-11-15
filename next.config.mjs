/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/post/:slug',
        destination: '/:slug/',
        permanent: true,
      },
    ];
  },
  // Remove experimental features that are causing issues
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;