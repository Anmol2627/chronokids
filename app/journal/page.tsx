'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Filter, Lock, ChevronDown } from 'lucide-react'
import { Starfield } from '@/components/starfield'
import { Navigation } from '@/components/navigation'
import { HelpButton } from '@/components/help-button'
import { ToastProvider } from '@/components/achievement-toast'
import { KnowledgeGraph } from '@/components/journal/knowledge-graph'

const subjects = [
  { id: 'physics', name: 'Physics', color: '#f97066', emoji: '⚛️' },
  { id: 'history', name: 'History', color: '#fbbf24', emoji: '📜' },
  { id: 'science', name: 'Science', color: '#10b981', emoji: '🔬' },
  { id: 'math', name: 'Math', color: '#f472b6', emoji: '📐' },
  { id: 'geography', name: 'Geography', color: '#fb923c', emoji: '🌍' },
]

const eras = [
  { id: 'all', name: 'All Eras' },
  { id: 'ancient', name: 'Ancient World' },
  { id: 'medieval', name: 'Medieval Period' },
  { id: 'renaissance', name: 'Renaissance' },
  { id: 'modern', name: 'Modern Era' },
  { id: 'space', name: 'Space Age' },
]

const achievements = [
  { id: 'einstein', name: "Einstein's Friend", description: 'Completed your first conversation with Einstein', earned: true, emoji: '👨‍🔬' },
  { id: 'physics', name: 'Physics Pioneer', description: 'Discovered 5 physics concepts', earned: true, emoji: '⚛️' },
  { id: 'time', name: 'Time Traveler', description: 'Visited 3 different eras', earned: true, emoji: '⏰' },
  { id: 'moon', name: 'Moon Walker', description: 'Visit the Moon Landing in 1969', earned: false, emoji: '🌙' },
  { id: 'electric', name: 'Electricity Finder', description: 'Learn about electricity with Ben Franklin', earned: false, emoji: '⚡' },
  { id: 'ancient', name: 'Ancient Explorer', description: 'Complete 3 adventures in the Ancient World', earned: false, emoji: '🏛️' },
  { id: 'leonardo', name: "Da Vinci's Apprentice", description: 'Learn art and science from Leonardo', earned: false, emoji: '🎨' },
  { id: 'master', name: 'Knowledge Master', description: 'Discover 50 concepts', earned: false, emoji: '🏆' },
]

export default function JournalPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedEra, setSelectedEra] = useState('all')
  const [isEraDropdownOpen, setIsEraDropdownOpen] = useState(false)

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen relative">
        <Starfield starCount={60} />
        <Navigation />

        <main className="relative z-10 pt-20 pb-24 md:pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              {/* Left Sidebar */}
              <div className="space-y-6">
                {/* Kid Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-3xl bg-white border-2 border-[#fbbf24]/40 shadow-lg"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f97066] to-[#fbbf24] flex items-center justify-center text-3xl shadow-lg"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, type: "tween" }}
                      >
                        🚀
                      </motion.div>
                      {/* XP ring */}
                      <svg className="absolute inset-0 w-16 h-16 -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          fill="none"
                          stroke="#fef3e2"
                          strokeWidth="4"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="30"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={188}
                          initial={{ strokeDashoffset: 188 }}
                          animate={{ strokeDashoffset: 188 * 0.35 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#451a03]">Young Explorer</p>
                      <p className="font-display text-2xl font-bold text-[#f97066]">
                        1,450 XP
                      </p>
                    </div>
                  </div>

                  {/* Rank badge */}
                  <div className="p-3 rounded-xl bg-[#fef3e2] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⭐</span>
                      <div>
                        <p className="text-sm font-bold text-[#451a03]">
                          Chrono Explorer Level 7
                        </p>
                        <p className="text-xs text-[#78350f]">Time Wizard!</p>
                      </div>
                    </div>
                  </div>

                  {/* Earned badges preview */}
                  <div className="flex gap-2 flex-wrap">
                    {achievements.filter(a => a.earned).map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className="w-10 h-10 rounded-full bg-[#f97066]/20 border-2 border-[#f97066] flex items-center justify-center shadow-sm"
                        whileHover={{ scale: 1.1 }}
                        title={achievement.name}
                      >
                        <span>{achievement.emoji}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Subject Filters */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-white border-2 border-[#fbbf24]/40 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-[#78350f]" />
                    <h3 className="text-xs font-bold text-[#a16207] uppercase tracking-wider">
                      Explore by Subject
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => {
                      const isSelected = selectedSubjects.includes(subject.id)
                      return (
                        <motion.button
                          key={subject.id}
                          onClick={() => toggleSubject(subject.id)}
                          className="px-3 py-2 rounded-full text-sm font-semibold transition-all"
                          style={{
                            background: isSelected ? subject.color : `${subject.color}20`,
                            color: isSelected ? '#fff' : subject.color,
                            border: `2px solid ${subject.color}`,
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {subject.emoji} {subject.name}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Era Filter */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <button
                    onClick={() => setIsEraDropdownOpen(!isEraDropdownOpen)}
                    className="w-full p-4 rounded-2xl bg-white border-2 border-[#fbbf24]/40 flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span>🕰️</span>
                      <span className="text-sm font-semibold text-[#451a03]">
                        {eras.find(e => e.id === selectedEra)?.name}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#78350f] transition-transform ${
                      isEraDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isEraDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-white border-2 border-[#fbbf24]/40 z-20 shadow-lg"
                      >
                        {eras.map((era) => (
                          <button
                            key={era.id}
                            onClick={() => {
                              setSelectedEra(era.id)
                              setIsEraDropdownOpen(false)
                            }}
                            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
                              selectedEra === era.id
                                ? 'bg-[#f97066]/20 text-[#451a03]'
                                : 'hover:bg-[#fef3e2] text-[#78350f]'
                            }`}
                          >
                            {era.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Main Content - Knowledge Graph */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-[500px] rounded-3xl bg-white border-2 border-[#fbbf24]/40 overflow-hidden shadow-lg"
                >
                  <KnowledgeGraph
                    selectedSubjects={selectedSubjects}
                    selectedEra={selectedEra}
                  />
                </motion.div>

                {/* Achievement Wall */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>🏆</span>
                    Achievement Wall
                  </h3>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className={`flex-shrink-0 w-48 p-4 rounded-2xl border-2 ${
                          achievement.earned
                            ? 'bg-white/90 backdrop-blur-sm border-[#f97066]/40'
                            : 'bg-white/5 backdrop-blur-sm border-white/10 grayscale'
                        }`}
                        style={achievement.earned ? {
                          boxShadow: '0 4px 20px rgba(249, 112, 102, 0.2)',
                        } : {}}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            achievement.earned
                              ? 'bg-[#f97066]/20'
                              : 'bg-white/10'
                          }`}>
                            {achievement.earned ? achievement.emoji : (
                              <Lock className="w-5 h-5 text-white/30" />
                            )}
                          </div>
                        </div>
                        <h4 className={`font-bold text-sm mb-1 ${
                          achievement.earned ? 'text-[#451a03]' : 'text-white/40'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-xs ${
                          achievement.earned ? 'text-[#78350f]' : 'text-white/30'
                        }`}>
                          {achievement.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <HelpButton />
      </div>
    </ToastProvider>
  )
}
