'use client'

import { useState, useRef, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGame } from '@/lib/game-state'
import { scenarioList, type CustomScenario } from '@/lib/custom-scenarios'
import { OverviewPage } from './overview-page'
import { ChapterPage } from './chapter-page'
import { SummaryPage } from './summary-page'
import './adventure-book.css'

/* ------------------------------------------------------------------ */
/*  Data helpers                                                       */
/* ------------------------------------------------------------------ */

export interface AdventureChapter {
  chapter: string
  character: string
  characterEmoji: string
  characterRole: string
  discoveries: string[]
  completed: boolean
  dateCompleted?: string
  color: string
  scenarioId: string
  scenario: CustomScenario
}

function buildChapters(): AdventureChapter[] {
  return scenarioList.map((scenario) => ({
    chapter: scenario.title,
    character: scenario.character.name,
    characterEmoji: scenario.character.emoji,
    characterRole: scenario.character.role,
    discoveries: scenario.dialogue.discoveries,
    completed: true,
    dateCompleted: new Date().toISOString().split('T')[0],
    color: scenario.character.color,
    scenarioId: scenario.id,
    scenario,
  }))
}

/* ------------------------------------------------------------------ */
/*  Book spread structure — each spread = left page + right page       */
/* ------------------------------------------------------------------ */

