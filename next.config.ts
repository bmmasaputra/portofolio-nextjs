import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // ...any other domains you already have
    ],
  },
  allowedDevOrigins: ["10.146.212.14", "172.51.204.187"],
};

export default nextConfig;
