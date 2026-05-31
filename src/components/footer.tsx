import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="font-serif text-xl font-bold text-white">
                Halal Dinner Club
              </span>
            </div>
            <p className="text-sm text-stone-400">
              Bringing the Muslim community together over halal dining experiences since 2014.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events" className="hover:text-emerald-400">All Events</Link></li>
              <li><Link href="/cities" className="hover:text-emerald-400">Cities</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400">About Us</Link></li>
              <li><Link href="/host" className="hover:text-emerald-400">Become a Host</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Halal Dinner Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}