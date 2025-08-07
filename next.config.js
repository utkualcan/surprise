/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/www/:path*',
        destination: 'https://seniseviyorum.me/:path*',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
