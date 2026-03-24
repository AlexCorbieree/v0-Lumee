'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Lens } from '@/lib/types'

interface WeeklyHighlightsProps {
  lenses: Lens[]
}

export function WeeklyHighlights({ lenses }: WeeklyHighlightsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const highlightLenses = lenses.slice(0, 10)
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % highlightLenses.length)
  }, [highlightLenses.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlightLenses.length) % highlightLenses.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const getVisibleIndices = () => {
    const indices = []
    for (let i = -2; i <= 2; i++) {
      indices.push((currentIndex + i + highlightLenses.length) % highlightLenses.length)
    }
    return indices
  }

  const visibleIndices = getVisibleIndices()

  // Gradient colors for each card
  const cardGradients = [
    'from-amber-50 via-amber-100 to-orange-100',
    'from-stone-50 via-stone-100 to-warm-gray-100',
    'from-rose-50 via-pink-50 to-fuchsia-50',
    'from-sky-50 via-blue-50 to-indigo-50',
    'from-emerald-50 via-teal-50 to-cyan-50',
    'from-violet-50 via-purple-50 to-fuchsia-50',
    'from-neutral-50 via-zinc-100 to-stone-100',
    'from-amber-50 via-yellow-50 to-lime-50',
    'from-slate-50 via-gray-100 to-zinc-100',
    'from-orange-50 via-amber-50 to-yellow-50',
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Weekly Highlights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-balance">
            Selección de la Semana
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Descubre los modelos más exclusivos elegidos por nuestros expertos esta semana
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="flex items-center justify-center gap-4 md:gap-6 py-8">
            {visibleIndices.map((index, position) => {
              const lens = highlightLenses[index]
              const isCurrent = position === 2
              const isAdjacent = position === 1 || position === 3
              const isOuter = position === 0 || position === 4
              
              const whatsappMessage = `Hola, me interesa el modelo ${lens.name} de ${lens.brand}. ¿Podrían darme más información?`
              const whatsappUrl = `https://wa.me/522221234567?text=${encodeURIComponent(whatsappMessage)}`

              return (
                <div
                  key={`${index}-${position}`}
                  className={cn(
                    'transition-all duration-500 ease-out flex-shrink-0',
                    isCurrent && 'z-30 scale-100 opacity-100',
                    isAdjacent && 'z-20 scale-[0.85] opacity-70 hidden md:block',
                    isOuter && 'z-10 scale-[0.7] opacity-40 hidden lg:block'
                  )}
                  onClick={() => !isCurrent && goToSlide(index)}
                >
                  <div
                    className={cn(
                      'relative rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300',
                      isCurrent ? 'w-[320px] md:w-[400px] cursor-default shadow-2xl shadow-black/20' : 'w-[280px] cursor-pointer hover:opacity-90'
                    )}
                  >
                    {/* Card Background */}
                    <div className={cn(
                      'aspect-[3/4] bg-gradient-to-br relative',
                      cardGradients[index % cardGradients.length]
                    )}>
                      {/* Decorative Elements */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/50 blur-3xl" />
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-white/40 blur-2xl" />
                      </div>
                      
                      {/* Product Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {lens.images && lens.images.length > 0 && lens.images[0] !== '/placeholder.png' ? (
                          <Image
                            src={lens.images[0]}
                            alt={`${lens.brand} ${lens.name}`}
                            fill
                            className="object-contain p-6"
                            sizes="(max-width: 768px) 320px, 400px"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[120px] md:text-[160px] font-serif font-light text-foreground/5 select-none">
                            {lens.brand.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {lens.isNew && (
                          <Badge className="bg-foreground text-background text-xs">Nuevo</Badge>
                        )}
                        {lens.isFeatured && (
                          <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/80">Destacado</Badge>
                        )}
                      </div>

                      {/* Week Number Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                          #{index + 1}
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                        <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-1">
                          {lens.brand}
                        </p>
                        <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
                          {lens.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-white/60 text-sm">{lens.color}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/60 text-sm capitalize">{lens.gender}</span>
                        </div>
                        
                        {isCurrent && (
                          <div className="flex items-center justify-between pt-4 border-t border-white/20">
                            <span className="text-white text-2xl font-semibold">
                              {formatPrice(lens.price)}
                            </span>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                              <Button 
                                size="sm" 
                                className="rounded-full bg-white text-foreground hover:bg-white/90 gap-2"
                              >
                                <MessageCircle className="h-4 w-4" />
                                Consultar
                              </Button>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {highlightLenses.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'transition-all duration-300 rounded-full',
                currentIndex === index
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground'
              )}
            >
              <span className="sr-only">Ir a slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
