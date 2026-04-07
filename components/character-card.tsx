'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Character {
  id: string
  name: string
  role: string
  era: string
  color: string
  image: string
  adventure: string
}

const characters: Character[] = [
  { 
    id: 'einstein', 
    name: 'Albert Einstein', 
    role: 'Theoretical Physicist', 
    era: '1879-1955', 
    color: '#f97066', 
    image: '/einstien.png',
    adventure: "Einstein's Lab"
  },
  { 
    id: 'neil', 
    name: 'Neil Armstrong', 
    role: 'Astronaut', 
    era: '1930-2012', 
    color: '#fb923c', 
    image: '/neil.png',
    adventure: 'Moon Landing 1969!'
  },
  { 
    id: 'marie', 
    name: 'Marie Curie', 
    role: 'Physicist & Chemist', 
    era: '1867-1934', 
    color: '#f472b6', 
    image: '/mary.png',
    adventure: "Marie Curie's Lab"
  },
  { 
    id: 'ben', 
    name: 'Benjamin Franklin', 
    role: 'Inventor & Statesman', 
    era: '1706-1790', 
    color: '#fbbf24', 
    image: '/ben.png',
    adventure: 'When electricity was discovered!'
  },
]

interface CharacterCardProps {
  character?: Character
  index?: number
  onClick?: () => void
}

export function CharacterCard({ character, index = 0, onClick }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const char = character || characters[index % characters.length]

  const handleClick = () => {
    // Store the adventure and navigate to portal
    localStorage.setItem('selectedAdventure', char.adventure)
    router.push('/portal')
  }

  return (
    <motion.div
      className="relative w-64 h-80 flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ 
        y: -8,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div 
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: isHovered 
            ? `0 12px 40px ${char.color}40, 0 8px 30px rgba(0,0,0,0.15)`
            : `0 8px 30px rgba(0,0,0,0.12)`,
          border: `2px solid ${isHovered ? char.color : 'transparent'}`,
        }}
      >
        {/* Character Image - Full Background */}
        <div className="w-full h-full relative">
          <Image
            src={char.image}
            alt={char.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          
          {/* Gradient overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Sparkle particles */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  left: `${15 + i * 12}%`, 
                  top: `${15 + (i % 3) * 25}%`,
                  backgroundColor: char.color,
                }}
                animate={{
                  y: [-8, 8, -8],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.6, 1.4, 0.6],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  type: "tween",
                }}
              />
            ))}
          </>
        )}

        {/* Character info + Start Adventure Button */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
              {char.name}
            </h3>
            <p className="text-white/80 text-xs">
              {char.role} · {char.era}
            </p>
          </div>
          <motion.button
            className="w-full py-2.5 rounded-full text-sm font-bold transition-all"
            style={{
              background: isHovered ? char.color : 'rgba(255, 255, 255, 0.9)',
              color: isHovered ? '#fff' : char.color,
              border: `2px solid ${char.color}`,
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Adventure 🚀
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function CharacterShowcase() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {characters.map((character, index) => (
        <CharacterCard key={character.id} character={character} index={index} />
      ))}
    </div>
  )
}

export { characters }
