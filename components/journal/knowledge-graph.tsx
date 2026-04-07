'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

interface KnowledgeGraphProps {
  selectedSubjects: string[]
  selectedEra: string
}

interface Node {
  id: string
  name: string
  subject: 'physics' | 'history' | 'science' | 'math' | 'geography'
  era: string
  description: string
  discovered: boolean
  x: number
  y: number
  connections: string[]
  isHub?: boolean
}

const subjectColors: Record<string, string> = {
  physics: '#f97066',
  history: '#fbbf24',
  science: '#10b981',
  math: '#f472b6',
  geography: '#fb923c',
}

const knowledgeNodes: Node[] = [
  // Physics hub and nodes
  { id: 'physics-hub', name: 'Physics', subject: 'physics', era: 'all', description: 'The study of matter, energy, and the universe', discovered: true, x: 50, y: 25, connections: ['relativity', 'light', 'gravity', 'quantum'], isHub: true },
  { id: 'relativity', name: 'Relativity', subject: 'physics', era: 'modern', description: 'Einstein\'s theory that space and time are connected', discovered: true, x: 35, y: 35, connections: ['physics-hub', 'spacetime', 'time-dilation'] },
  { id: 'light', name: 'Speed of Light', subject: 'physics', era: 'modern', description: 'Nothing can travel faster than 300,000 km/s!', discovered: true, x: 65, y: 35, connections: ['physics-hub', 'relativity'] },
  { id: 'gravity', name: 'Gravity', subject: 'physics', era: 'modern', description: 'The force that keeps us on Earth', discovered: true, x: 40, y: 15, connections: ['physics-hub', 'newton'] },
  { id: 'quantum', name: 'Quantum Physics', subject: 'physics', era: 'modern', description: 'Physics at the smallest scales', discovered: false, x: 60, y: 15, connections: ['physics-hub'] },
  { id: 'spacetime', name: 'Spacetime', subject: 'physics', era: 'modern', description: 'Space and time woven together as one', discovered: true, x: 25, y: 45, connections: ['relativity'] },
  { id: 'time-dilation', name: 'Time Dilation', subject: 'physics', era: 'modern', description: 'Time moves slower when you go faster!', discovered: true, x: 45, y: 45, connections: ['relativity', 'spacetime'] },
  
  // History hub and nodes
  { id: 'history-hub', name: 'History', subject: 'history', era: 'all', description: 'Learning from the past', discovered: true, x: 50, y: 75, connections: ['ancient', 'renaissance-era', 'space-age'], isHub: true },
  { id: 'ancient', name: 'Ancient World', subject: 'history', era: 'ancient', description: 'The earliest civilizations', discovered: true, x: 35, y: 85, connections: ['history-hub', 'egypt', 'greece'] },
  { id: 'renaissance-era', name: 'Renaissance', subject: 'history', era: 'renaissance', description: 'The rebirth of art and science', discovered: false, x: 50, y: 85, connections: ['history-hub', 'davinci'] },
  { id: 'space-age', name: 'Space Age', subject: 'history', era: 'space', description: 'Humanity reaches for the stars', discovered: true, x: 65, y: 85, connections: ['history-hub', 'moon-landing'] },
  { id: 'egypt', name: 'Ancient Egypt', subject: 'history', era: 'ancient', description: 'Pyramids, pharaohs, and hieroglyphics', discovered: false, x: 25, y: 95, connections: ['ancient'] },
  { id: 'greece', name: 'Ancient Greece', subject: 'history', era: 'ancient', description: 'Philosophy, democracy, and the Olympics', discovered: false, x: 45, y: 95, connections: ['ancient'] },
  { id: 'davinci', name: 'Da Vinci', subject: 'history', era: 'renaissance', description: 'Artist, inventor, and genius', discovered: false, x: 55, y: 95, connections: ['renaissance-era'] },
  { id: 'moon-landing', name: 'Moon Landing', subject: 'history', era: 'space', description: 'One small step for man...', discovered: false, x: 75, y: 95, connections: ['space-age'] },

  // Science hub and nodes
  { id: 'science-hub', name: 'Science', subject: 'science', era: 'all', description: 'Understanding how the world works', discovered: true, x: 15, y: 50, connections: ['chemistry', 'biology', 'electricity'], isHub: true },
  { id: 'chemistry', name: 'Chemistry', subject: 'science', era: 'modern', description: 'The science of atoms and molecules', discovered: false, x: 8, y: 40, connections: ['science-hub'] },
  { id: 'biology', name: 'Biology', subject: 'science', era: 'modern', description: 'The study of living things', discovered: false, x: 8, y: 60, connections: ['science-hub'] },
  { id: 'electricity', name: 'Electricity', subject: 'science', era: 'modern', description: 'The power that lights up our world', discovered: true, x: 20, y: 65, connections: ['science-hub', 'franklin'] },
  { id: 'franklin', name: 'Ben Franklin', subject: 'science', era: 'modern', description: 'Discovered electricity with a kite!', discovered: false, x: 15, y: 75, connections: ['electricity'] },

  // Math hub and nodes
  { id: 'math-hub', name: 'Math', subject: 'math', era: 'all', description: 'The language of the universe', discovered: true, x: 85, y: 50, connections: ['geometry', 'algebra', 'calculus'], isHub: true },
  { id: 'geometry', name: 'Geometry', subject: 'math', era: 'ancient', description: 'The math of shapes and space', discovered: true, x: 92, y: 40, connections: ['math-hub'] },
  { id: 'algebra', name: 'Algebra', subject: 'math', era: 'medieval', description: 'Solving for the unknown', discovered: false, x: 92, y: 60, connections: ['math-hub'] },
  { id: 'calculus', name: 'Calculus', subject: 'math', era: 'modern', description: 'The math of change', discovered: false, x: 78, y: 65, connections: ['math-hub', 'newton'] },
  { id: 'newton', name: 'Isaac Newton', subject: 'math', era: 'modern', description: 'Invented calculus and discovered gravity!', discovered: true, x: 70, y: 55, connections: ['calculus', 'gravity'] },
]

