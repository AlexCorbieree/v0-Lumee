'use client'

import { useState, useMemo } from 'react'
import { CatalogFilters } from './catalog-filters'
import { LensCard } from './lens-card'
import { sampleLenses } from '@/lib/sample-data'
import type { FilterState, SortOption } from '@/lib/types'

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

  return (
    <section id="catalogo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
            Nuestra Colección
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Explora el Catálogo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección curada de lentes de las mejores marcas. 
            Filtra por tipo, marca o género para encontrar tu estilo perfecto.
          </p>
        </div>

        <CatalogFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalResults={filteredAndSortedLenses.length}
        />

        {filteredAndSortedLenses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredAndSortedLenses.map((lens) => (
              <LensCard key={lens.id} lens={lens} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No se encontraron lentes con los filtros seleccionados.
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
              className="text-primary hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Load More hint for scalability */}
        {filteredAndSortedLenses.length >= 12 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Mostrando {filteredAndSortedLenses.length} de 150+ modelos
            </p>
            {/* This would implement pagination/infinite scroll for the full 400 photo catalog */}
          </div>
        )}
      </div>
    </section>
  )
}
