'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'
import { useGame } from '@/lib/game-state'

export function WorldViewport() {
  const { state } = useGame()
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const currentScenario = (() => {
    if (typeof window !== 'undefined') {
      const storedScenarioId = localStorage.getItem('currentScenarioId')
      if (storedScenarioId) {
        return getScenarioById(storedScenarioId)
      }
    }

    return resolveScenarioFromText(state.currentAdventure)
  })()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${currentScenario.design.gradient.from}, ${currentScenario.design.gradient.to})`,
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/90 backdrop-blur shadow-md"
        style={{ border: `1px solid ${currentScenario.character.color}40` }}
      >
        <span className="text-sm text-[#451a03]">
          📍 {currentScenario.design.locationLabel}
        </span>
      </motion.div>

      <div className="absolute inset-0 flex items-end justify-center">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-8 w-44 h-44 rounded-full blur-3xl"
            style={{
              backgroundColor: `${currentScenario.design.gradient.glow}50`,
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, type: 'tween' }}
          />

          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: `${currentScenario.character.color}90`,
                left: `${10 + Math.random() * 80}%`,
                top: `${15 + Math.random() * 55}%`,
              }}
              animate={{
                y: [0, 12, 0],
                x: [0, 6, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                type: "tween",
              }}
            />
          ))}
        </div>

        <div className="relative w-full h-full">
          <div
            className="absolute bottom-0 left-[18%] right-[18%] h-20 rounded-t-[28px] shadow-lg"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, ${currentScenario.character.color}18 100%)`,
              borderTop: `3px solid ${currentScenario.character.color}40`,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-2 rounded-t-[28px]" style={{ backgroundColor: `${currentScenario.character.color}35` }} />
          </div>

          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-1/2 -translate-x-1/2 w-44 rounded-2xl p-4 text-center bg-white/85 shadow-lg"
              style={{ border: `2px solid ${currentScenario.character.color}35` }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, type: 'tween' }}
            >
              <div className="text-4xl mb-2">{currentScenario.character.emoji}</div>
              <div className="text-xs font-bold text-[#451a03]">{currentScenario.character.name}</div>
              <div className="text-[11px]" style={{ color: currentScenario.character.color }}>
                {currentScenario.character.role}
              </div>
            </motion.div>

            {currentScenario.design.sceneObjects.map((object, index) => (
              <motion.div
                key={object.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-2xl bg-white/90 shadow-md"
                style={{
                  left: `${object.x}%`,
                  top: `${object.y}%`,
                  border: `1px solid ${currentScenario.character.color}35`,
                }}
                animate={{ y: [0, index % 2 === 0 ? -6 : -3, 0] }}
                transition={{ duration: 3 + index * 0.4, repeat: Infinity, type: 'tween' }}
              >
                <div className="text-2xl text-center">{object.emoji}</div>
                <div className="text-[10px] text-[#451a03] whitespace-nowrap">{object.label}</div>
              </motion.div>
            ))}

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-lg">
              <span>{currentScenario.emoji}</span>
              <span className="text-xs font-semibold text-[#451a03]">{currentScenario.environment.atmosphere}</span>
            </div>
          </div>
        </div>
      </div>

      {currentScenario.design.interactiveElements.map((element) => (
        <motion.button
          key={element.id}
          className="absolute z-10 group"
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          onMouseEnter={() => setHoveredElement(element.id)}
          onMouseLeave={() => setHoveredElement(null)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[10px]"
            style={{ backgroundColor: currentScenario.character.color }}
            animate={{
              boxShadow: [
                `0 0 0 0 ${currentScenario.character.color}66`,
                `0 0 0 8px ${currentScenario.character.color}00`,
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, type: "tween" }}
          >
            <span>{element.emoji}</span>
          </motion.div>

          {hoveredElement === element.id && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg bg-white whitespace-nowrap shadow-lg"
              style={{ border: `1px solid ${currentScenario.character.color}40` }}
            >
              <p className="text-xs text-[#78350f]">{element.label}</p>
            </motion.div>
          )}
        </motion.button>
      ))}

      <motion.div
        className="absolute top-0 right-4 w-8 h-32"
        style={{
          background: `linear-gradient(180deg, ${currentScenario.character.color}30 0%, transparent 100%)`,
        }}
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, type: "tween" }}
      />
    </div>
  )
}
