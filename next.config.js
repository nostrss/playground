/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: [
      'github.com',
      'image.yes24.com',
      'user-images.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
