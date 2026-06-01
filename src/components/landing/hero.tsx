'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { useState } from 'react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
              Discover halal dining{' '}
              <span className="text-emerald-600">events near you</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
              Connect with the Muslim community over incredible halal food. 
              Join dinners, brunches, and networking events in your city.
            </p>

            {/* Search Bar - Meetup Style */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-full shadow-lg border border-stone-200 p-2">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for dinners, brunches, networking..."
                    className="w-full px-3 py-2 outline-none text-stone-700 placeholder:text-stone-400 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="hidden sm:flex items-center px-4 border-l border-stone-200">
                  <MapPin className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="London, UK"
                    className="w-32 px-3 py-2 outline-none text-stone-700 placeholder:text-stone-400 bg-transparent"
                  />
                </div>
                <Link href={`/events?q=${encodeURIComponent(searchQuery)}`}>
                  <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-2 h-12">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10K+ members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>500+ events</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>15 cities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event Cards Preview - Overlapping */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { title: 'Eid Celebration Dinner', city: 'London', attendees: 45, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400' },
              { title: 'Muslim Professionals Network', city: 'Birmingham', attendees: 32, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400' },
              { title: 'Singles Dinner Night', city: 'Manchester', attendees: 24, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
              { title: 'Family Brunch Sunday', city: 'London', attendees: 56, image: 'https://images.unsplash.com/photo-1533089862017-5614ec57f241?w=400' },
            ].map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href="/events">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs font-medium text-emerald-300 mb-1">{event.city}</p>
                      <h3 className="font-semibold text-sm leading-tight mb-2">{event.title}</h3>
                      <p className="text-xs text-white/80">{event.attendees} going</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}