export function KnowledgeGraph({ selectedSubjects, selectedEra }: KnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Initialize positions with slight randomness
  useEffect(() => {
    const initialPositions: Record<string, { x: number; y: number }> = {}
    knowledgeNodes.forEach(node => {
      initialPositions[node.id] = {
        x: node.x + (Math.random() - 0.5) * 2,
        y: node.y + (Math.random() - 0.5) * 2,
      }
    })
    setPositions(initialPositions)
  }, [])

  // Filter nodes based on selection
  const filteredNodes = knowledgeNodes.filter(node => {
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(node.subject)) {
      return false
    }
    if (selectedEra !== 'all' && node.era !== 'all' && node.era !== selectedEra) {
      return false
    }
    return true
  })

  const getNodePosition = useCallback((nodeId: string) => {
    return positions[nodeId] || { x: 50, y: 50 }
  }, [positions])

  return (
    <div className="relative w-full h-full bg-[#fef3e2]">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {filteredNodes.map(node => 
          node.connections.map(connectedId => {
            const connectedNode = filteredNodes.find(n => n.id === connectedId)
            if (!connectedNode) return null
            
            const startPos = getNodePosition(node.id)
            const endPos = getNodePosition(connectedId)
            const isActive = node.discovered && connectedNode.discovered

            return (
              <motion.line
                key={`${node.id}-${connectedId}`}
                x1={`${startPos.x}%`}
                y1={`${startPos.y}%`}
                x2={`${endPos.x}%`}
                y2={`${endPos.y}%`}
                stroke={isActive ? subjectColors[node.subject] : '#e5e7eb'}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.6 : 0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", type: "tween" }}
              />
            )
          })
        )}
      </svg>

      {/* Nodes */}
      {filteredNodes.map((node) => {
        const pos = getNodePosition(node.id)
        const color = subjectColors[node.subject]
        const size = node.isHub ? 60 : 40

        return (
          <motion.button
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => node.discovered && setSelectedNode(node)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: node.discovered ? [0, -3, 0] : 0,
            }}
            transition={{ 
              duration: 0.5,
              delay: Math.random() * 0.5,
              y: { duration: 3, repeat: Infinity, repeatType: 'reverse', type: "tween" }
            }}
            whileHover={node.discovered ? { scale: 1.15 } : {}}
          >
            {/* Glow effect for discovered nodes */}
            {node.discovered && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: -size / 2 + 20,
                  top: -size / 2 + 20,
                  background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, type: "tween" }}
              />
            )}

            {/* Node circle */}
            <div
              className={`relative rounded-full flex items-center justify-center transition-all ${
                node.discovered ? '' : 'grayscale opacity-40'
              }`}
              style={{
                width: size,
                height: size,
                background: node.discovered ? `${color}30` : 'white',
                border: `3px solid ${node.discovered ? color : '#e5e7eb'}`,
                boxShadow: node.discovered 
                  ? `0 4px 15px ${color}50`
                  : 'none',
              }}
            >
              {node.discovered ? (
                <span className="text-base font-bold" style={{ color }}>
                  {node.isHub ? node.name.charAt(0) : '✓'}
                </span>
              ) : (
                <span className="text-[#d1d5db]">🔒</span>
              )}
            </div>

            {/* Node label */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap">
              <span className={`text-xs font-semibold ${
                node.discovered ? 'text-[#451a03]' : 'text-[#9ca3af]'
              }`}>
                {node.name}
              </span>
            </div>
          </motion.button>
        )
      })}

      {/* Selected node popup */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-6 rounded-2xl bg-white border-2 z-30 shadow-xl"
            style={{ borderColor: subjectColors[selectedNode.subject] }}
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#fef3e2]"
            >
              <X className="w-4 h-4 text-[#78350f]" />
            </button>

            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
              style={{ 
                background: `${subjectColors[selectedNode.subject]}30`,
                border: `3px solid ${subjectColors[selectedNode.subject]}`,
              }}
            >
              ✓
            </div>

            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: subjectColors[selectedNode.subject] }}
            >
              {selectedNode.name}
            </h3>

            <p className="text-[#78350f] text-sm mb-4 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  background: `${subjectColors[selectedNode.subject]}20`,
                  color: subjectColors[selectedNode.subject],
                }}
              >
                {selectedNode.subject.charAt(0).toUpperCase() + selectedNode.subject.slice(1)}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#fef3e2] text-[#78350f] text-xs">
                {selectedNode.era === 'all' ? 'All Eras' : selectedNode.era.charAt(0).toUpperCase() + selectedNode.era.slice(1)}
              </span>
            </div>

            {selectedNode.connections.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#fbbf24]/30">
                <p className="text-xs text-[#a16207] mb-2">Connected to:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.connections.map(connId => {
                    const connNode = knowledgeNodes.find(n => n.id === connId)
                    if (!connNode) return null
                    return (
                      <span 
                        key={connId}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          background: connNode.discovered ? `${subjectColors[connNode.subject]}20` : '#fef3e2',
                          color: connNode.discovered ? subjectColors[connNode.subject] : '#9ca3af',
                        }}
                      >
                        {connNode.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-3">
        {Object.entries(subjectColors).map(([subject, color]) => (
          <div key={subject} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: color }}
            />
            <span className="text-xs text-[#78350f] capitalize">{subject}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 text-right">
        <p className="text-xs text-[#a16207]">Discovered</p>
        <p className="text-lg font-bold text-[#451a03]">
          {knowledgeNodes.filter(n => n.discovered).length}/{knowledgeNodes.length}
        </p>
      </div>
    </div>
  )
}
