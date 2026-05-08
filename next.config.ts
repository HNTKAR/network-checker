import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev','192.168.*','10.0.*'],
}
export default nextConfig;
