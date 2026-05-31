'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const stats = [
  { value: '10+', label: 'Years Active' },
  { value: '10,000+', label: 'Members' },
  { value: '500+', label: 'Events Hosted' },
  { value: '15+', label: 'Cities' },
]

const testimonials = [
  {
    quote: "I've made some of my closest friends through Halal Dinner Club. It's such a warm, welcoming community.",
    author: 'Aisha P.',
    role: 'Member since 2019',
    location: 'London',
  },
  {
    quote: "As a revert, this club helped me find my place in the Muslim community. The events are always so well organized.",
    author: 'James M.',
    role: 'Member since 2021',
    location: 'Manchester',
  },
  {
    quote: "Hosting dinners has been incredibly rewarding. Watching friendships form over food never gets old.",
    author: 'Sarah A.',
    role: 'Host since 2018',
    location: 'Birmingham',
  },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
              <div className="text-emerald-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-emerald-200">Real stories from real members</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-emerald-800/50 rounded-2xl p-6 border border-emerald-700"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-emerald-100 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-emerald-300">{testimonial.role} • {testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}