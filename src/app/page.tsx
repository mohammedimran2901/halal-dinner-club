import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FeaturedThemes } from '@/components/landing/featured-themes'
import { Pricing } from '@/components/landing/pricing'
import { Cities } from '@/components/landing/cities'
import { SocialProof } from '@/components/landing/social-proof'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedThemes />
      <Pricing />
      <Cities />
      <SocialProof />
    </div>
  )
}