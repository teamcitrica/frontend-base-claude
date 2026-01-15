/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Peligroso: Permite builds de producción aunque haya errores de TypeScript
    // Solo usar temporalmente mientras Supabase no está conectado
    ignoreBuildErrors: true,
  },
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*.googleusercontent.com",
      port: "",
      pathname: "**",
    },
  ],
  },
}

module.exports = nextConfig
