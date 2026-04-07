'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Shape {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  color: string
  type: 'circle' | 'star' | 'heart' | 'diamond'
}

interface FloatingBubble {
  id: number
  startX: number
  startY: number
  color: string
}

const warmColors = ['#fbbf24', '#f97066', '#fb923c', '#f472b6', '#fda4af', '#fde68a']

export function Starfield({ starCount = 100 }: { starCount?: number }) {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([])

  useEffect(() => {
    const types: Shape['type'][] = ['circle', 'star', 'heart', 'diamond']
    const generatedShapes: Shape[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 6,
      opacity: Math.random() * 0.3 + 0.15,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      color: warmColors[Math.floor(Math.random() * warmColors.length)],
      type: types[Math.floor(Math.random() * types.length)],
    }))
    setShapes(generatedShapes)

    // Floating bubble interval
    const bubbleInterval = setInterval(() => {
      const newBubble: FloatingBubble = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: 100 + Math.random() * 10,
        color: warmColors[Math.floor(Math.random() * warmColors.length)],
      }
      setBubbles(prev => [...prev, newBubble])
      
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
      }, 6000)
    }, 3000)

    return () => clearInterval(bubbleInterval)
  }, [starCount])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'star':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill={shape.color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      case 'heart':
        return (
          <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" fill={shape.color}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )
      case 'diamond':
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              transform: 'rotate(45deg)',
              borderRadius: '3px',
            }}
          />
        )
      default:
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              borderRadius: '50%',
            }}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            y: [-5, 5, -5],
            rotate: [0, shape.type === 'diamond' ? 90 : 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}

      {/* Rising bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: `${bubble.startX}%`,
              bottom: '0%',
              width: 20 + Math.random() * 20,
              height: 20 + Math.random() * 20,
              background: `radial-gradient(circle at 30% 30%, ${bubble.color}40, ${bubble.color}20)`,
              border: `2px solid ${bubble.color}30`,
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              y: -800,
              scale: [0.5, 1, 1.2, 0.8],
              x: [0, 30, -20, 40],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 6,
              ease: "easeOut",
              type: "tween",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
