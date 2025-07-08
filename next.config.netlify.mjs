import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Netlify configuration
    output: 'standalone', // Tối ưu cho Netlify
    
    // Typescript config
    typescript: {
        ignoreBuildErrors: true,
    },

    // Image optimization for Netlify
    images: {
        unoptimized: true, // Netlify handles image optimization
    },

    // Webpack optimization cho 3D libraries
    webpack: (config) => {
        config.externals.push({
            'three': 'three'
        });
        
        // Netlify-specific optimizations
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };
        
        return config;
    },

    // Environment variables
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },

    // Optimize for performance
    experimental: {
        optimizeCss: true,
    },
};

export default withSentryConfig(nextConfig, {
    // Sentry configuration for Netlify
    org: "gia-khanh",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // Upload a larger set of source maps for prettier stack traces
    widenClientFileUpload: true,

    // Automatically annotate React components
    reactComponentAnnotation: {
        enabled: true,
    },

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements
    disableLogger: true,

    // Remove Vercel-specific config
    // automaticVercelMonitors: false, // Not needed for Netlify
});