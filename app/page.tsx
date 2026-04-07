'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Starfield } from '@/components/starfield'
import { Navigation } from '@/components/navigation'
import { Portal } from '@/components/portal'
import { CharacterShowcase } from '@/components/character-card'
import { HelpButton } from '@/components/help-button'
import { ToastProvider } from '@/components/achievement-toast'
import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorksSection } from '@/components/landing/how-it-works'
import { EraExplorer } from '@/components/landing/era-explorer'
import { FinalCTA } from '@/components/landing/final-cta'
import { Leaderboard } from '@/components/leaderboard'
import { ExplorerNameInput } from '@/components/explorer-name-input'

export default function HomePage() {
  const [playerName, setPlayerName] = useState<string | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem('playerName')
    if (storedName) {
      setPlayerName(storedName)
    }
  }, [])

  if (!playerName) {
    return <ExplorerNameInput onComplete={setPlayerName} />
  }
  return (
    <ToastProvider>
      <div className="min-h-screen relative">
        <Starfield starCount={150} />
        <Navigation />
        
        <main className="relative z-10">
          <HeroSection />
          <HowItWorksSection />
          
          {/* Character Showcase */}
          <section className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0ff] mb-2">
                  Meet Your Historical Friends! 👋
                </h2>
                <div className="w-40 h-1 mx-auto rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mt-4" />
              </motion.div>
              
              <CharacterShowcase />
            </div>
          </section>
          
          {/* Top Time Explorers Leaderboard */}
          <section className="py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <Leaderboard />
            </div>
          </section>
          
          <EraExplorer />
          <FinalCTA />
        </main>
        
        <HelpButton />
      </div>
    </ToastProvider>
  )
}
