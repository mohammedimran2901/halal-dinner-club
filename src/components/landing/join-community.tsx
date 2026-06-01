'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Calendar, MessageCircle } from 'lucide-react'

export function JoinCommunity() {
  return (
    <section className="py-20 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join a community that shares your values
            </h2>
            <p className="text-emerald-100 text-lg mb-8">
              Whether you are looking to make new friends, find a spouse, or network with fellow Muslims, 
              Halal Dinner Club brings people together over great food in a halal environment.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Users, text: 'Meet like-minded Muslims in your city' },
                { icon: Calendar, text: 'Attend curated events for every interest' },
                { icon: MessageCircle, text: 'Build lasting friendships and connections' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <item.icon className="w-5 h-5 text-emerald-300" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-full px-8">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  Browse Events
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
                    alt="Community dinner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400"
                    alt="Group celebration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
                    alt="Friends dining"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400"
                    alt="Brunch gathering"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}