import { config } from "@repo/next-config";
import type { NextConfig } from "next";

let nextConfig: NextConfig = config;

nextConfig.images?.remotePatterns?.push({
  protocol: "https",
  hostname: "assets.basehub.com",
});

export default nextConfig;
