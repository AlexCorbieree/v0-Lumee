import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
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

      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
