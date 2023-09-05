/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    webpack: (config) => {
        config.experiments = config.experiments || {}
        config.experiments.topLevelAwait = true
        return config
    },
    experimental: {
        serverComponentExternalPackages: ["mongoose"],
    },
}