'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
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
import { brands, categories, genderOptions } from '@/lib/sample-data'
import type { FilterState, SortOption } from '@/lib/types'

interface CatalogFiltersProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  sortOption: SortOption
  onSortChange: (sort: SortOption) => void
  totalResults: number
}

export function CatalogFilters({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  totalResults,
}: CatalogFiltersProps) {
  const activeFiltersCount = [
    filters.category,
    filters.brand,
    filters.gender,
  ].filter(Boolean).length

  const clearAllFilters = () => {
    onFilterChange({
      category: null,
      brand: null,
      gender: null,
      priceRange: null,
      search: '',
    })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Tipo de Lente</label>
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) =>
            onFilterChange({ category: value === 'all' ? null : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Marca</label>
        <Select
          value={filters.brand || 'all'}
          onValueChange={(value) =>
            onFilterChange({ brand: value === 'all' ? null : value })
          }
        >
          <SelectTrigger>
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

      {/* Gender Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Género</label>
        <Select
          value={filters.gender || 'all'}
          onValueChange={(value) =>
            onFilterChange({ gender: value === 'all' ? null : value })
          }
        >
          <SelectTrigger>
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
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Limpiar Filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <div className="mb-8">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar lentes..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="flex gap-3">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtrar Catálogo</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <Select value={sortOption} onValueChange={(v) => onSortChange(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más Recientes</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap gap-3 items-center">
        {/* Category Pills */}
        <div className="flex gap-2">
          <Button
            variant={filters.category === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange({ category: null })}
            className="rounded-full"
          >
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={filters.category === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange({ category: cat.id })}
              className="rounded-full"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="h-6 w-px bg-border mx-2" />

        {/* Brand Select */}
        <Select
          value={filters.brand || 'all'}
          onValueChange={(value) =>
            onFilterChange({ brand: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className="w-[150px]">
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

        {/* Gender Select */}
        <Select
          value={filters.gender || 'all'}
          onValueChange={(value) =>
            onFilterChange({ gender: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Género" />
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

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
        </div>
      </div>
    </div>
  )
}
