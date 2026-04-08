'use client'

import { motion } from 'framer-motion'
import { useGame } from '@/lib/game-state'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'

type AdventurePanelProps = {
  discoveries: string[]
  lastUnlockedDiscovery?: string | null
}

export function AdventurePanel({ discoveries, lastUnlockedDiscovery }: AdventurePanelProps) {
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

  const rewardLabel = `${currentScenario.character.name} Explorer Badge`
  const glowColor = currentScenario.design.gradient.glow
  const flagItems = currentScenario.dialogue.discoveries
  const isDiscovered = (name: string) => discoveries.includes(name)
  const discoveredCount = flagItems.filter((f) => isDiscovered(f)).length

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#fffbf5]">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#a16207] uppercase tracking-wider mb-3">
          Historical Friend
        </h3>
        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, type: 'tween' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
              style={{
                backgroundColor: `${currentScenario.character.color}20`,
                borderColor: currentScenario.character.color,
                boxShadow: `0 0 20px ${currentScenario.character.color}66`,
              }}
            >
              {currentScenario.character.emoji}
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full"
                  style={{ backgroundColor: currentScenario.character.color }}
                  animate={{ height: [4, 8, 4] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1, type: 'tween' }}
                />
              ))}
            </div>
          </motion.div>
          <div>
            <p className="font-bold text-[#451a03] text-sm">{currentScenario.character.name}</p>
            <p className="font-display text-xs" style={{ color: currentScenario.character.color }}>
              {currentScenario.character.role}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#a16207] uppercase tracking-wider mb-3">
          Discovery Flags
        </h3>
        <p className="text-xs font-bold text-[#451a03] mb-3">
          Open the flags to learn new discoveries!
        </p>

        <div className="space-y-2 mb-4">
          {flagItems.map((flag) => {
            const open = isDiscovered(flag)
            const isNew = open && lastUnlockedDiscovery === flag

            return (
              <motion.div
                key={flag}
                className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border"
                style={{
                  borderColor: open ? `${currentScenario.character.color}35` : '#fbbf24/20',
                  backgroundColor: open ? `${currentScenario.character.color}08` : 'white',
                }}
                initial={false}
                animate={{
                  scale: isNew ? [1, 1.05, 1] : 1,
                  rotate: isNew ? [0, -3, 0] : 0,
                  boxShadow: isNew
                    ? [
                        `0 0 0 rgba(0,0,0,0)`,
                        `0 0 15px ${currentScenario.character.color}55`,
                        `0 0 0 rgba(0,0,0,0)`,
                      ]
                    : undefined,
                }}
                transition={{ duration: isNew ? 0.6 : 0.2 }}
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Pole */}
                  <div
                    className="absolute left-4 top-1 w-0.5 h-8 rounded-full"
                    style={{ backgroundColor: open ? `${currentScenario.character.color}` : '#e5e7eb' }}
                  />
                  {/* Flag cloth */}
                  <div
                    className="absolute left-2 top-2 w-8 h-5 rounded-sm rotate-[-8deg] border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: open ? `${currentScenario.character.color}22` : '#f3f4f6',
                      borderColor: open ? `${currentScenario.character.color}55` : '#e5e7eb',
                    }}
                  >
                    <span className="text-xs font-bold">
                      {open ? '✓' : '🔒'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-bold leading-snug ${
                      open ? 'text-[#451a03]' : 'text-[#78350f] opacity-70 blur-[1.2px]'
                    }`}
                    style={{ filter: !open ? 'saturate(0.8)' : undefined }}
                  >
                    {flag}
                  </p>
                  {open && isNew && (
                    <p className="text-[11px] font-semibold mt-1" style={{ color: currentScenario.character.color }}>
                      New discovery!
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="pt-4 border-t border-[#fbbf24]/30">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: glowColor }}>{currentScenario.emoji}</span>
              <span className="text-[#78350f]">Discoveries:</span>
              <span className="font-bold text-[#451a03]">
                {discoveredCount}/{flagItems.length}
              </span>
            </div>
            <div className="text-xs font-bold text-[#78350f] whitespace-nowrap">
              +450 XP
            </div>
          </div>
          <div className="mt-2 text-[11px] font-semibold text-[#78350f]">
            Reward: {rewardLabel}
          </div>
        </div>
      </div>
    </div>
  )
}
