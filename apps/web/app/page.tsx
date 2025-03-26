import { PublicHeader } from '../components/header'
import { PublicHero } from '../components/hero'
import { AlternatingFeatures, GradientFeatures } from '../components/features'
import { StatsSection } from '../components/stats-section'
import { CTASection } from '../components/cta'
import { PublicFooter } from '../components/footer'


export default function Home() {
  return (
    <div className="bg-white">
      <PublicHeader />

      <main>
        <PublicHero />

        <AlternatingFeatures />

        <GradientFeatures />

        <StatsSection />

        <CTASection />
      </main>

      <PublicFooter />
    </div>
  )
}
