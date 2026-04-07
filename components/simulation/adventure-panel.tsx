'use client'

import { motion } from 'framer-motion'
import { Star, Check } from 'lucide-react'
import { useGame } from '@/lib/game-state'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'

export function AdventurePanel() {
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

  const missionObjectives = [
    { id: 1, text: `Meet ${currentScenario.character.name} in ${currentScenario.design.locationLabel}`, completed: true },
    { id: 2, text: `Ask about ${currentScenario.dialogue.discoveries[0]}`, completed: true },
    { id: 3, text: `Discover ${currentScenario.dialogue.discoveries[1]}`, completed: false, current: true },
    { id: 4, text: `Explore ${currentScenario.dialogue.discoveries[2]}`, completed: false },
    { id: 5, text: `Unlock ${currentScenario.dialogue.discoveries[3]}`, completed: false },
    { id: 6, text: `Study the setting: ${currentScenario.environment.setting.split('.')[0]}`, completed: false },
    { id: 7, text: `Learn how ${currentScenario.character.name} changed history`, completed: false },
    { id: 8, text: `Complete the ${currentScenario.title} mission`, completed: false },
  ]

  const infoTags = [
    { emoji: currentScenario.emoji, text: currentScenario.title },
    { emoji: '🌍', text: currentScenario.design.locationLabel },
    { emoji: '✨', text: currentScenario.environment.atmosphere },
  ]

  const rewardLabel = `${currentScenario.character.name} Explorer Badge`
  const completedCount = missionObjectives.filter((objective) => objective.completed).length
  const glowColor = currentScenario.design.gradient.glow

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#fffbf5]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white mb-4 shadow-sm"
        style={{ border: `1px solid ${currentScenario.character.color}40` }}
      >
        <span>{currentScenario.emoji}</span>
        <span className="text-sm text-[#451a03] font-medium">{currentScenario.design.locationLabel}</span>
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentScenario.character.color }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, type: 'tween' }}
        />
      </motion.div>

      <div className="relative rounded-2xl overflow-hidden mb-4 bg-white aspect-video shadow-md">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, ${currentScenario.design.gradient.from}, ${currentScenario.design.gradient.to})`,
          }}
        >
          <span className="text-6xl">{currentScenario.character.emoji}</span>
        </div>

        <div className="absolute inset-0">
          {currentScenario.design.sceneObjects.map((object) => (
            <div
              key={object.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full bg-white/90 text-[10px] text-[#451a03] shadow-sm flex items-center gap-1"
              style={{ left: `${object.x}%`, top: `${object.y}%` }}
            >
              <span>{object.emoji}</span>
              <span>{object.label}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
          {infoTags.map((tag) => (
            <span
              key={tag.text}
              className="px-2 py-1 rounded-full bg-white/90 text-[10px] text-[#451a03] shadow-sm"
            >
              {tag.emoji} {tag.text}
            </span>
          ))}
        </div>
      </div>

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

      <div
        className="rounded-2xl bg-white p-4 shadow-md"
        style={{ border: `2px solid ${currentScenario.character.color}40` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{currentScenario.emoji}</span>
          <h3 className="font-display font-bold" style={{ color: currentScenario.character.color }}>
            YOUR MISSION
          </h3>
        </div>

        <p className="font-bold text-[#451a03] text-sm mb-3">
          Discover {currentScenario.dialogue.discoveries[0]} and master the story of {currentScenario.character.name}.
        </p>

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={i < completedCount ? { scale: 0 } : {}}
              animate={i < completedCount ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Star
                className={`w-5 h-5 ${i < completedCount ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-[#e5e7eb]'}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {missionObjectives.map((objective) => (
            <motion.div
              key={objective.id}
              className="flex items-start gap-2 p-2 rounded-lg"
              style={
                objective.current
                  ? {
                      backgroundColor: `${currentScenario.character.color}10`,
                      border: `1px solid ${currentScenario.character.color}30`,
                    }
                  : undefined
              }
              animate={
                objective.current
                  ? {
                      boxShadow: [
                        `0 0 0 ${currentScenario.character.color}00`,
                        `0 0 10px ${currentScenario.character.color}35`,
                        `0 0 0 ${currentScenario.character.color}00`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, type: 'tween' }}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  objective.completed ? 'bg-[#10b981]' : 'border-2 border-[#e5e7eb]'
                }`}
              >
                {objective.completed && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-xs ${
                  objective.completed
                    ? 'text-[#a16207] line-through'
                    : objective.current
                    ? 'text-[#451a03] font-medium'
                    : 'text-[#78350f]'
                }`}
              >
                {objective.text}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#fbbf24]/30">
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: glowColor }}>{currentScenario.emoji}</span>
            <span className="text-[#78350f]">Earn:</span>
            <span className="font-bold text-[#fbbf24]">450 XP</span>
            <span className="text-[#78350f]">+</span>
            <span className="font-bold text-[#451a03]">{rewardLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
