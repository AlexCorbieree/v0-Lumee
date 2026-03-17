'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Eye } from 'lucide-react'
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
}

export function LensCard({ lens }: LensCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const whatsappMessage = `Hola, me interesa el modelo ${lens.name} de ${lens.brand}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/522221234567?text=${encodeURIComponent(whatsappMessage)}`

  // Generate placeholder color for demo
  const placeholderColors = [
    'from-amber-100 to-amber-200',
    'from-stone-100 to-stone-200',
    'from-zinc-100 to-zinc-200',
    'from-neutral-100 to-neutral-200',
    'from-slate-100 to-slate-200',
  ]
  const placeholderColor = placeholderColors[parseInt(lens.id) % placeholderColors.length]

  return (
    <>
      <article
        className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {/* Placeholder gradient when no image */}
          <div className={cn('absolute inset-0 bg-gradient-to-br', placeholderColor)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-serif text-muted-foreground/30">
                {lens.brand.charAt(0)}
              </span>
            </div>
          </div>

          {/* Actual image would go here when available */}
          {/* <Image
            src={lens.images[0]}
            alt={`${lens.brand} ${lens.name}`}
            fill
            className="object-cover"
          /> */}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {lens.isNew && (
              <Badge className="bg-foreground text-background">Nuevo</Badge>
            )}
            {lens.isFeatured && (
              <Badge variant="secondary">Destacado</Badge>
            )}
          </div>

          {/* Quick View Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => setShowQuickView(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalles
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {lens.brand}
            </p>
            <h3 className="font-medium text-foreground line-clamp-1">{lens.name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{lens.color}</p>
              <p className="text-lg font-semibold text-foreground">
                {formatPrice(lens.price)}
              </p>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Contactar por WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              {lens.brand} - {lens.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Image */}
            <div className={cn('aspect-square rounded-lg bg-gradient-to-br', placeholderColor)}>
              <div className="h-full flex items-center justify-center">
                <span className="text-6xl font-serif text-muted-foreground/30">
                  {lens.brand.charAt(0)}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex gap-2 mb-4">
                {lens.isNew && (
                  <Badge className="bg-foreground text-background">Nuevo</Badge>
                )}
                <Badge variant="outline">
                  {lens.category === 'sol' ? 'Lentes de Sol' : 'Lentes de Aumento'}
                </Badge>
              </div>

              <dl className="space-y-3 flex-1">
                <div>
                  <dt className="text-sm text-muted-foreground">Marca</dt>
                  <dd className="font-medium">{lens.brand}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Modelo</dt>
                  <dd className="font-medium">{lens.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Color</dt>
                  <dd className="font-medium">{lens.color}</dd>
                </div>
                {lens.material && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Material</dt>
                    <dd className="font-medium">{lens.material}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-muted-foreground">Género</dt>
                  <dd className="font-medium capitalize">{lens.gender}</dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-3xl font-semibold mb-4">{formatPrice(lens.price)}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full rounded-full" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Preguntar por WhatsApp
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
