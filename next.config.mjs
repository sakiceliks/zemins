/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore warnings for genkit/opentelemetry dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/@opentelemetry/ },
      { module: /node_modules\/handlebars/ },
      { module: /node_modules\/require-in-the-middle/ },
    ];

    // Handle missing optional dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      '@opentelemetry/winston-transport': false,
    };

    // Exclude genkit from client bundle (server-only)
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'genkit': 'commonjs genkit',
        '@genkit-ai/googleai': 'commonjs @genkit-ai/googleai',
        '@genkit-ai/core': 'commonjs @genkit-ai/core',
        '@genkit-ai/firebase': 'commonjs @genkit-ai/firebase',
      });

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
}

export default nextConfig
