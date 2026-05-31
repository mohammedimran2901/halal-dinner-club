'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Guest',
    price: 'Free',
    description: 'Browse events and explore the community',
    features: [
      'Browse all events',
      'View event details',
      'See host profiles',
      'Join waitlist (limited)',
    ],
    cta: 'Get Started',
    href: '/register',
    popular: false,
  },
  {
    name: 'Member',
    price: '£1.99',
    period: '/month',
    description: 'Full access to join events and connect',
    features: [
      'Everything in Guest',
      'RSVP to events',
      'Get email reminders',
      'Message hosts',
      'Join discussions',
      'Post event reviews',
    ],
    cta: 'Subscribe as Member',
    href: '/subscribe?plan=member',
    popular: true,
  },
  {
    name: 'Host',
    price: '£2.99',
    period: '/month',
    description: 'Create and manage your own events',
    features: [
      'Everything in Member',
      'Create unlimited events',
      'Manage RSVPs & waitlist',
      'Message attendees',
      'Access host analytics',
      'Priority support',
    ],
    cta: 'Subscribe as Host',
    href: '/subscribe?plan=host',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-emerald-900 text-white shadow-xl scale-105'
                  : 'bg-stone-50 text-stone-900 border border-stone-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 text-stone-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className={plan.popular ? 'text-emerald-200' : 'text-stone-500'}>{plan.period}</span>}
                </div>
                <p className={`mt-2 text-sm ${plan.popular ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-amber-400' : 'text-emerald-600'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-amber-500 hover:bg-amber-600 text-stone-900'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}