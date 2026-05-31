'use client'

import { motion } from 'framer-motion'
import { Search, CalendarCheck, Users } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse halal dining events in your city. Filter by theme, date, or event type to find your perfect match.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: CalendarCheck,
    title: 'RSVP',
    description: 'Join as a member to RSVP to events. Subscribe to unlock hosting privileges and create your own gatherings.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Users,
    title: 'Dine Together',
    description: 'Show up, break bread, and build lasting connections with fellow Muslims in your community.',
    color: 'bg-teal-100 text-teal-700',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Three simple steps to connect with your community over halal dining
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-stone-50 rounded-2xl p-8 text-center h-full">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}