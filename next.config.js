/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: "standalone", // Feel free to modify/remove this option
  reactStrictMode: false,
  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
