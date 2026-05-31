'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Calendar } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-700/50 mb-6">
              <span className="text-sm font-medium text-emerald-200">
                10 years of bringing the community together
              </span>
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Break bread.
              <br />
              <span className="text-amber-300">Build community.</span>
            </h1>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-lg">
              Discover, join, and host halal dining events. Connect with Muslims 
              in your city over incredible food and meaningful conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/events">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold">
                  Find a Dinner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/host">
                <Button size="lg" variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800/50">
                  Become a Host
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-emerald-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>500+ Events</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800"
                alt="People enjoying halal dinner together"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-medium text-emerald-700">U{i}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">+2,400 members</p>
                    <p className="text-xs text-stone-500">joined this month</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}