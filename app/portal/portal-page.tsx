'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Mic } from 'lucide-react'
import { Starfield } from '@/components/starfield'
import { Navigation } from '@/components/navigation'
import { Portal } from '@/components/portal'
import { HelpButton } from '@/components/help-button'
import { WorldMap } from '@/components/world-map'
import { useToast } from '@/components/achievement-toast'
import { useGame } from '@/lib/game-state'
import { customScenarios, getScenarioById, resolveScenarioFromText, scenarioList } from '@/lib/custom-scenarios'

const adventureChips = scenarioList.map((scenario) => ({
  id: scenario.id,
  emoji: scenario.emoji,
  text: scenario.title,
  character: scenario.character.name,
}))

const getLoadingSteps = (scenarioId: string) => {
  const scenario = getScenarioById(scenarioId)
  return scenario.portalMessages.loading.map((message, index) => ({
    emoji: scenario.emoji,
    text: message
  }))
}

export function PortalPage() {
  const router = useRouter()
  const { startAdventure, addXP } = useGame()
  const { showToast } = useToast()
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadingSteps, setLoadingSteps] = useState(getLoadingSteps('einstein'))

  const beginScenario = (scenarioId: string, prompt?: string) => {
    const scenario = getScenarioById(scenarioId)
    setLoadingSteps(getLoadingSteps(scenario.id))
    setIsGenerating(true)
    setCurrentStep(0)
    setProgress(0)
    setInput('')
    localStorage.setItem('currentScenarioId', scenario.id)
    localStorage.removeItem('currentScenario')
    startAdventure(scenario.title)
    addXP(5)
    showToast('xp', 'Adventure Started!', `+5 XP for visiting ${scenario.character.name}`)

    if (prompt) {
      localStorage.setItem('lastPortalPrompt', prompt)
    }
  }

  const handleSubmit = (text?: string) => {
    const adventure = (text || input).trim()
    if (!adventure) return

    const scenario = resolveScenarioFromText(adventure)
    beginScenario(scenario.id, adventure)
  }

  const handleLocationClick = (location: { id: string; name: string }) => {
    const scenario = customScenarios[location.id] ?? resolveScenarioFromText(location.name)
    beginScenario(scenario.id, location.name)
  }

  useEffect(() => {
    const selectedAdventure = localStorage.getItem('selectedAdventure')

    if (selectedAdventure) {
      setInput(selectedAdventure)
      localStorage.removeItem('selectedAdventure')
    }
  }, [])

  useEffect(() => {
    if (isGenerating) {
      const progressInterval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 50)

      const stepInterval = setInterval(() => {
        setCurrentStep((prev: number) => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(stepInterval)
            setTimeout(() => {
              router.push('/simulation')
            }, 800)
            return prev
          }
          return prev + 1
        })
      }, 800)

      return () => {
        clearInterval(progressInterval)
        clearInterval(stepInterval)
      }
    }
  }, [isGenerating, loadingSteps, router])

  return (
    <div className="min-h-screen relative">
      <Starfield starCount={80} />
      <Navigation />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-bold text-[#f97066] mb-8"
        >
          ✨ Time Portal Machine ✨
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Portal size={320} isGenerating={isGenerating} showScene={!isGenerating} />
        </motion.div>

        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 w-full max-w-md"
            >
              <div className="h-2 bg-white rounded-full overflow-hidden mb-6 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#f97066] to-[#fbbf24]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-3">
                {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80 text-sm"
                  >
                    <span className="text-lg">{step.emoji}</span>
                    <span>{step.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mt-8"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {adventureChips.map((chip, index) => (
                  <motion.button
                    key={chip.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubmit(chip.text)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <span className="mr-2">{chip.emoji}</span>
                    {chip.text} · {chip.character}
                  </motion.button>
                ))}
              </div>

              <div className="mb-4 text-center text-white/70 text-sm">
                Try questions about Einstein, Curie, Franklin, Armstrong, Newton, Cleopatra, or the Wright brothers.
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Type a question like 'Tell me about gravity' or 'Take me to the Moon'"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[#f97066]/50 focus:bg-white/15 transition-all"
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-[#f97066] to-[#fbbf24] rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-white/60 text-sm">
                <Mic className="w-4 h-4" />
                <span>Voice input coming soon!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-6xl mt-12"
        >
          <h3 className="text-center text-white/80 text-2xl font-bold mb-2">🗺️ Pick a Place in History</h3>
          <p className="text-center text-white/60 text-sm mb-6">Click a glowing location to start your adventure!</p>
          
          <WorldMap onLocationClick={handleLocationClick} />
        </motion.div>
      </main>

      <HelpButton />
    </div>
  )
}
