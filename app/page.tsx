import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { sampleLenses } from '@/lib/sample-data'

// Critical path - load immediately
import { WeeklyHighlights } from '@/components/weekly-highlights'

// Below the fold - lazy load
const ShowroomSection = dynamic(() => import('@/components/showroom-section').then(mod => ({ default: mod.ShowroomSection })), {
  loading: () => <SectionSkeleton title="Catalogo" />,
  ssr: true,
})

const BrandsSection = dynamic(() => import('@/components/brands-section').then(mod => ({ default: mod.BrandsSection })), {
  loading: () => <SectionSkeleton title="Marcas" height="h-40" />,
  ssr: true,
})

const AboutSection = dynamic(() => import('@/components/about-section').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <SectionSkeleton title="Nosotros" />,
  ssr: true,
})

const LocationSection = dynamic(() => import('@/components/location-section').then(mod => ({ default: mod.LocationSection })), {
  loading: () => <SectionSkeleton title="Ubicacion" />,
  ssr: true,
})

const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), {
  ssr: true,
})

const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button').then(mod => ({ default: mod.WhatsAppButton })), {
  ssr: false, // Client only
})

// Lightweight skeleton for lazy sections
function SectionSkeleton({ title, height = 'h-96' }: { title: string; height?: string }) {
  return (
    <section className={`${height} bg-secondary/20 animate-pulse flex items-center justify-center`}>
      <div className="text-center">
        <div className="h-4 w-32 bg-secondary/40 rounded mx-auto mb-2" />
        <div className="h-8 w-48 bg-secondary/40 rounded mx-auto" />
      </div>
    </section>
  )
}

export default function Home() {
  // Get featured and new lenses for highlights
  const highlightLenses = sampleLenses
    .filter((lens) => lens.isFeatured || lens.isNew)
    .slice(0, 10)

  // If not enough featured/new, fill with remaining
  const remainingNeeded = 10 - highlightLenses.length
  if (remainingNeeded > 0) {
    const otherLenses = sampleLenses
      .filter((lens) => !lens.isFeatured && !lens.isNew)
      .slice(0, remainingNeeded)
    highlightLenses.push(...otherLenses)
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WeeklyHighlights lenses={highlightLenses} />
        <ShowroomSection />
        <BrandsSection />
        <AboutSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
