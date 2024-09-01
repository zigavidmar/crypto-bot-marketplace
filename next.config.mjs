/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eaqaukylayedqrmxbxtz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/files/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
