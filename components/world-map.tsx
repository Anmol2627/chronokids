'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { scenarioList } from '@/lib/custom-scenarios'

interface Location {
  id: string
  name: string
  character: string
  adventure: string
  x: number
  y: number
  emoji: string
  color: string
  description: string
}

const locations: Location[] = scenarioList.map((scenario) => ({
  id: scenario.id,
  name: scenario.title,
  character: scenario.character.name,
  adventure: scenario.design.map.adventure,
  x: scenario.design.map.x,
  y: scenario.design.map.y,
  emoji: scenario.emoji,
  color: scenario.character.color,
  description: scenario.design.map.description
}))

interface WorldMapProps {
  onLocationClick: (location: Location) => void
}

export function WorldMap({ onLocationClick }: WorldMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
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

      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d="M 50 30 Q 55 25, 60 30 T 65 35 Q 60 40, 55 38 T 50 35 Z"
            fill="#4c1d95"
            fillOpacity={0.6}
            stroke="#8b5cf6"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ fill: '#6d28d9', fillOpacity: 0.8 }}
          />
          <motion.path
            d="M 20 35 Q 25 30, 30 35 T 35 40 Q 30 45, 25 43 T 20 40 Z"
            fill="#4c1d95"
            fillOpacity={0.6}
            stroke="#8b5cf6"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ fill: '#6d28d9', fillOpacity: 0.8 }}
          />
          <motion.path
            d="M 70 35 Q 80 30, 85 35 T 90 45 Q 85 50, 80 48 T 75 40 Z"
            fill="#4c1d95"
            fillOpacity={0.6}
            stroke="#8b5cf6"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ fill: '#6d28d9', fillOpacity: 0.8 }}
          />
          <motion.path
            d="M 50 50 Q 55 45, 60 50 T 65 60 Q 60 65, 55 63 T 50 55 Z"
            fill="#4c1d95"
            fillOpacity={0.6}
            stroke="#8b5cf6"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{ fill: '#6d28d9', fillOpacity: 0.8 }}
          />
          <motion.path
            d="M 25 55 Q 30 50, 35 55 T 40 70 Q 35 75, 30 73 T 25 65 Z"
            fill="#4c1d95"
            fillOpacity={0.6}
            stroke="#8b5cf6"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ fill: '#6d28d9', fillOpacity: 0.8 }}
          />
        </svg>

        {locations.map((location) => (
          <div
            key={location.id}
            className="absolute cursor-pointer"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHoveredLocation(location.id)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => onLocationClick(location)}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: location.color,
                  filter: 'blur(8px)',
                  width: '40px',
                  height: '40px',
                  left: '-10px',
                  top: '-10px',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  type: "tween",
                }}
              />
              <div className="relative w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white flex items-center justify-center shadow-lg">
                <span className="text-xl">{location.emoji}</span>
              </div>

              <AnimatePresence>
                {hoveredLocation === location.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 min-w-[200px] z-50"
                  >
                    <div className="text-white">
                      <div className="font-bold text-sm mb-1">{location.name}</div>
                      <div className="text-xs text-white/90 mb-1">{location.character}</div>
                      <div className="text-xs text-white/80 mb-1">{location.description}</div>
                      <div className="text-xs text-white/60">{location.adventure}</div>
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                          <Sparkles className="w-3 h-3" />
                          <span>Start Adventure</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute top-4 left-4 text-white/60 text-xs">
        Interactive World Map
      </div>

      <div className="absolute bottom-4 left-4 text-white/60 text-xs md:hidden">
        Tap locations to explore
      </div>
    </div>
  )
}
