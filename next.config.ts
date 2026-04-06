import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/tiktoksignature/",
        destination: "/tiktoksignature",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
