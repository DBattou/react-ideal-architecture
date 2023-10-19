/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  // For docker:  https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  // output: 'standalone',
};

module.exports = nextConfig;
