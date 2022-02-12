/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.igloolab.co',
      'res.cloudinary.com',
    ],
  },
}

module.exports = nextConfig
