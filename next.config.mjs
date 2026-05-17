/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", 
        port: "",
        pathname: "/photo-**",           
      },
      {
        protocol: "https",
        hostname: "your-cms-bucket.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;