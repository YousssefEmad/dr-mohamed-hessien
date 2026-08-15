/** @type {import('next').NextConfig} */
const nextConfig = {
  // Node hosting (Hostinger Deploy Web App) — ISR يحدّث المحتوى من Sanity
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
