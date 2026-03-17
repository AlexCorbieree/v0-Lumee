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

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-100 to-amber-200" />
              <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-stone-100 to-stone-200" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200" />
              <div className="aspect-square rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
