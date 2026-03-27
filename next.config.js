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
 async rewrites() {
   return [
     // /1ai → internally served by one-ai page (URL stays /1ai)
     { source: '/id/1ai', destination: '/id/one-ai' },
     { source: '/en/1ai', destination: '/en/one-ai' },
   ];
 },
 async redirects() {
   return [
     // /omniroute → /1ai (301 permanent, SEO-safe)
     { source: '/id/omniroute', destination: '/id/1ai', permanent: true },
     { source: '/en/omniroute', destination: '/en/1ai', permanent: true },
     { source: '/omniroute', destination: '/id/1ai', permanent: true },
   ];
 },
};

module.exports = nextConfig;
