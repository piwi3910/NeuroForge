/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@neuroforge/shared'],
  experimental: {
    externalDir: true // Allow importing from outside the app directory
  }
};

module.exports = nextConfig;
