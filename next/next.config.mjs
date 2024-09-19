/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // out dir에 static file export
  distDir: "build",
  images: {
    unoptimized: true, // static option / optimize 불가
  },
};

export default nextConfig;
