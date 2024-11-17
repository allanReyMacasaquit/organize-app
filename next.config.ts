import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.pixabay.com',
			},
			{
				protocol: 'https',
				hostname: 'img.freepik.com',
			},
			{
				protocol: 'https',
				hostname: 'cloud.appwrite.io',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: 50 * 1024 * 1024, // Set the body size limit to 50 MB
		},
	},
};

export default nextConfig;
