import { Sparkles, Eye, Award } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: '15+ Marcas Exclusivas',
    description: 'Curaduría de las mejores casas de moda y diseñadores del mundo.',
  },
  {
    icon: Eye,
    title: 'Exámenes de la Vista',
    description: 'Tecnología de precisión para diagnósticos oftalmológicos completos.',
  },
  {
    icon: Award,
    title: 'Atención Personalizada',
    description: 'Asesoría experta para encontrar el estilo perfecto para ti.',
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
              Sobre Nosotros
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              La Experiencia Lumee
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Más que una óptica, somos una boutique de estilo. Ubicados en el 
              corazón de Puebla, ofrecemos exámenes de la vista de precisión y 
              una selección de marcas de lujo incomparable. Nuestro equipo de 
              especialistas está dedicado a ayudarte a encontrar los lentes 
              perfectos que reflejen tu personalidad única.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats and CTA */}
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-primary mb-2">15+</p>
                <p className="text-sm text-muted-foreground">Marcas Exclusivas</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-primary mb-2">10+</p>
                <p className="text-sm text-muted-foreground">Anos de Experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-primary mb-2">5000+</p>
                <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-primary mb-2">100%</p>
                <p className="text-sm text-muted-foreground">Productos Originales</p>
              </div>
            </div>
            <div className="text-center pt-6 border-t border-border">
              <p className="text-muted-foreground mb-4">Visitanos en nuestra sucursal</p>
              <a
                href="https://wa.me/522221234567?text=Hola,%20me%20gustaria%20agendar%20una%20cita%20para%20visitar%20su%20optica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Agendar Visita por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
