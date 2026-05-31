'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <span className="font-serif text-xl font-bold text-emerald-800">
                Halal Dinner Club
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-stone-600 hover:text-emerald-700 font-medium">
              Events
            </Link>
            <Link href="/cities" className="text-stone-600 hover:text-emerald-700 font-medium">
              Cities
            </Link>
            <Link href="/pricing" className="text-stone-600 hover:text-emerald-700 font-medium">
              Pricing
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-stone-600 hover:text-stone-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              href="/events" 
              className="block py-2 text-stone-600 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/cities" 
              className="block py-2 text-stone-600 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cities
            </Link>
            <Link 
              href="/pricing" 
              className="block py-2 text-stone-600 hover:text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block py-2 text-stone-600 hover:text-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 text-stone-600 hover:text-emerald-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block py-2 text-stone-600 hover:text-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="block py-2 text-emerald-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}