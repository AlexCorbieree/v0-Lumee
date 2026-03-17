'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/522221234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20lentes"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whatsapp-pulse group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline font-medium">Contáctanos</span>
    </a>
  )
}
