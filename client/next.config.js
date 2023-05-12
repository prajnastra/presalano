/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BLOCKFOREST_KEY: process.env.BLOCKFOREST_KEY,
    NFTSTORAGE_KEY: process.env.NFTSTORAGE_KEY,
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    }
    return config
  },
}

module.exports = nextConfig
