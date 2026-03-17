'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#marcas', label: 'Marcas' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#ubicacion', label: 'Ubicación' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              'text-2xl md:text-3xl font-serif tracking-wider transition-colors',
              isScrolled ? 'text-foreground' : 'text-white'
            )}
          >
            LUMEE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm tracking-wide transition-colors hover:opacity-70',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button Desktop */}
        <a
          href="https://wa.me/522221234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20lentes"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <Button
            variant={isScrolled ? 'default' : 'outline'}
            className={cn(
              'rounded-full px-6',
              !isScrolled && 'border-white text-white hover:bg-white/10'
            )}
          >
            Contactar
          </Button>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn('h-6 w-6', isScrolled ? 'text-foreground' : 'text-white')} />
          ) : (
            <Menu className={cn('h-6 w-6', isScrolled ? 'text-foreground' : 'text-white')} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground text-lg py-2 border-b border-border/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/522221234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20lentes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              <Button className="w-full rounded-full">Contactar por WhatsApp</Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
