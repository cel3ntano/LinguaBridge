import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        pathname: '/img/**',
      },
    ],
  },
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
