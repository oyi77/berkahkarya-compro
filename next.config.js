/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 output: 'export', // Enable static export for Netlify
 images: {
   unoptimized: true, // Required for static export
 },
};

module.exports = nextConfig;
