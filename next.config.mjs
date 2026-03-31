/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Habilitar optimizacion de imagenes
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Calidad por defecto mas alta para mejor nitidez
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache de 30 dias
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      // Cloudways - agregar tu dominio aqui
      {
        protocol: 'https',
        hostname: '*.cloudwaysapps.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudways.com',
      },
      // Dominio personalizado de Cloudways (reemplazar con tu dominio)
      {
        protocol: 'https',
        hostname: 'cdn.lumee.mx',
      },
      {
        protocol: 'https',
        hostname: 'images.lumee.mx',
      },
    ],
  },
}

export default nextConfig
