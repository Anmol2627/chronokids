'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface PortalProps {
  size?: number
  isGenerating?: boolean
  showScene?: boolean
}

export function Portal({ size = 380, isGenerating = false, showScene = true }: PortalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number; size: number; color: string }>>([])

  const warmColors = ['#fbbf24', '#f97066', '#fb923c', '#f472b6', '#fda4af']

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * 360,
      distance: 100 + Math.random() * 60,
      size: 4 + Math.random() * 6,
      color: warmColors[i % warmColors.length],
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outermost dashed ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-[#f97066]/60"
        animate={{ rotate: 360 }}
        transition={{ duration: isGenerating ? 3 : 20, ease: "linear", repeat: Infinity }}
      />

      {/* Second gradient ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: size * 0.05,
          background: 'conic-gradient(from 0deg, #f97066, #fbbf24, #fb923c, #f472b6, #f97066)',
          padding: 3,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: isGenerating ? 2 : 15, ease: "linear", repeat: Infinity }}
      >
        <div className="w-full h-full rounded-full bg-[#1e1b4b]" />
      </motion.div>

      {/* Third warm ring with pulse */}
      <motion.div
        className="absolute rounded-full border-4 border-[#fbbf24]"
        style={{ inset: size * 0.12 }}
        animate={{
          boxShadow: [
            '0 0 20px #fbbf24, inset 0 0 20px rgba(251, 191, 36, 0.3)',
            '0 0 40px #fbbf24, inset 0 0 40px rgba(251, 191, 36, 0.5)',
            '0 0 20px #fbbf24, inset 0 0 20px rgba(251, 191, 36, 0.3)',
          ],
        }}
        transition={{ duration: isGenerating ? 0.5 : 2, repeat: Infinity, type: "tween" }}
      />

      {/* Inner glow core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: size * 0.2,
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,224,71,0.4) 40%, transparent 70%)',
        }}
        animate={{
          scale: isGenerating ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: isGenerating ? 0.3 : 2, repeat: Infinity, type: "tween" }}
      />

      {/* Portal scene with home1 image */}
      {showScene && (
        <div 
          className="absolute rounded-full overflow-hidden flex items-center justify-center z-10"
          style={{ inset: size * 0.05 }}
        >
          <motion.div
            className="w-full h-full rounded-full overflow-hidden"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, type: "tween" }}
          >
            <Image 
              src="/home1.webp" 
              alt="Portal Scene" 
              fill
              className="object-cover rounded-full"
              sizes="380px"
            />
          </motion.div>
        </div>
      )}

      {/* Orbiting sparkle particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: '50%',
            top: '50%',
            marginLeft: -particle.size / 2,
            marginTop: -particle.size / 2,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
          }}
          animate={{
            x: [
              Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
              Math.cos(((particle.angle + 360) * Math.PI) / 180) * particle.distance,
            ],
            y: [
              Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
              Math.sin(((particle.angle + 360) * Math.PI) / 180) * particle.distance,
            ],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: isGenerating ? 3 : 10,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        />
      ))}

      {/* Warp speed effect when generating */}
      {isGenerating && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`warp-${i}`}
              className="absolute w-2 h-2 rounded-full z-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: warmColors[i % warmColors.length],
              }}
              animate={{
                x: [0, (0.5 - Math.random()) * -200],
                y: [0, (0.5 - Math.random()) * -200],
                scale: [1, 0],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
                type: "tween",
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
