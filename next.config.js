/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 images: {
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'i.postimg.cc',
       pathname: '/**',
     },
   ],
   formats: ['image/avif', 'image/webp'],
   minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
 },
};

module.exports = nextConfig;
