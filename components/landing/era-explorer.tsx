'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const eras = [
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    emoji: '🏛️',
    years: '3100 BC - 30 BC',
    color: '#fbbf24',
    adventures: [
      'Build a Pyramid with the Pharaoh',
      'Decode Hieroglyphics',
      'Meet Cleopatra',
    ],
  },
  {
    id: 'greece',
    name: 'Ancient Greece',
    emoji: '🏺',
    years: '800 BC - 31 BC',
    color: '#f97066',
    adventures: [
      'Train with Spartans',
      'Debate with Socrates',
      'Watch the First Olympics',
    ],
  },
  {
    id: 'renaissance',
    name: 'Renaissance',
    emoji: '🎨',
    years: '1400 - 1600',
    color: '#f472b6',
    adventures: [
      'Paint with Da Vinci',
      'Discover New Inventions',
      'Explore Florence',
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial Revolution',
    emoji: '⚙️',
    years: '1760 - 1840',
    color: '#fb923c',
    adventures: [
      'Ride the First Train',
      'Invent with Edison',
      'See the Steam Engine',
    ],
  },
  {
    id: 'space',
    name: 'Space Age',
    emoji: '🚀',
    years: '1957 - Now',
    color: '#f97066',
    adventures: [
      'Moon Landing 1969',
      'Float in the Space Station',
      'Launch a Rocket',
    ],
  },
]

export function EraExplorer() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null)
  const selectedEraData = eras.find(e => e.id === selectedEra)

  return (
    <section className="py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Pick Your Time in History! 🌍
          </h2>
          <p className="text-purple-200 text-lg">
            Click on an era to see available adventures
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative py-8">
          {/* Glowing timeline line */}
          <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#f97066] via-[#fbbf24] to-[#fb923c] opacity-50" />
          <motion.div 
            className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#f97066] via-[#fbbf24] to-[#fb923c]"
            style={{ filter: 'blur(8px)' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, type: "tween" }}
          />

          {/* Era nodes */}
          <div className="relative flex justify-between items-center px-4 md:px-8">
            {eras.map((era, index) => (
              <motion.button
                key={era.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedEra(selectedEra === era.id ? null : era.id)}
                className="relative flex flex-col items-center group"
              >
                {/* Node circle */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl border-4 transition-all duration-300"
                  style={{
                    background: selectedEra === era.id ? era.color : 'rgba(255, 255, 255, 0.9)',
                    borderColor: era.color,
                    boxShadow: selectedEra === era.id 
                      ? `0 0 30px ${era.color}80` 
                      : '0 4px 15px rgba(0,0,0,0.1)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  animate={selectedEra === era.id ? {
                    y: [0, -5, 0],
                  } : {}}
                  transition={{ duration: 0.5, repeat: selectedEra === era.id ? Infinity : 0, type: "tween" }}
                >
                  {era.emoji}
                </motion.div>

                {/* Era name */}
                <span className="mt-3 text-xs md:text-sm font-bold text-white text-center">
                  {era.name}
                </span>
                <span className="text-[10px] md:text-xs text-purple-300">
                  {era.years}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preview card */}
        <AnimatePresence mode="wait">
          {selectedEraData && (
            <motion.div
              key={selectedEraData.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div 
                className="p-6 rounded-[24px] border"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(16px)',
                  borderColor: `${selectedEraData.color}50`,
                  boxShadow: `0 8px 40px ${selectedEraData.color}20`,
                }}
              >
                <h3 
                  className="text-xl font-bold mb-4 text-white"
                >
                  {selectedEraData.emoji} Adventures in {selectedEraData.name}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedEraData.adventures.map((adventure, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group border border-white/10"
                    >
                      <span 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ 
                          background: selectedEraData.color,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-white/90 group-hover:text-white transition-colors text-sm">
                        {adventure}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
