import { MapPin, Clock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LocationSection() {
  return (
    <section id="ubicacion" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
            Encuéntranos
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Visítanos en Puebla</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map Placeholder */}
          <div className="aspect-video lg:aspect-square rounded-lg overflow-hidden bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4533893939!2d-98.20878582490765!3d19.040689482162186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0bd5749b6ff%3A0x2aaec65c8b5f5ddf!2sPuebla%2C%20Pue.!5e0!3m2!1sen!2smx!4v1710459600000!5m2!1sen!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Lumee Óptica"
            />
          </div>

          {/* Info Cards */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Dirección</h3>
                  <p className="text-muted-foreground text-sm">
                    Atlixcáyotl 4931, Reserva Territorial Atlixcáyotl,
                    <br />
                    Centros Comerciales Desarrollo Atlixcáyotl,
                    <br />
                    72193 Puebla, Pue.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Horario</h3>
                  <p className="text-muted-foreground text-sm">
                    Lunes a Domingo
                    <br />
                    11:00 AM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Contacto</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Contáctanos directamente por WhatsApp
                  </p>
                  <a
                    href="https://wa.me/522221234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20lentes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="rounded-full">
                      Enviar Mensaje
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
