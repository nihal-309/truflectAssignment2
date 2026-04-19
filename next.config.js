/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.openfoodfacts.org',
      },
      {
        protocol: 'https',
        hostname: '**.openfoodfacts.org',
      },
    ],
  },
};

module.exports = nextConfig;
