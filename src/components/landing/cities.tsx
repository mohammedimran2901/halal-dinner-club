'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

const cities = [
  { name: 'London', events: 45, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400' },
  { name: 'Birmingham', events: 23, image: 'https://images.unsplash.com/photo-1565521990426-613d7b8767b4?w=400' },
  { name: 'Manchester', events: 18, image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400' },
  { name: 'Bradford', events: 12, image: 'https://images.unsplash.com/photo-1562592306-5496ed1b9478?w=400' },
  { name: 'Glasgow', events: 8, image: 'https://images.unsplash.com/photo-1533552743191-5b9d5169337e?w=400' },
  { name: 'Leeds', events: 6, image: 'https://images.unsplash.com/photo-1606060196892-c92336214371?w=400' },
]

export function Cities() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
            Find Your City
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Halal Dinner Club is active in cities across the UK
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/cities/${city.name.toLowerCase()}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <MapPin className="w-5 h-5" />
                      <h3 className="text-2xl font-bold">{city.name}</h3>
                    </div>
                    <p className="text-white/80 text-sm">{city.events} upcoming events</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}