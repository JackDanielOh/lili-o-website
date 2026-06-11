import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recruitment",
        destination: "/recruit",
        permanent: true,
      },
      {
        source: "/blog/founder-interview",
        destination: "/blog/2",
        permanent: true,
      },
      {
        source: "/blog/quality-data",
        destination: "/blog/3",
        permanent: true,
      },
      {
        source: "/blog/one-shot-learning",
        destination: "/blog/1",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
