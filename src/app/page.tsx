import { Hero } from '@/components/landing/hero'
import { CategoryPills } from '@/components/landing/category-pills'
import { UpcomingEvents } from '@/components/landing/upcoming-events'
import { JoinCommunity } from '@/components/landing/join-community'
import { PopularCities } from '@/components/landing/popular-cities'
import { SocialProof } from '@/components/landing/social-proof'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryPills />
      <UpcomingEvents />
      <JoinCommunity />
      <PopularCities />
      <SocialProof />
    </div>
  )
}