'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGame } from '@/lib/game-state'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'

interface DiscoveryPanelProps {
  discoveries: string[]
}

export function DiscoveryPanel({ discoveries }: DiscoveryPanelProps) {
  const { state } = useGame()
  const currentScenario = (() => {
    if (typeof window !== 'undefined') {
      const storedScenarioId = localStorage.getItem('currentScenarioId')
      if (storedScenarioId) {
        return getScenarioById(storedScenarioId)
      }
    }

    return resolveScenarioFromText(state.currentAdventure)
  })()

  const scenarioFacts = currentScenario.facts
  const [newlyDiscovered, setNewlyDiscovered] = useState<string | null>(null)

  useEffect(() => {
    if (discoveries.length > 0) {
      const latest = discoveries[discoveries.length - 1]
      setNewlyDiscovered(latest)
      setTimeout(() => setNewlyDiscovered(null), 2000)
    }
  }, [discoveries])

  const isDiscovered = (name: string) => {
    return discoveries.includes(name)
  }

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#fffbf5]">
      <h2
        className="font-display font-bold text-lg mb-4 flex items-center gap-2"
        style={{ color: currentScenario.character.color }}
      >
        <span>📖</span>
        {currentScenario.character.name}'s Discovery Journal
      </h2>

      <div className="space-y-2 mb-6">
        {currentScenario.dialogue.discoveries.map((discovery) => {
          const open = isDiscovered(discovery)
          const isNew = open && newlyDiscovered === discovery

          return (
            <motion.div
              key={discovery}
              initial={false}
              animate={{
                scale: isNew ? [0.98, 1.05, 1] : 1,
                rotate: isNew ? [0, -2, 0] : 0,
              }}
              transition={{ duration: isNew ? 0.55 : 0.2 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border"
              style={{
                borderColor: open ? `${currentScenario.character.color}35` : '#fbbf24/20',
                backgroundColor: open ? `${currentScenario.character.color}08` : 'white',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
                style={{
                  backgroundColor: open ? `${currentScenario.character.color}20` : 'white',
                  borderColor: open ? `${currentScenario.character.color}55` : '#e5e7eb',
                }}
              >
                <span className="text-[#451a03] font-bold">
                  {open ? '✓' : '🔒'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-bold leading-snug ${
                    open ? 'text-[#451a03]' : 'text-[#78350f] blur-[1.2px] opacity-70'
                  }`}
                  style={{ filter: !open ? 'blur(1.5px)' : undefined }}
                >
                  {open ? discovery : discovery}
                </p>
                {isNew && open && (
                  <p className="text-[11px] font-semibold mt-1" style={{ color: currentScenario.character.color }}>
                    New discovery!
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#a16207] uppercase tracking-wider mb-3">
          Just Discovered
        </h3>
        <div className="space-y-2">
          {discoveries.slice(-3).reverse().map((discovery, index) => (
            <motion.div
              key={discovery}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm"
              style={{ border: `1px solid ${currentScenario.character.color}30` }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentScenario.character.color}20` }}
              >
                <span>{currentScenario.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#451a03] text-sm truncate">
                  {discovery}
                </p>
                <p className="text-[#a16207] text-xs">Just now</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#a16207] uppercase tracking-wider mb-3">
          Cool Facts From Today
        </h3>
        <div className="space-y-2">
          {scenarioFacts.map((fact, index) => (
            <motion.div
              key={fact.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: `${currentScenario.character.color}15`,
                border: `1px solid ${currentScenario.character.color}40`,
              }}
            >
              <p className="text-xs text-[#78350f]">
                {fact.emoji} {fact.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
