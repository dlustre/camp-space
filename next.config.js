/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === 'development' ? undefined : "/camp-space",
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
