import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { WeeklyHighlights } from '@/components/weekly-highlights'
import { ShowroomSection } from '@/components/showroom-section'
import { BrandsSection } from '@/components/brands-section'
import { AboutSection } from '@/components/about-section'
import { LocationSection } from '@/components/location-section'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { sampleLenses } from '@/lib/sample-data'

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
