import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-model.jpg-mXGZoC7A8wABEJFEwGbUtWJYatAKWr.png"
          alt="Modelo con lentes de sol elegantes"
          fill
          className="object-cover object-top"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Óptica Boutique en Puebla
          </p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
            <span className="block">Descubre tu</span>
            <span className="block italic">estilo perfecto</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Más que una óptica, somos una boutique de lujo. Explora nuestra exclusiva 
            colección de lentes de las mejores marcas del mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#catalogo">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base bg-white text-foreground hover:bg-white/90"
              >
                Ver Catálogo
              </Button>
            </a>
            <a
              href="https://wa.me/522221234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20lentes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base border-white text-white hover:bg-white/10"
              >
                Agendar Cita
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#catalogo" className="text-white/70 hover:text-white transition-colors">
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Side decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
