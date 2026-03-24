export interface LensVariant {
  color: string
  images: string[]
}

export interface Lens {
  id: string
  name: string
  brand: string
  price: number
  category: 'sol' | 'aumento' | 'contacto'
  gender: 'unisex' | 'hombre' | 'mujer'
  color: string
  material?: string
  images: string[]
  variants?: LensVariant[]
  isNew?: boolean
  isFeatured?: boolean
  description?: string
}

export interface FilterState {
  category: string | null
  brand: string | null
  gender: string | null
  priceRange: [number, number] | null
  search: string
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
