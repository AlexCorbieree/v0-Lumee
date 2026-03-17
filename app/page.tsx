import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CatalogSection } from '@/components/catalog-section'
import { BrandsSection } from '@/components/brands-section'
import { AboutSection } from '@/components/about-section'
import { LocationSection } from '@/components/location-section'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <BrandsSection />
        <AboutSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
