/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Remove experimental CSS optimization since it requires additional packages
  experimental: {
    // optimizeCss: true // Removing this to prevent build errors
  },
}

module.exports = nextConfig