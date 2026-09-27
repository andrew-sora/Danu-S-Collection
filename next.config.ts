import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Google Drive direct view URLs
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc**",
      },
      {
        // Google Drive thumbnail
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
