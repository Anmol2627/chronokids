'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Sparkles, MessageCircle, BookOpen, Bell } from 'lucide-react'
import { ChronoKidsLogo } from '@/components/chronokids-logo'
import { useGame } from '@/lib/game-state'
import { AdventureBook } from '@/components/adventure-book'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'

const navItems = [
  { href: '/', label: 'Home', icon: Home, emoji: '🏠' },
  { href: '/portal', label: 'Portal', icon: Sparkles, emoji: '🌀' },
  { href: '/simulation', label: 'Adventure', icon: MessageCircle, emoji: '💬' },
  { href: '/journal', label: 'Journal', icon: BookOpen, emoji: '📖' },
]

export function Navigation() {
  const pathname = usePathname()
  const { state } = useGame()
  const [bookOpen, setBookOpen] = useState(false)

  const getBreadcrumbs = () => {
    const crumbs = [{ href: '/', label: '🏠 Home' }]
    if (pathname === '/portal') {
      crumbs.push({ href: '/portal', label: '🌀 Portal' })
    } else if (pathname === '/simulation') {
      crumbs.push({ href: '/portal', label: '🌀 Portal' })
      // Read actual current scenario instead of hardcoding Einstein
      let scenarioLabel = 'Adventure'
      if (typeof window !== 'undefined') {
        const storedId = localStorage.getItem('currentScenarioId')
        if (storedId) {
          const scenario = getScenarioById(storedId)
          scenarioLabel = scenario.title
        } else if (state.currentAdventure) {
          const scenario = resolveScenarioFromText(state.currentAdventure)
          scenarioLabel = scenario.title
        }
      }
      crumbs.push({ href: '/simulation', label: `🔬 ${scenarioLabel}` })
    } else if (pathname === '/journal') {
      crumbs.push({ href: '/journal', label: '📖 Journal' })
    }
    return crumbs
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1e1b4b]/80 backdrop-blur-xl border-b border-purple-500/30 hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg" aria-label="ChronoKids Home">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] via-[#a855f7] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-purple-500/30"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              <span className="text-xl">⏳</span>
            </motion.div>
            <ChronoKidsLogo size="sm" animated={false} />
          </Link>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb navigation">
            {getBreadcrumbs().map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-purple-400" aria-hidden="true">→</span>}
                <Link 
                  href={crumb.href}
                  className={`hover:text-[#f97316] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-1 py-0.5 ${
                    pathname === crumb.href ? 'text-white font-semibold' : 'text-purple-200'
                  }`}
                  aria-current={pathname === crumb.href ? 'page' : undefined}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* XP Display */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#eab308]/20 to-[#f97316]/20 border border-yellow-400/50 shadow-lg shadow-yellow-500/20">
              <span className="text-lg">⭐</span>
              <span className="font-display font-bold text-yellow-300">{state.totalXP.toLocaleString()} XP</span>
            </div>
            {/* Adventure Book Button */}
            <motion.button
              onClick={() => setBookOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#b45309]/30 to-[#78350f]/30 border border-[#fbbf24]/50 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">📖</span>
              <span className="font-display font-bold text-amber-200 text-sm hidden lg:inline">My Book</span>
            </motion.button>

            {/* Notification Bell */}
            <motion.button 
              className="relative p-2 rounded-full hover:bg-purple-500/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-purple-200" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Avatar */}
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f97316] via-[#a855f7] to-[#0ea5e9] p-0.5 cursor-pointer shadow-lg shadow-purple-500/30"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-full rounded-full bg-[#1e1b4b] flex items-center justify-center">
                <span className="text-lg">🚀</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#1e1b4b]/90 backdrop-blur-xl border-t border-purple-500/30 md:hidden safe-area-inset-bottom"
      >
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-2"
              >
                <motion.div
                  className={`text-2xl ${isActive ? 'scale-110' : ''}`}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.emoji}
                </motion.div>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-white' : 'text-purple-300'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0 w-12 h-1 rounded-full bg-gradient-to-r from-[#f97316] via-[#a855f7] to-[#0ea5e9]"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </motion.nav>

      {/* Adventure Book Modal */}
      <AdventureBook isOpen={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  )
}