interface Spread {
  left: ReactNode
  right: ReactNode
  leftNum?: number
  rightNum?: number
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

interface AdventureBookProps {
  isOpen: boolean
  onClose: () => void
}

export function AdventureBook({ isOpen, onClose }: AdventureBookProps) {
  const { state } = useGame()
  const chapters = buildChapters()
  const [currentSpread, setCurrentSpread] = useState(0)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')
  const [isFlipping, setIsFlipping] = useState(false)

  const completedCount = chapters.filter((c) => c.completed).length
  const totalDiscoveries = chapters.reduce((sum, c) => sum + c.discoveries.length, 0)

  /* Build spreads */
  const spreads: Spread[] = []

  // Spread 0: Cover
  spreads.push({
    left: (
      <div className="book-cover h-full">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div
            className="text-6xl mb-2"
            animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, type: 'tween' }}
          >
            📖
          </motion.div>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              textShadow: '0 2px 20px rgba(251, 191, 36, 0.5)',
            }}
          >
            My Adventure Book
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          <p className="text-sm opacity-80 mt-2">
            A Chronicle of Time Travel & Discovery
          </p>
          <p className="text-xs opacity-50 mt-6">click the arrow to open →</p>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>
    ),
    right: (
      <div className="book-page book-page-right h-full">
        <OverviewPage
          adventuresCompleted={completedCount}
          charactersMet={chapters.length}
          discoveriesUnlocked={totalDiscoveries}
          totalXP={state.totalXP}
          level={state.level}
        />
        <span className="page-number page-number-right">— 1 —</span>
      </div>
    ),
  })

  // Spread 1: Table of Contents + First Chapter left
  spreads.push({
    left: (
      <div className="book-page book-page-left h-full">
        <div className="h-full flex flex-col relative z-[1]">
          <div className="chapter-ornament">
            <span className="text-sm font-bold text-[#92400e] uppercase tracking-widest">
              Table of Contents
            </span>
          </div>
          <div className="flex-1 space-y-2 mt-4 overflow-y-auto">
            {chapters.map((ch, i) => (
              <div
                key={ch.scenarioId}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/40 transition-colors cursor-default"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg border-2 flex-shrink-0"
                  style={{
                    borderColor: ch.color,
                    backgroundColor: `${ch.color}15`,
                  }}
                >
                  {ch.characterEmoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#451a03] truncate">
                    Ch. {i + 1}: {ch.chapter}
                  </p>
                  <p className="text-xs text-[#92400e]">{ch.character}</p>
                </div>
                {ch.completed ? (
                  <span className="text-green-600 text-xs">✓</span>
                ) : (
                  <span className="text-gray-400 text-xs">🔒</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-4 text-center">
            <p className="text-xs text-[#92400e] italic">
              Flip the page to read each chapter →
            </p>
          </div>
        </div>
        <span className="page-number page-number-left">— 2 —</span>
      </div>
    ),
    right: chapters.length > 0 ? (
      <div className="book-page book-page-right h-full">
        <ChapterPage chapter={chapters[0]} chapterNumber={1} side="left" />
        <span className="page-number page-number-right">— 3 —</span>
      </div>
    ) : (
      <div className="book-page book-page-right h-full" />
    ),
  })

  // Chapter spreads (pairs of pages)
  for (let i = 0; i < chapters.length; i++) {
    const rightChapter = i + 1 < chapters.length ? chapters[i + 1] : null
    spreads.push({
      left: (
        <div className="book-page book-page-left h-full">
          <ChapterPage chapter={chapters[i]} chapterNumber={i + 1} side="right" />
          <span className="page-number page-number-left">— {4 + i * 2} —</span>
        </div>
      ),
      right: rightChapter ? (
        <div className="book-page book-page-right h-full">
          <ChapterPage chapter={rightChapter} chapterNumber={i + 2} side="left" />
          <span className="page-number page-number-right">— {5 + i * 2} —</span>
        </div>
      ) : (
        <div className="book-page book-page-right h-full">
          <SummaryPage chapters={chapters} />
          <span className="page-number page-number-right">— {5 + i * 2} —</span>
        </div>
      ),
    })
  }

  // Add back cover if summary wasn't added
  const lastSpreadHasSummary = chapters.length > 0
  if (!lastSpreadHasSummary || chapters.length % 2 === 0) {
    spreads.push({
      left: (
        <div className="book-page book-page-left h-full">
          <SummaryPage chapters={chapters} />
          <span className="page-number page-number-left">— {spreads.length * 2} —</span>
        </div>
      ),
      right: (
        <div className="book-cover h-full">
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="text-5xl">🌟</div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              The Adventure Continues...
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
            <p className="text-sm opacity-80 mt-2 max-w-xs text-center leading-relaxed">
              Every great explorer keeps learning. Your next chapter awaits in the Time Portal!
            </p>
            <p className="text-xs opacity-40 mt-6">ChronoKids © 2026</p>
          </div>
        </div>
      ),
    })
  }

  const totalSpreads = spreads.length

  const goNext = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return
    setFlipDirection('next')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1))
      setIsFlipping(false)
    }, 500)
  }, [isFlipping, currentSpread, totalSpreads])

  const goPrev = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return
    setFlipDirection('prev')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentSpread((prev) => Math.max(prev - 1, 0))
      setIsFlipping(false)
    }, 500)
  }, [isFlipping, currentSpread])

  const spread = spreads[currentSpread]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 10, 30, 0.88)', backdropFilter: 'blur(14px)' }}
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Page indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2"
          >
            {spreads.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipDirection(i > currentSpread ? 'next' : 'prev')
                  setCurrentSpread(i)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSpread
                    ? 'bg-[#fbbf24] scale-125 shadow-lg shadow-amber-500/40'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </motion.div>

          {/* Book container */}
          <motion.div
            initial={{ scale: 0.7, rotateY: -20, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotateY: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="relative adventure-book-wrapper"
            style={{ perspective: '2000px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation arrows */}
            {currentSpread > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goPrev}
                className="book-nav-arrow left"
                disabled={isFlipping}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
            {currentSpread < totalSpreads - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goNext}
                className="book-nav-arrow right"
                disabled={isFlipping}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* The book */}
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                width: 'min(880px, 90vw)',
                height: 'min(560px, 75vh)',
                boxShadow:
                  '0 8px 60px rgba(120, 53, 15, 0.35), 0 0 80px rgba(251, 191, 36, 0.12), 0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSpread}
                  initial={{
                    rotateY: flipDirection === 'next' ? 8 : -8,
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    rotateY: flipDirection === 'next' ? -8 : 8,
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute inset-0 grid grid-cols-2"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Left page */}
                  <div className="relative overflow-hidden">
                    {spread.left}
                  </div>

                  {/* Center spine */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] z-10"
                    style={{
                      background: 'linear-gradient(180deg, rgba(139,92,42,0.3) 0%, rgba(139,92,42,0.15) 50%, rgba(139,92,42,0.3) 100%)',
                      boxShadow: '-2px 0 8px rgba(139,92,42,0.08), 2px 0 8px rgba(139,92,42,0.08)',
                    }}
                  />

                  {/* Right page */}
                  <div className="relative overflow-hidden">
                    {spread.right}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile nav buttons */}
            <div className="md:hidden flex justify-center gap-4 mt-4">
              <button
                onClick={goPrev}
                disabled={currentSpread === 0 || isFlipping}
                className="px-5 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20 disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={goNext}
                disabled={currentSpread === totalSpreads - 1 || isFlipping}
                className="px-5 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20 disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
