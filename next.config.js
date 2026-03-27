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
     // /omniroute → /one-ai (301 permanent)
     { source: '/id/omniroute', destination: '/id/one-ai', permanent: true },
     { source: '/en/omniroute', destination: '/en/one-ai', permanent: true },
     { source: '/omniroute', destination: '/id/one-ai', permanent: true },
     // /1ai → /one-ai (301 permanent)
     { source: '/id/1ai', destination: '/id/one-ai', permanent: true },
     { source: '/en/1ai', destination: '/en/one-ai', permanent: true },
   ];
 },
};

module.exports = nextConfig;
