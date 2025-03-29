/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pqkwvlbtwqsaejvikjfa.supabase.co",
      },
    ],
  },
};

export default nextConfig;
