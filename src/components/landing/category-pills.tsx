'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Utensils, 
  Heart, 
  Briefcase, 
  Users, 
  Sparkles, 
  Moon, 
  Gift, 
  GraduationCap,
  PartyPopper
} from 'lucide-react'

const categories = [
  { name: 'Dinner', icon: Utensils, href: '/events?type=dinner' },
  { name: 'Brunch', icon: Sparkles, href: '/events?type=brunch' },
  { name: 'Singles', icon: Heart, href: '/events?theme=singles' },
  { name: 'Networking', icon: Briefcase, href: '/events?theme=networking' },
  { name: 'Family', icon: Users, href: '/events?theme=family' },
  { name: 'Eid', icon: PartyPopper, href: '/events?theme=eid' },
  { name: 'Ramadan', icon: Moon, href: '/events?theme=ramadan' },
  { name: 'Charity', icon: Gift, href: '/events?theme=charity' },
  { name: 'Students', icon: GraduationCap, href: '/events?theme=social' },
]

export function CategoryPills() {
  return (
    <section className="py-8 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={category.href}>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors whitespace-nowrap cursor-pointer">
                  <category.icon className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-stone-700">{category.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}