'use client'

import { useState } from 'react'
import { MessageCircle, Eye, Heart, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Lens } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LensCardProps {
  lens: Lens
  variant?: 'default' | 'featured'
}

export function LensCard({ lens, variant = 'default' }: LensCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const whatsappMessage = `Hola, me interesa el modelo ${lens.name} de ${lens.brand}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/522221234567?text=${encodeURIComponent(whatsappMessage)}`

  // Premium gradient colors
  const gradientColors = [
    'from-amber-50 via-orange-50 to-rose-50',
    'from-stone-100 via-neutral-50 to-zinc-50',
    'from-slate-100 via-gray-50 to-stone-50',
    'from-rose-50 via-pink-50 to-fuchsia-50',
    'from-sky-50 via-indigo-50 to-violet-50',
    'from-emerald-50 via-teal-50 to-cyan-50',
    'from-amber-100 via-yellow-50 to-lime-50',
    'from-violet-50 via-purple-50 to-pink-50',
  ]
  const gradientColor = gradientColors[parseInt(lens.id) % gradientColors.length]

  const isFeatured = variant === 'featured' || lens.isFeatured

  return (
    <>
      <article
        className={cn(
          'group relative rounded-xl overflow-hidden transition-all duration-500',
          'bg-card border border-border/40',
          'hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1',
          isFeatured && 'md:col-span-2 md:row-span-2'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={cn(
          'relative overflow-hidden',
          isFeatured ? 'aspect-square md:aspect-[4/3]' : 'aspect-[4/5]'
        )}>
          {/* Premium Gradient Background */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110',
            gradientColor
          )}>
            {/* Decorative Circles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/40 blur-3xl" />
              <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/30 blur-3xl" />
            </div>
            
            {/* Brand Watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn(
                'font-serif font-light text-foreground/[0.03] select-none',
                isFeatured ? 'text-[200px]' : 'text-[100px]'
              )}>
                {lens.brand.charAt(0)}
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
            <div className="flex flex-col gap-1.5">
              {lens.isNew && (
                <Badge className="bg-foreground text-background text-[10px] px-2 py-0.5">
                  NUEVO
                </Badge>
              )}
              {isFeatured && !lens.isNew && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 backdrop-blur-sm bg-white/90">
                  DESTACADO
                </Badge>
              )}
            </div>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                'p-2 rounded-full backdrop-blur-sm transition-all duration-300',
                isLiked 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-rose-500'
              )}
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
            </button>
          </div>

          {/* Hover Overlay */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300',
              'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              size="sm"
              className="rounded-full bg-white text-foreground hover:bg-white/90 shadow-lg gap-2"
              onClick={() => setShowQuickView(true)}
            >
              <Eye className="h-4 w-4" />
              Vista Rápida
            </Button>
          </div>

          {/* Bottom Gradient for Content */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-4 md:p-5 -mt-8 bg-background rounded-t-2xl">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-medium">
              {lens.brand}
            </p>
            <Badge variant="outline" className="text-[10px] h-5">
              {lens.category === 'sol' ? 'Sol' : 'Aumento'}
            </Badge>
          </div>
          
          {/* Name */}
          <h3 className={cn(
            'font-medium text-foreground mb-1 line-clamp-1',
            isFeatured ? 'text-lg md:text-xl' : 'text-sm md:text-base'
          )}>
            {lens.name}
          </h3>
          
          {/* Color */}
          <p className="text-xs text-muted-foreground mb-3">
            {lens.color} • {lens.gender === 'unisex' ? 'Unisex' : lens.gender === 'hombre' ? 'Hombre' : 'Mujer'}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div>
              <p className={cn(
                'font-semibold text-foreground',
                isFeatured ? 'text-xl md:text-2xl' : 'text-lg'
              )}>
                {formatPrice(lens.price)}
              </p>
              <p className="text-[10px] text-muted-foreground">MXN</p>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                size={isFeatured ? 'default' : 'sm'} 
                className="rounded-full gap-2 bg-primary hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Consultar</span>
              </Button>
            </a>
          </div>
        </div>
      </article>

      {/* Premium Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <div className={cn(
              'aspect-square md:aspect-auto md:h-full bg-gradient-to-br relative',
              gradientColor
            )}>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/40 blur-3xl" />
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/30 blur-3xl" />
              </div>
              <div className="h-full flex items-center justify-center relative">
                <span className="text-[160px] font-serif font-light text-foreground/5 select-none">
                  {lens.brand.charAt(0)}
                </span>
              </div>
              
              {/* Badges in Modal */}
              <div className="absolute top-4 left-4 flex gap-2">
                {lens.isNew && (
                  <Badge className="bg-foreground text-background">Nuevo</Badge>
                )}
                <Badge variant="secondary" className="backdrop-blur-sm bg-white/90">
                  {lens.category === 'sol' ? 'Lentes de Sol' : 'Lentes de Aumento'}
                </Badge>
              </div>
            </div>

            {/* Details Side */}
            <div className="p-6 md:p-8 flex flex-col">
              <DialogHeader className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-1">
                  {lens.brand}
                </p>
                <DialogTitle className="text-2xl md:text-3xl font-serif">
                  {lens.name}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-6 space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Color</p>
                    <p className="font-medium text-sm">{lens.color}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Género</p>
                    <p className="font-medium text-sm capitalize">{lens.gender}</p>
                  </div>
                  {lens.material && (
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Material</p>
                      <p className="font-medium text-sm">{lens.material}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Categoría</p>
                    <p className="font-medium text-sm">{lens.category === 'sol' ? 'Lentes de Sol' : 'Lentes de Aumento'}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Visítanos en nuestra óptica para probarte este modelo y recibir asesoría personalizada de nuestros expertos.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Precio</p>
                    <p className="text-3xl font-semibold">{formatPrice(lens.price)}</p>
                  </div>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      'p-3 rounded-full border transition-all duration-300',
                      isLiked 
                        ? 'bg-rose-500 border-rose-500 text-white' 
                        : 'border-border hover:border-rose-500 hover:text-rose-500'
                    )}
                  >
                    <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
                  </button>
                </div>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full rounded-full h-12 text-base gap-2" size="lg">
                    <MessageCircle className="h-5 w-5" />
                    Consultar por WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
