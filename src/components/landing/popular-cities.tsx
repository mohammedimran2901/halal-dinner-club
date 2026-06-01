'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const cities = [
  { name: 'London', events: 45, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400' },
  { name: 'Birmingham', events: 23, image: 'https://images.unsplash.com/photo-1565521990426-613d7b8767b4?w=400' },
  { name: 'Manchester', events: 18, image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400' },
  { name: 'Bradford', events: 12, image: 'https://images.unsplash.com/photo-1562592306-5496ed1b9478?w=400' },
  { name: 'Glasgow', events: 8, image: 'https://images.unsplash.com/photo-1533552743191-5b9d5169337e?w=400' },
  { name: 'Leeds', events: 6, image: 'https://images.unsplash.com/photo-1606060196892-c92336214371?w=400' },
]

export function PopularCities() {
  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Popular cities</h2>
            <p className="text-stone-500 mt-1">Find events happening across the UK</p>
          </div>
          <Link href="/cities" className="hidden sm:flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/cities/${city.name.toLowerCase()}`}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden aspect-square mb-3">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1 text-white">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm font-semibold">{city.name}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500">{city.events} upcoming events</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}