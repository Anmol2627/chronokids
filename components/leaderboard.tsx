'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Crown, Medal, Award } from 'lucide-react'
import LeaderboardService, { LeaderboardEntry } from '@/lib/supabase-service'

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  rank: number
  isCurrentPlayer?: boolean
}

function LeaderboardCard({ entry, rank, isCurrentPlayer = false }: LeaderboardCardProps) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-100' }
      case 2:
        return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-100' }
      case 3:
        return { icon: Medal, color: 'text-orange-600', bg: 'bg-orange-100' }
      default:
        return { icon: Award, color: 'text-purple-500', bg: 'bg-purple-100' }
    }
  }

  const rankBadge = getRankBadge(rank)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(147, 51, 234, 0.15)'
      }}
      className={`
        relative bg-white rounded-2xl p-6 border-2 transition-all
        ${isCurrentPlayer 
          ? 'border-purple-400 shadow-purple-200 shadow-lg' 
          : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
        }
      `}
    >
      {/* Rank Badge */}
      <div className="absolute -top-3 -right-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: rank * 0.1 + 0.3 }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${rankBadge.bg} border-2 border-white shadow-md
          `}
        >
          <rankBadge.icon className={`w-6 h-6 ${rankBadge.color}`} />
        </motion.div>
      </div>

      {/* Player Info */}
      <div className="text-center">
        <h3 className="font-bold text-xl text-gray-800 mb-2">
          {entry.name}
        </h3>
        
        <div className="flex items-center justify-center gap-1 mb-3">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-2xl font-bold text-gray-700">
            {entry.points}
          </span>
          <span className="text-sm text-gray-500 ml-1">points</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-blue-400" />
            {entry.chapters_completed} chapters
          </span>
        </div>

        {/* Animated sparkles for top 3 */}
        {rank <= 3 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + (i % 2) * 60}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  type: "tween",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPlayerName, setCurrentPlayerName] = useState<string | null>(null)

  useEffect(() => {
    const playerName = localStorage.getItem('playerName')
    if (playerName) {
      setCurrentPlayerName(playerName)
    }

    async function fetchLeaderboard() {
      try {
        const players = await LeaderboardService.getTopPlayers(10)
        setTopPlayers(players)
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()

    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 text-purple-500"
        >
          <Trophy />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-300/50">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-purple-300">
            Top Time Explorers
          </h2>
        </div>
      </motion.div>

      {/* Leaderboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {topPlayers.map((entry, index) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <LeaderboardCard
                entry={entry}
                rank={index + 1}
                isCurrentPlayer={entry.name === currentPlayerName}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {topPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
            <Trophy className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 font-semibold">
              No explorers yet. Be the first!
            </span>
          </div>
        </motion.div>
      )}

      {/* Fun Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 text-sm text-gray-500"
      >
        <p>🚀 Keep exploring to climb the leaderboard!</p>
      </motion.div>
    </div>
  )
}
