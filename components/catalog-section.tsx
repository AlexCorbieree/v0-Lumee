'use client'

import { useState, useMemo } from 'react'
import { CatalogFilters } from './catalog-filters'
import { LensCard } from './lens-card'
import { sampleLenses } from '@/lib/sample-data'
import type { FilterState, SortOption } from '@/lib/types'
import { Glasses, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CatalogSection() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    brand: null,
    gender: null,
    priceRange: null,
    search: '',
  })
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const filteredAndSortedLenses = useMemo(() => {
    let result = [...sampleLenses]

    // Apply filters
    if (filters.category) {
      result = result.filter((lens) => lens.category === filters.category)
    }
    if (filters.brand) {
      result = result.filter((lens) => lens.brand === filters.brand)
    }
    if (filters.gender) {
      result = result.filter((lens) => lens.gender === filters.gender)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (lens) =>
          lens.name.toLowerCase().includes(searchLower) ||
          lens.brand.toLowerCase().includes(searchLower) ||
          lens.color.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [filters, sortOption])

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Separate first item for featured display
  const featuredLens = filteredAndSortedLenses[0]
  const remainingLenses = filteredAndSortedLenses.slice(1)

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-border" />
            <p className="text-muted-foreground text-sm tracking-[0.25em] uppercase">
              Colección Exclusiva
            </p>
            <div className="h-px w-12 bg-border" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-balance">
            Nuestro Showroom
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Una selección curada de las mejores marcas internacionales. 
            Cada pieza es única, cada detalle importa.
          </p>
        </div>

        {/* Category Quick Select */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => handleFilterChange({ category: filters.category === 'sol' ? null : 'sol' })}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300',
              filters.category === 'sol'
                ? 'bg-foreground text-background border-foreground'
                : 'border-border hover:border-foreground/50 hover:bg-secondary/50'
            )}
          >
            <Sun className="h-5 w-5" />
            <span className="font-medium">Lentes de Sol</span>
          </button>
          <button
            onClick={() => handleFilterChange({ category: filters.category === 'aumento' ? null : 'aumento' })}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300',
              filters.category === 'aumento'
                ? 'bg-foreground text-background border-foreground'
                : 'border-border hover:border-foreground/50 hover:bg-secondary/50'
            )}
          >
            <Glasses className="h-5 w-5" />
            <span className="font-medium">Lentes de Aumento</span>
          </button>
        </div>

        <CatalogFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalResults={filteredAndSortedLenses.length}
        />

        {filteredAndSortedLenses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
            {/* Featured Item - First in grid, spans 2 cols on larger screens */}
            {featuredLens && (
              <div className="col-span-2 row-span-1 md:row-span-2">
                <LensCard lens={featuredLens} variant="featured" />
              </div>
            )}
            
            {/* Remaining Items */}
            {remainingLenses.map((lens) => (
              <LensCard key={lens.id} lens={lens} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Glasses className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">
              No se encontraron resultados
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Intenta ajustar los filtros para encontrar lo que buscas
            </p>
            <button
              onClick={() =>
                setFilters({
                  category: null,
                  brand: null,
                  gender: null,
                  priceRange: null,
                  search: '',
                })
              }
              className="text-primary hover:underline font-medium"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        {/* Load More hint for scalability */}
        {filteredAndSortedLenses.length >= 12 && (
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4">
                Mostrando {filteredAndSortedLenses.length} de 150+ modelos disponibles
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-border" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
