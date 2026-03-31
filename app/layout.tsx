import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Optimized font loading with preload
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Lumee | Optica Boutique de Lujo en Puebla',
  description: 'Descubre nuestra exclusiva coleccion de lentes de sol y armazones de las mejores marcas. Optica boutique en Puebla con atencion personalizada.',
  keywords: ['optica', 'lentes', 'gafas', 'Puebla', 'lentes de sol', 'armazones', 'boutique'],
  openGraph: {
    title: 'Lumee | Optica Boutique de Lujo en Puebla',
    description: 'Descubre nuestra exclusiva coleccion de lentes de sol y armazones de las mejores marcas.',
    type: 'website',
    locale: 'es_MX',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B7355',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preload critical hero image */}
        <link
          rel="preload"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-model.jpg-mXGZoC7A8wABEJFEwGbUtWJYatAKWr.png"
          as="image"
          type="image/png"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        {/* Preconnect to Cloudways CDN (update with your actual domain) */}
        <link rel="preconnect" href="https://cdn.lumee.mx" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
