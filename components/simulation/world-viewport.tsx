'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'
import { useGame } from '@/lib/game-state'

type WorldViewportReaction = 'idle' | 'thinking' | 'lightbulb' | 'happy'

interface WorldViewportProps {
  speechBubbleText?: string
  reaction?: WorldViewportReaction
}

export function WorldViewport({
  speechBubbleText = 'Hi explorer!',
  reaction = 'idle',
}: WorldViewportProps) {
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

      <div className="absolute inset-0 flex items-center justify-center">
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
                type: 'tween',
              }}
            />
          ))}
        </div>

        <div className="relative w-full h-full z-20">
          {/* Ground strip (keeps the scene feeling like a “stage”) */}
          <div
            className="absolute bottom-0 left-[18%] right-[18%] h-20 rounded-t-[28px] shadow-lg"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, ${currentScenario.character.color}18 100%)`,
              borderTop: `3px solid ${currentScenario.character.color}40`,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-2 rounded-t-[28px]"
              style={{ backgroundColor: `${currentScenario.character.color}35` }}
            />
          </div>

          {/* Center character stage */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex flex-col items-center justify-center">
              {/* Speech bubble */}
              <motion.div
                className="relative mb-5 w-[min(78vw,380px)] px-4 py-3 rounded-[20px] bg-white/90 backdrop-blur shadow-lg border-2"
                style={{ borderColor: `${currentScenario.character.color}50` }}
                animate={{
                  scale: reaction === 'happy' ? [1, 1.05, 1] : 1,
                  y: reaction === 'thinking' ? [0, -2, 0] : 0,
                }}
                transition={{ duration: 0.35 }}
              >
                {/* Bubble tail */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px]"
                  style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'rgba(255,255,255,0.92)' }}
                />
                <p className="text-[#451a03] text-sm leading-snug font-medium">
                  {reaction === 'thinking' ? (
                    <span className="inline-flex items-center gap-1">
                      Thinking
                      <motion.span
                        className="inline-block"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.9, repeat: Infinity, type: 'tween' }}
                      >
                        ...
                      </motion.span>
                    </span>
                  ) : (
                    speechBubbleText
                  )}
                </p>
              </motion.div>

              {/* Character blob */}
              <motion.div
                className="relative flex items-center justify-center rounded-[60px] w-64 h-64 sm:w-72 sm:h-72 shadow-lg border-4"
                style={{
                  borderColor: `${currentScenario.character.color}55`,
                  background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.2) 60%), linear-gradient(180deg, rgba(255,255,255,0.75) 0%, ${currentScenario.character.color}14 100%)`,
                }}
                animate={{
                  y:
                    reaction === 'happy'
                      ? [0, -10, 0]
                      : reaction === 'thinking'
                        ? [0, -6, 0]
                        : [0, -4, 0],
                  scale:
                    reaction === 'happy'
                      ? [1, 1.06, 1]
                      : reaction === 'lightbulb'
                        ? [1, 1.03, 1]
                        : [1, 1.02, 1],
                }}
                transition={{ duration: 2.6, repeat: Infinity, type: 'tween' }}
              >
                <div className="absolute inset-0 rounded-[60px] opacity-90" style={{ boxShadow: `inset 0 0 60px ${currentScenario.character.color}20` }} />

                <div className="relative z-10 text-[72px] sm:text-[84px] leading-none">
                  {currentScenario.character.emoji}
                </div>

                {/* Simple face overlay (makes the character feel expressive) */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 flex gap-6">
                  <motion.div
                    className="w-7 h-7 rounded-full bg-[#1e1b4b] flex items-center justify-center"
                    style={{ boxShadow: `0 0 0 6px rgba(255,255,255,0.7) inset` }}
                    animate={{
                      scale: reaction === 'thinking' ? 0.9 : reaction === 'happy' ? 1.05 : 1,
                      y: reaction === 'happy' ? -1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </motion.div>
                  <motion.div
                    className="w-7 h-7 rounded-full bg-[#1e1b4b] flex items-center justify-center"
                    style={{ boxShadow: `0 0 0 6px rgba(255,255,255,0.7) inset` }}
                    animate={{
                      scale: reaction === 'thinking' ? 0.9 : reaction === 'happy' ? 1.05 : 1,
                      y: reaction === 'happy' ? -1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute left-1/2 top-[60%] -translate-x-1/2 w-14 h-7"
                  initial={false}
                  animate={{
                    scaleY: reaction === 'thinking' ? 0.35 : reaction === 'happy' ? 1.05 : 0.85,
                    rotate: reaction === 'thinking' ? -2 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-full h-full border-b-4 border-[#451a03] rounded-full" />
                </motion.div>

                {reaction === 'lightbulb' && (
                  <motion.div
                    className="absolute -top-3 right-8 w-14 h-14 rounded-full bg-white/90 border-2 flex items-center justify-center"
                    style={{ borderColor: `${currentScenario.character.color}55` }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-3xl">💡</span>
                  </motion.div>
                )}

                {reaction === 'happy' && (
                  <>
                    <motion.div
                      className="absolute -top-2 left-10 w-8 h-8 rounded-full bg-white/95 border-2 flex items-center justify-center"
                      style={{ borderColor: `${currentScenario.character.color}55` }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="text-xl">✨</span>
                    </motion.div>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2.5 h-2.5 rounded-full bg-yellow-200"
                        style={{ left: `calc(50% + ${i * 10 - 30}px)` }}
                        initial={{ top: '18px', opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [0, -18, -36],
                          scale: [0.8, 1.1, 0.9],
                        }}
                        transition={{ duration: 1.1, repeat: 0, delay: i * 0.05 }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* Atmosphere chip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-lg">
            <span>{currentScenario.emoji}</span>
            <span className="text-xs font-semibold text-[#451a03]">
              {currentScenario.environment.atmosphere}
            </span>
          </div>
        </div>
      </div>

      {currentScenario.design.interactiveElements.map((element) => (
        <motion.button
          key={element.id}
          className="absolute z-30 group"
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
