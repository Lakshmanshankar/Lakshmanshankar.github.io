/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { family: 'Poppins' } },
    ]
  },
}

module.exports = nextConfig
