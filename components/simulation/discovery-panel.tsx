'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGame } from '@/lib/game-state'
import { getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'

interface DiscoveryPanelProps {
  discoveries: string[]
}

interface Node {
  id: string
  name: string
  x: number
  y: number
  color: string
  connected: string[]
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

  const scenarioNodes: Node[] = currentScenario.dialogue.discoveries.map((discovery, index, source) => {
    const palette = [
      currentScenario.character.color,
      currentScenario.design.gradient.glow,
      '#fbbf24',
      '#10b981'
    ]

    const nodeId = discovery.toLowerCase().replace(/\s+/g, '_')
    const connected = source
      .map((item) => item.toLowerCase().replace(/\s+/g, '_'))
      .filter((itemId) => itemId !== nodeId)
      .slice(index === 0 ? 1 : 0, index === 0 ? 3 : 1)

    return {
      id: nodeId,
      name: discovery,
      x: index === 0 ? 50 : 18 + ((index - 1) % 3) * 32,
      y: index === 0 ? 26 : 62 + Math.floor((index - 1) / 3) * 18,
      color: palette[index % palette.length],
      connected,
    }
  })

  const scenarioFacts = currentScenario.facts

  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [newlyDiscovered, setNewlyDiscovered] = useState<string | null>(null)

  useEffect(() => {
    if (discoveries.length > 0) {
      const latest = discoveries[discoveries.length - 1]
      setNewlyDiscovered(latest)
      setTimeout(() => setNewlyDiscovered(null), 2000)
    }
  }, [discoveries])

  const isDiscovered = (nodeName: string) => {
    return discoveries.some(d => 
      d.toLowerCase().includes(nodeName.toLowerCase().split(' ')[0])
    )
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

      <div
        className="relative h-48 mb-6 rounded-2xl bg-white border-2 overflow-hidden shadow-md"
        style={{ borderColor: `${currentScenario.character.color}30` }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {scenarioNodes.map((node) => 
            node.connected.map((connectedId) => {
              const connectedNode = scenarioNodes.find(n => n.id === connectedId)
              if (!connectedNode) return null
              const isActive = isDiscovered(node.name) && isDiscovered(connectedNode.name)
              
              return (
                <motion.line
                  key={`${node.id}-${connectedId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${connectedNode.x}%`}
                  y2={`${connectedNode.y}%`}
                  stroke={isActive ? currentScenario.character.color : '#e5e7eb'}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, type: "tween" }}
                />
              )
            })
          )}
        </svg>

        {scenarioNodes.map((node) => {
          const discovered = isDiscovered(node.name)
          const isNew = newlyDiscovered?.toLowerCase().includes(node.name.toLowerCase().split(' ')[0])
          
          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              initial={isNew ? { scale: 0 } : {}}
              animate={isNew ? { 
                scale: [0, 1.5, 1],
              } : discovered ? { 
                y: [0, -2, 0],
              } : {}}
              transition={isNew ? {
                duration: 0.5,
                type: 'tween',
                ease: 'easeOut',
              } : {
                duration: 2,
                repeat: Infinity,
                type: 'tween',
              }}
            >
              {isNew && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: node.color,
                    filter: 'blur(8px)',
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1, type: "tween" }}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  discovered
                    ? ''
                    : 'grayscale opacity-40'
                }`}
                style={{
                  background: discovered ? `${node.color}30` : 'white',
                  border: `2px solid ${discovered ? node.color : '#e5e7eb'}`,
                  boxShadow: discovered && activeNode === node.id
                    ? `0 0 15px ${node.color}80`
                    : 'none',
                }}
              >
                {discovered ? (
                  <span style={{ color: node.color }}>✓</span>
                ) : (
                  <span className="text-[#d1d5db]">🔒</span>
                )}
              </div>

              <AnimatePresence>
                {activeNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-white border border-[#fbbf24]/30 whitespace-nowrap z-10 shadow-sm"
                  >
                    <p className="text-[10px] font-bold" style={{ color: discovered ? node.color : '#9ca3af' }}>
                      {node.name}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
