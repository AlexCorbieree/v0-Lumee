'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Eye, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Lens } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ShowroomCardProps {
  lens: Lens
  index: number
}

export function ShowroomCard({ lens, index }: ShowroomCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const whatsappMessage = `Hola, me interesa el modelo ${lens.name} de ${lens.brand}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/522221234567?text=${encodeURIComponent(whatsappMessage)}`

  // Get current variant images or default to lens.images
  const currentVariantImages = lens.variants && lens.variants.length > 0 
    ? lens.variants[selectedVariant]?.images || lens.images
    : lens.images

  // Simulate multiple images for demo
  const images = currentVariantImages && currentVariantImages.length > 0 
    ? currentVariantImages 
    : [lens.images?.[0] || '/placeholder.png']

  return (
    <>
      <article
        className={cn(
          'group relative bg-card rounded-2xl overflow-hidden cursor-pointer',
          'border border-border/30 hover:border-border/60',
          'transition-all duration-500 ease-out',
          'hover:shadow-2xl hover:shadow-primary/5',
        )}
        style={{
          animationDelay: `${index * 50}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setShowModal(true)
          setCurrentImageIndex(0)
          setSelectedVariant(0)
        }}
      >
        {/* Image Section */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          {/* Placeholder/Image */}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out',
            isHovered ? 'scale-105' : 'scale-100'
          )}>
            <div className="relative w-4/5 h-4/5 flex items-center justify-center">
              <span className="text-8xl font-serif font-light text-foreground/5 select-none">
                {lens.brand.charAt(0)}
              </span>
            </div>
          </div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex flex-col gap-2">
              {lens.isNew && (
                <Badge className="bg-foreground text-background text-[10px] font-medium tracking-wider">
                  NUEVO
                </Badge>
              )}
              {lens.isFeatured && (
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-[10px] font-medium">
                  DESTACADO
                </Badge>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                isLiked
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-rose-500 hover:scale-110'
              )}
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
            </button>
          </div>

          {/* Hover Overlay */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent',
            'flex items-end justify-center pb-8',
            'transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full gap-2 bg-background text-foreground hover:bg-background/90"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
            >
              <Eye className="h-4 w-4" />
              Ver Detalles
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5">
          {/* Brand */}
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-medium mb-1.5">
            {lens.brand}
          </p>

          {/* Name */}
          <h3 className="font-medium text-foreground text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {lens.name}
          </h3>

          {/* Details */}
          <p className="text-xs text-muted-foreground mb-4">
            {lens.color} · {lens.category === 'sol' ? 'Sol' : 'Aumento'}
          </p>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold text-foreground">
                {formatPrice(lens.price)}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                'bg-primary text-primary-foreground hover:bg-primary/90',
                'transition-all duration-300 hover:scale-105'
              )}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Info</span>
            </a>
          </div>
        </div>
      </article>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            setShowModal(false)
            setCurrentImageIndex(0)
            setSelectedVariant(0)
          }}
        >
          <div 
            className="relative w-full max-w-5xl bg-card rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false)
                setCurrentImageIndex(0)
                setSelectedVariant(0)
              }}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative aspect-square bg-secondary/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[200px] font-serif font-light text-foreground/5 select-none">
                    {lens.brand.charAt(0)}
                  </span>
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            i === currentImageIndex ? 'bg-foreground w-6' : 'bg-foreground/30'
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {lens.isNew && (
                    <Badge className="bg-foreground text-background">Nuevo</Badge>
                  )}
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {lens.category === 'sol' ? 'Lentes de Sol' : 'Lentes de Aumento'}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.25em] font-medium mb-2">
                    {lens.brand}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
                    {lens.name}
                  </h2>

                  {/* Color Variant Selector */}
                  {lens.variants && lens.variants.length > 0 && (
                    <div className="mb-8 pb-8 border-b border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                        Cambiar Color
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {lens.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedVariant(idx)
                              setCurrentImageIndex(0)
                            }}
                            className={cn(
                              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                              selectedVariant === idx
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary/50 text-foreground hover:bg-secondary'
                            )}
                          >
                            {variant.color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Color</p>
                      <p className="font-medium">{lens.variants && lens.variants.length > 0 ? lens.variants[selectedVariant]?.color : lens.color}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Genero</p>
                      <p className="font-medium capitalize">{lens.gender === 'unisex' ? 'Unisex' : lens.gender === 'hombre' ? 'Hombre' : 'Mujer'}</p>
                    </div>
                    {lens.material && (
                      <div className="p-4 rounded-xl bg-secondary/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Material</p>
                        <p className="font-medium">{lens.material}</p>
                      </div>
                    )}
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Tipo</p>
                      <p className="font-medium">{lens.category === 'sol' ? 'Sol' : 'Aumento'}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Visita nuestra optica en Puebla para probarte este modelo. Nuestros especialistas te brindaran asesoria personalizada para encontrar el estilo perfecto para ti.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Precio</p>
                      <p className="text-4xl font-semibold text-foreground">{formatPrice(lens.price)}</p>
                    </div>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={cn(
                        'w-12 h-12 rounded-full border flex items-center justify-center transition-all',
                        isLiked
                          ? 'bg-rose-500 border-rose-500 text-white'
                          : 'border-border hover:border-rose-500 hover:text-rose-500'
                      )}
                    >
                      <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
                    </button>
                  </div>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full h-14 rounded-full text-base gap-3" size="lg">
                      <MessageCircle className="h-5 w-5" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
