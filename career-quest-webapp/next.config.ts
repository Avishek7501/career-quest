import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        BASE_DEPLOY_PATH: process.env.BASE_DEPLOY_PATH ?? '',
        NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? 'production',
        NEXT_PUBLIC_API_ENDPOINT_HOST:
            process.env.NEXT_PUBLIC_API_ENDPOINT_HOST ??
            'http://localhost:8000/api/v1'
    }
};

export default nextConfig;
