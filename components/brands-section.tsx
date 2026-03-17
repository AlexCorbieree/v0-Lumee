'use client'

import { brands } from '@/lib/sample-data'

export function BrandsSection() {
  return (
    <section id="marcas" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
            Colección Exclusiva
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Marcas de Diseñador</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="group cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-serif text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
