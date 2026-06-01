'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const stats = [
  { value: '10+', label: 'Years' },
  { value: '10,000+', label: 'Members' },
  { value: '500+', label: 'Events' },
  { value: '15+', label: 'Cities' },
]

const testimonials = [
  {
    quote: "I've made some of my closest friends through Halal Dinner Club. It is such a warm, welcoming community.",
    author: 'Aisha P.',
    role: 'Member since 2019',
    rating: 5,
  },
  {
    quote: "As a revert, this club helped me find my place in the Muslim community. The events are always well organized.",
    author: 'James M.',
    role: 'Member since 2021',
    rating: 5,
  },
  {
    quote: "Hosting dinners has been incredibly rewarding. Watching friendships form over food never gets old.",
    author: 'Sarah A.',
    role: 'Host since 2018',
    rating: 5,
  },
]

export function SocialProof() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-stone-100 pb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{stat.value}</div>
              <div className="text-sm text-stone-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">What our community says</h2>
          <p className="text-stone-500">Real stories from real members</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-50 rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-stone-900 text-sm">{testimonial.author}</p>
                <p className="text-xs text-stone-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}