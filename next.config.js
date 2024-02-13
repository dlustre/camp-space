const withMDX = require('@next/mdx')()

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/camp-space" : undefined,
  assetPrefix: isProd ? "/camp-space/" : undefined,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true
  }
}

module.exports = withMDX(nextConfig)
