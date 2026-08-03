/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger shared hosting
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
