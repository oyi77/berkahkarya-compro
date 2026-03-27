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
 async redirects() {
   return [
     // OmniRoute → 1Ai redirect (permanent, SEO-safe)
     { source: '/id/omniroute', destination: '/id/1ai', permanent: true },
     { source: '/en/omniroute', destination: '/en/1ai', permanent: true },
     { source: '/omniroute', destination: '/id/1ai', permanent: true },
   ];
 },
};

module.exports = nextConfig;
