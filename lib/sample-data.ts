import type { Lens } from './types'
import productsData from '@/data/products.json'

// Map products.json data to Lens interface and filter only products with images
export const sampleLenses: Lens[] = productsData
  .filter((product: any) => product.images && product.images.length > 0)
  .map((product: any) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.type || 'sol',
    gender: product.gender || 'unisex',
    color: product.color || product.name,
    material: product.material,
    images: product.images || [],
    variants: product.variants,
    isFeatured: product.featured,
    isNew: product.isNew,
    description: product.description,
  }))

// Extract unique brands from products
export const brands = Array.from(new Set(productsData.map((p: any) => p.brand)))
  .sort() as string[]

export const categories = [
  { id: 'sol', name: 'Lentes de Sol', icon: 'sun' },
  { id: 'aumento', name: 'Lentes de Aumento', icon: 'glasses' },
]

export const genderOptions = [
  { id: 'unisex', name: 'Unisex' },
  { id: 'hombre', name: 'Hombre' },
  { id: 'mujer', name: 'Mujer' },
]
