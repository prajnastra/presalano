/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAINNET_BLOCKFOREST_KEY: process.env.MAINNET_BLOCKFOREST_KEY,
    PREPROD_BLOCKFOREST_KEY: process.env.PREPROD_BLOCKFOREST_KEY,
    PREVIEW_BLOCKFOREST_KEY: process.env.PREVIEW_BLOCKFOREST_KEY,
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
