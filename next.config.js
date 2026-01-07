/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    generateEtags: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cms.editorialfusiones.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                pathname: '/**',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
