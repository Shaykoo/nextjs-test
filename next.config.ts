import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    appDir: false,
  },
  async middleware() {
    return [
      {
        source: '/:path*', // Apply to all routes
        has: [{ type: 'header', key: 'authorization' }],
        destination: '/middleware.ts',
      },
    ];
  },
};

export default nextConfig;
