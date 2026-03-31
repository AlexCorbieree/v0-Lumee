'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  sizes?: string
  priority?: boolean
  quality?: number
}

// Placeholder blur data URL - tiny gray placeholder
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDRAQDAwNDgwMDA4MDAwODxAQEBAQEBAQEBAQEBD/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAUGEQAHEiEIE0Ex/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESES/9oADAMBEEhEPwAaJ+jxVq3UZ1pVOHCpVNuJd1xRlTGXJEKMiA0y2lLbjaSpKlqdOeFIUB0CQdaW2L5iu2vI1MZ3Cprl8TYcKnwUpXVJsWBBUwEBYASnnzKlIB/CQoE/Bo0ahZKYqsFB7j//2Q=='

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  containerClassName,
  sizes = '100vw',
  priority = false,
  quality = 80,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'flex items-center justify-center bg-secondary/50',
          containerClassName
        )}
      >
        <span className="text-6xl font-serif font-light text-foreground/10 select-none">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      {/* Skeleton placeholder while not in view */}
      {!isInView && (
        <div className="absolute inset-0 bg-secondary/30 animate-pulse" />
      )}

      {/* Blur placeholder while loading */}
      {isInView && !isLoaded && (
        <div 
          className="absolute inset-0 bg-secondary/30"
          style={{
            backgroundImage: `url(${BLUR_DATA_URL})`,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Actual image - only render when in viewport */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          sizes={sizes}
          quality={quality}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  )
}
