'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Glasses, Sun, LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShowroomCard } from './showroom-card'
import { sampleLenses, brands, genderOptions } from '@/lib/sample-data'
import type { FilterState, SortOption } from '@/lib/types'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export function ShowroomSection() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    brand: null,
    gender: null,
    priceRange: null,
    search: '',
  })
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid')

  const filteredAndSortedLenses = useMemo(() => {
    let result = [...sampleLenses]

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

  const totalPages = Math.ceil(filteredAndSortedLenses.length / ITEMS_PER_PAGE)
  const paginatedLenses = filteredAndSortedLenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setFilters({
      category: null,
      brand: null,
      gender: null,
      priceRange: null,
      search: '',
    })
    setCurrentPage(1)
  }

  const activeFiltersCount = [
    filters.category,
    filters.brand,
    filters.gender,
  ].filter(Boolean).length

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">Tipo de Lente</label>
        <div className="space-y-2">
          {[
            { id: 'sol', name: 'Lentes de Sol', icon: Sun },
            { id: 'aumento', name: 'Lentes de Aumento', icon: Glasses },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange({ category: filters.category === cat.id ? null : cat.id })}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all',
                filters.category === cat.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border hover:border-foreground/50'
              )}
            >
              <cat.icon className="h-4 w-4" />
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Marca</label>
        <Select
          value={filters.brand || 'all'}
          onValueChange={(value) =>
            handleFilterChange({ brand: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Todas las marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">Genero</label>
        <Select
          value={filters.gender || 'all'}
          onValueChange={(value) =>
            handleFilterChange({ gender: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {genderOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full h-12">
          <X className="h-4 w-4 mr-2" />
          Limpiar Filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <section id="catalogo" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="h-px w-8 md:w-12 bg-border" />
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.25em] uppercase">
              Coleccion Exclusiva
            </p>
            <div className="h-px w-8 md:w-12 bg-border" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4 text-balance">
            Nuestro Showroom
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance text-sm md:text-base">
            Una seleccion curada de las mejores marcas internacionales.
            Cada pieza es unica, cada detalle importa.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          <button
            onClick={() => handleFilterChange({ category: null })}
            className={cn(
              'px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300',
              filters.category === null
                ? 'bg-foreground text-background'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            )}
          >
            Todos
          </button>
          <button
            onClick={() => handleFilterChange({ category: filters.category === 'sol' ? null : 'sol' })}
            className={cn(
              'flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300',
              filters.category === 'sol'
                ? 'bg-foreground text-background'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            )}
          >
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Lentes de</span> Sol
          </button>
          <button
            onClick={() => handleFilterChange({ category: filters.category === 'aumento' ? null : 'aumento' })}
            className={cn(
              'flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300',
              filters.category === 'aumento'
                ? 'bg-foreground text-background'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            )}
          >
            <Glasses className="h-4 w-4" />
            <span className="hidden sm:inline">Lentes de</span> Aumento
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 md:p-5 rounded-2xl bg-secondary/30 border border-border/50">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, marca o color..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="pl-11 h-12 border-0 bg-background rounded-xl"
            />
          </div>

          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden h-12 rounded-xl flex-1">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-foreground text-background rounded-full h-5 w-5 text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filtrar Catalogo</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <Select
              value={filters.brand || 'all'}
              onValueChange={(value) =>
                handleFilterChange({ brand: value === 'all' ? null : value })
              }
            >
              <SelectTrigger className="hidden md:flex w-[160px] h-12 border-0 bg-background rounded-xl">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.gender || 'all'}
              onValueChange={(value) =>
                handleFilterChange({ gender: value === 'all' ? null : value })
              }
            >
              <SelectTrigger className="hidden md:flex w-[140px] h-12 border-0 bg-background rounded-xl">
                <SelectValue placeholder="Genero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {genderOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
              <SelectTrigger className="w-[160px] h-12 border-0 bg-background rounded-xl">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mas Recientes</SelectItem>
                <SelectItem value="price-asc">Precio: Menor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor</SelectItem>
                <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-background rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2.5 rounded-lg transition-colors',
                  viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={cn(
                  'p-2.5 rounded-lg transition-colors',
                  viewMode === 'compact' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(activeFiltersCount > 0 || filters.search) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {filters.category && (
              <button
                onClick={() => handleFilterChange({ category: null })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {filters.category === 'sol' ? 'Sol' : 'Aumento'}
                <X className="h-3 w-3" />
              </button>
            )}
            {filters.brand && (
              <button
                onClick={() => handleFilterChange({ brand: null })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {filters.brand}
                <X className="h-3 w-3" />
              </button>
            )}
            {filters.gender && (
              <button
                onClick={() => handleFilterChange({ gender: null })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {filters.gender === 'unisex' ? 'Unisex' : filters.gender === 'hombre' ? 'Hombre' : 'Mujer'}
                <X className="h-3 w-3" />
              </button>
            )}
            {filters.search && (
              <button
                onClick={() => handleFilterChange({ search: '' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                "{filters.search}"
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium text-foreground">{paginatedLenses.length}</span> de{' '}
            <span className="font-medium text-foreground">{filteredAndSortedLenses.length}</span> modelos
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground">
              Pagina {currentPage} de {totalPages}
            </p>
          )}
        </div>

        {/* Grid */}
        {paginatedLenses.length > 0 ? (
          <div className={cn(
            'grid gap-4 md:gap-6',
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
          )}>
            {paginatedLenses.map((lens, index) => (
              <ShowroomCard key={lens.id} lens={lens} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <Glasses className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">No se encontraron resultados</p>
            <p className="text-sm text-muted-foreground mb-6">
              Intenta ajustar los filtros para encontrar lo que buscas
            </p>
            <Button variant="outline" onClick={clearAllFilters} className="rounded-full">
              Limpiar todos los filtros
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full h-11 w-11"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show limited page numbers on mobile
                if (totalPages > 5) {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          'rounded-full h-11 w-11',
                          currentPage === page && 'bg-foreground text-background'
                        )}
                      >
                        {page}
                      </Button>
                    )
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    )
                  }
                  return null
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'rounded-full h-11 w-11',
                      currentPage === page && 'bg-foreground text-background'
                    )}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full h-11 w-11"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
