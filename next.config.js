/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      const originalEntry = config.entry
      config.entry = async () => {
        const wdrPath = path.resolve(__dirname, './utils/debug/wdyr.js')
        const entries = await originalEntry()

        if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
          entries['main.js'].push(wdrPath)
        }
        return entries
      }
    }

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/assets',
            outputPath: 'static/assets',
            esModule: false,
          },
        },
      ],
    });

    return config
  },
}

module.exports = nextConfig
