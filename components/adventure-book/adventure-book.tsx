'use client'

import { forwardRef, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import HTMLFlipBook from 'react-pageflip'
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
/*  Flipbook page wrapper (react-pageflip requires refs)               */
/* ------------------------------------------------------------------ */

const FlipPage = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  },
)

FlipPage.displayName = 'FlipPage'

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
  const flipBookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [bookSize, setBookSize] = useState<{ pageW: number; pageH: number }>({
    pageW: 440,
    pageH: 560,
  })

  const completedCount = chapters.filter((c) => c.completed).length
  const totalDiscoveries = chapters.reduce((sum, c) => sum + c.discoveries.length, 0)

  useEffect(() => {
    const compute = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800
      const totalW = Math.min(880, Math.floor(vw * 0.9))
      const pageW = Math.max(280, Math.floor(totalW / 2))
      const pageH = Math.max(420, Math.min(560, Math.floor(vh * 0.75)))
      setBookSize({ pageW, pageH })
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const pages = useMemo(() => {
    const result: ReactNode[] = []

    // Cover (front)
    result.push(
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
    )

    // Overview (right after cover)
    result.push(
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
    )

    // Table of contents
    result.push(
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
    )

    // First chapter (left page design)
    if (chapters.length > 0) {
      result.push(
        <div className="book-page book-page-right h-full">
          <ChapterPage chapter={chapters[0]} chapterNumber={1} side="left" />
          <span className="page-number page-number-right">— 3 —</span>
        </div>
      )
    } else {
      result.push(<div className="book-page book-page-right h-full" />)
    }

    // Remaining chapter pages (alternate right/left page designs)
    for (let i = 0; i < chapters.length; i++) {
      // Right-page design for chapter i
      result.push(
        <div className="book-page book-page-left h-full">
          <ChapterPage chapter={chapters[i]} chapterNumber={i + 1} side="right" />
          <span className="page-number page-number-left">— {4 + i * 2} —</span>
        </div>
      )

      // Next chapter left-page design (or summary)
      const next = i + 1 < chapters.length ? chapters[i + 1] : null
      result.push(
        next ? (
          <div className="book-page book-page-right h-full">
            <ChapterPage chapter={next} chapterNumber={i + 2} side="left" />
            <span className="page-number page-number-right">— {5 + i * 2} —</span>
          </div>
        ) : (
          <div className="book-page book-page-right h-full">
            <SummaryPage chapters={chapters} />
            <span className="page-number page-number-right">— {5 + i * 2} —</span>
          </div>
        )
      )
    }

    // Back cover
    result.push(
      <div className="book-cover h-full">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="text-5xl">🌟</div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            The Adventure Continues...
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          <p className="text-sm opacity-80 mt-2 max-w-xs text-center leading-relaxed">
            Every great explorer keeps learning. Your next chapter awaits in the Time Portal!
          </p>
          <p className="text-xs opacity-40 mt-6">ChronoKids © 2026</p>
        </div>
      </div>
    )

    return result
  }, [chapters, completedCount, totalDiscoveries, state.totalXP, state.level])

  const totalPages = pages.length
  const canPrev = currentPage > 0
  const canNext = currentPage < totalPages - 1

  const goPrev = () => flipBookRef.current?.pageFlip?.()?.flipPrev?.()
  const goNext = () => flipBookRef.current?.pageFlip?.()?.flipNext?.()

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
            <span className="text-white/70 text-xs font-semibold">
              Page {Math.min(currentPage + 1, totalPages)}/{totalPages}
            </span>
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
            {canPrev && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goPrev}
                className="book-nav-arrow left"
                disabled={!canPrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
            {canNext && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goNext}
                className="book-nav-arrow right"
                disabled={!canNext}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* The flipbook */}
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                width: bookSize.pageW * 2,
                height: bookSize.pageH,
                boxShadow:
                  '0 8px 60px rgba(120, 53, 15, 0.35), 0 0 80px rgba(251, 191, 36, 0.12), 0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <HTMLFlipBook
                ref={flipBookRef}
                style={{}}
                startPage={0}
                width={bookSize.pageW}
                height={bookSize.pageH}
                minWidth={280}
                minHeight={420}
                maxWidth={520}
                maxHeight={700}
                size="fixed"
                drawShadow
                maxShadowOpacity={0.35}
                flippingTime={700}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                showCover
                mobileScrollSupport
                onFlip={(e: any) => setCurrentPage(e.data)}
                className="w-full h-full"
              >
                {pages.map((page, idx) => (
                  <FlipPage key={idx} className="h-full">
                    {page}
                  </FlipPage>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Mobile nav buttons */}
            <div className="md:hidden flex justify-center gap-4 mt-4">
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className="px-5 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20 disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={goNext}
                disabled={!canNext}
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
