'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Eid Ul-Adha Celebration Dinner',
    date: 'Sat, Jun 15 · 7:00 PM',
    city: 'London',
    venue: 'The Great Chase, Islington',
    attendees: 12,
    maxAttendees: 20,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    host: 'Sarah A.',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 2,
    title: 'Muslim Professionals Networking Dinner',
    date: 'Thu, Jun 20 · 6:30 PM',
    city: 'London',
    venue: 'Benares Restaurant, Mayfair',
    attendees: 18,
    maxAttendees: 25,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    host: 'Ahmed H.',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 3,
    title: 'Singles Dinner: Ages 25-35',
    date: 'Fri, Jun 28 · 7:00 PM',
    city: 'Manchester',
    venue: 'The Halal Guys, City Centre',
    attendees: 8,
    maxAttendees: 12,
    price: '£15',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    host: 'Fatima K.',
    hostImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  {
    id: 4,
    title: 'Weekend Family Brunch',
    date: 'Sun, Jun 16 · 11:00 AM',
    city: 'Birmingham',
    venue: 'The Breakfast Club, Soho',
    attendees: 22,
    maxAttendees: 30,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1533089862017-5614ec57f241?w=400',
    host: 'Yusuf I.',
    hostImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Upcoming events</h2>
            <p className="text-stone-500 mt-1">Join these amazing gatherings near you</p>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700">
            Explore all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/events/${event.id}`}>
                <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-emerald-700">{event.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    
                    <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{event.venue}</span>
                    </div>

                    {/* Host & Attendees */}
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={event.hostImage}
                          alt={event.host}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-stone-600">{event.host}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/events" className="inline-flex items-center gap-1 text-emerald-600 font-medium">
            Explore all events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}