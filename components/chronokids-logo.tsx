'use client'

import { motion } from 'framer-motion'

interface ChronoKidsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

const letters = [
  { char: 'C', color: '#f97316', rotate: 0, y: 0 },
  { char: 'h', color: '#a855f7', rotate: 3, y: 0 },
  { char: 'r', color: '#0ea5e9', rotate: -3, y: 0 },
  { char: 'o', color: '#14b8a6', rotate: 0, y: -3 },
  { char: 'n', color: '#eab308', rotate: 0, y: 3 },
  { char: 'o', color: '#ec4899', rotate: 5, y: 0 },
  { char: 'K', color: '#f97316', rotate: -2, y: 0, scale: 1.1 },
  { char: 'i', color: '#a855f7', rotate: 0, y: 4 },
  { char: 'd', color: '#0ea5e9', rotate: 4, y: 0 },
  { char: 's', color: '#14b8a6', rotate: 0, y: -4 },
]

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl md:text-6xl',
}

export function ChronoKidsLogo({ size = 'lg', animated = true }: ChronoKidsLogoProps) {
  return (
    <motion.div 
      className="relative inline-flex items-baseline cursor-pointer select-none"
      whileHover={animated ? "hover" : undefined}
    >
      {/* Sparkles around the logo */}
      {animated && (
        <>
          <motion.span
            className="absolute -top-2 -left-1 text-yellow-300"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 2, repeat: Infinity, type: "tween" }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute -top-3 right-1/4 text-pink-300 text-sm"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, type: "tween" }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -top-1 -right-2 text-cyan-300"
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.7, 1.1, 0.7],
              rotate: [0, -180, -360],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3, type: "tween" }}
          >
            ✦
          </motion.span>
        </>
      )}

      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`font-display font-bold ${sizeClasses[size]} inline-block`}
          style={{
            color: letter.color,
            textShadow: `0 0 20px ${letter.color}60, 0 0 40px ${letter.color}30`,
            transform: `rotate(${letter.rotate}deg) translateY(${letter.y}px) scale(${letter.scale || 1})`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: letter.y }}
          transition={{ delay: index * 0.05, duration: 0.3, type: "tween" }}
          variants={{
            hover: {
              y: [letter.y, letter.y - 8, letter.y],
              transition: { 
                duration: 0.4, 
                delay: index * 0.03,
                type: "tween",
              }
            }
          }}
        >
          {letter.char}
        </motion.span>
      ))}
    </motion.div>
  )
}
