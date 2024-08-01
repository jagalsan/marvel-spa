const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, { dev }) => {
        if (dev) {
            config.mode = 'development';
            config.optimization.minimize = false;
        } else {
            config.mode = 'production';
            config.optimization.minimize = true;
        }

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
