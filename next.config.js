/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 // Use Netlify server runtime (more reliable for query params + dynamic routing)
 // Remove 'output: export' to allow server-side rendering
};

module.exports = nextConfig;
