import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

const footerLinks = {
  catalogo: [
    { label: 'Lentes de Sol', href: '#catalogo' },
    { label: 'Lentes de Aumento', href: '#catalogo' },
    { label: 'Marcas', href: '#marcas' },
  ],
  servicios: [
    { label: 'Examen de la Vista', href: '#nosotros' },
    { label: 'Asesoría de Estilo', href: '#nosotros' },
    { label: 'Ajuste de Armazones', href: '#nosotros' },
  ],
  contacto: [
    { label: 'WhatsApp', href: 'https://wa.me/522221234567' },
    { label: 'Ubicación', href: '#ubicacion' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif tracking-wider">LUMEE</span>
            </Link>
            <p className="text-background/70 text-sm mb-4">
              Óptica boutique de lujo en Puebla. Tu estilo, nuestra pasión.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Catalogo */}
          <div>
            <h4 className="font-medium mb-4">Catálogo</h4>
            <ul className="space-y-2">
              {footerLinks.catalogo.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-medium mb-4">Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-medium mb-4">Contacto</h4>
            <ul className="space-y-2">
              {footerLinks.contacto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-background/70 text-sm hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            {currentYear} Lumee Óptica. Todos los derechos reservados.
          </p>
          <p className="text-background/50 text-sm">
            Puebla, México
          </p>
        </div>
      </div>
    </footer>
  )
}
