'use client'

import { useEffect, useCallback, useRef } from 'react'

interface PrefetchOptions {
  /** Distance from viewport to start prefetching (in pixels) */
  rootMargin?: string
  /** Array of image URLs to prefetch */
  images: string[]
  /** Whether prefetching is enabled */
  enabled?: boolean
}

/**
 * Hook to prefetch images when they're about to enter the viewport
 * Uses native browser prefetching for optimal performance
 */
export function useImagePrefetch({ 
  images, 
  rootMargin = '500px', 
  enabled = true 
}: PrefetchOptions) {
  const prefetchedRef = useRef<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const prefetchImage = useCallback((src: string) => {
    if (prefetchedRef.current.has(src) || !src || src === '/placeholder.png') {
      return
    }

    prefetchedRef.current.add(src)

    // Use link preload for better browser optimization
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)

    // Also create Image object for immediate cache
    const img = new Image()
    img.src = src
  }, [])

  const prefetchImages = useCallback((urls: string[]) => {
    urls.forEach(prefetchImage)
  }, [prefetchImage])

  useEffect(() => {
    if (!enabled || images.length === 0) return

    // Prefetch first few images immediately
    const immediatePrefetch = images.slice(0, 4)
    immediatePrefetch.forEach(prefetchImage)

    // Prefetch remaining images with delay
    const remainingImages = images.slice(4)
    if (remainingImages.length > 0) {
      const timeoutId = setTimeout(() => {
        remainingImages.slice(0, 8).forEach(prefetchImage)
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [images, enabled, prefetchImage])

  return { prefetchImages, prefetchImage }
}

/**
 * Prefetch a batch of product images
 */
export function prefetchProductImages(products: { images?: string[] }[]) {
  if (typeof window === 'undefined') return

  const imagesToPrefetch = products
    .flatMap(p => p.images?.slice(0, 1) || [])
    .filter(Boolean)
    .slice(0, 12)

  imagesToPrefetch.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}
