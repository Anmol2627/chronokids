'use client'

import { motion } from 'framer-motion'

interface OverviewPageProps {
  adventuresCompleted: number
  charactersMet: number
  discoveriesUnlocked: number
  totalXP: number
  level: number
}

export function OverviewPage({
  adventuresCompleted,
  charactersMet,
  discoveriesUnlocked,
  totalXP,
  level,
}: OverviewPageProps) {
  const stats = [
    {
      icon: '⭐',
      label: 'Adventures Completed',
      value: adventuresCompleted,
    },
    {
      icon: '👨‍🔬',
      label: 'Historical Friends Met',
      value: charactersMet,
    },
    {
      icon: '💡',
      label: 'Discoveries Unlocked',
      value: discoveriesUnlocked,
    },
    {
      icon: '🏆',
      label: 'Total XP Earned',
      value: totalXP.toLocaleString(),
    },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Decorative title */}
      <div className="text-center mb-4">
        <div className="chapter-ornament">
          <span className="text-xs font-bold text-[#92400e] uppercase tracking-[0.2em]">
            Explorer Profile
          </span>
        </div>
        <h2
          className="text-2xl font-bold text-[#78350f] mt-2"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          My Journey So Far
        </h2>
        <p className="text-xs text-[#92400e] mt-1 italic">
          Chrono Explorer — Level {level}
        </p>
      </div>

      {/* Decorative avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f97066] to-[#fbbf24] flex items-center justify-center text-4xl shadow-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, type: 'tween' }}
            style={{
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.35)',
            }}
          >
            🚀
          </motion.div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#fbbf24] text-[#78350f] text-[10px] font-bold whitespace-nowrap shadow-sm">
            Lv. {level}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="flex-1 space-y-2.5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="stat-card"
          >
            <div className="stat-card-icon">{stat.icon}</div>
            <div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-value">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom flourish */}
      <div className="mt-3 flex justify-center">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#b45309] to-transparent opacity-40" />
      </div>
    </div>
  )
}
