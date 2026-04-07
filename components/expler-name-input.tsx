'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, User } from 'lucide-react'
import ScoringSystem from '@/lib/scoring-system'

interface ExplorerNameInputProps {
  onComplete: (name: string) => void
}

export function ExplorerNameInput({ onComplete }: ExplorerNameInputProps) {
  const [explorerName, setExplorerName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Check if player already has a name
  useEffect(() => {
    const storedName = localStorage.getItem('playerName')
    if (storedName) {
      setExplorerName(storedName)
      setIsSubmitted(true)
      onComplete(storedName)
    }
  }, [onComplete])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (explorerName.trim().length < 2) {
      return
    }

    // Save to localStorage
    localStorage.setItem('playerName', explorerName.trim())
    
    // Initialize scoring system
    ScoringSystem.getPlayerProgress(explorerName.trim())
    
    setIsSubmitted(true)
    onComplete(explorerName.trim())
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-300/50">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 font-bold">
            Welcome, {explorerName}! 🚀
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <User className="w-16 h-16 text-purple-500 mx-auto" />
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome to ChronoKids!
            </h1>
            <p className="text-gray-600 text-lg">
              What should we call you?
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={explorerName}
                onChange={(e) => setExplorerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your Explorer Name..."
                className="w-full px-4 py-4 text-lg border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                maxLength={20}
                autoFocus
              />
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: explorerName.length > 0 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={explorerName.trim().length < 2}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Exploring!
              </span>
            </motion.button>
          </form>

          {/* Fun tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            <p>💡 Tip: Choose a fun name that represents your explorer spirit!</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
