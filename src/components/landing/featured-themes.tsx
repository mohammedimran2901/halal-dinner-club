'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Heart, Briefcase, Users } from 'lucide-react'

const themes = [
  {
    icon: Sparkles,
    title: 'Eid Celebrations',
    description: 'Special dinners for Eid al-Fitr and Eid al-Adha with the community.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Heart,
    title: 'Singles Dinners',
    description: 'Meet other single Muslims in a respectful, halal environment.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: Briefcase,
    title: 'Networking Events',
    description: 'Connect with Muslim professionals across various industries.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Family Brunches',
    description: 'Bring the whole family for relaxed weekend gatherings.',
    image: 'https://images.unsplash.com/photo-1533089862017-5614ec57f241?w=600',
    color: 'from-blue-500 to-indigo-600',
  },
]

export function FeaturedThemes() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
            Featured Event Themes
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Something for every occasion and interest in the Muslim community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/events?theme=${theme.title.toLowerCase().replace(' ', '-')}`}>
                <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.color} opacity-80`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <theme.icon className="w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{theme.title}</h3>
                    <p className="text-sm text-white/90">{theme.description}</p>
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