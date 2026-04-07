'use client'

import { motion } from 'framer-motion'
import type { AdventureChapter } from './adventure-book'

interface ChapterPageProps {
  chapter: AdventureChapter
  chapterNumber: number
  side: 'left' | 'right'
}

export function ChapterPage({ chapter, chapterNumber, side }: ChapterPageProps) {
  if (side === 'left') {
    return <ChapterLeftPage chapter={chapter} chapterNumber={chapterNumber} />
  }
  return <ChapterRightPage chapter={chapter} chapterNumber={chapterNumber} />
}

/* ---- Left page: Character + story ---- */

function ChapterLeftPage({
  chapter,
  chapterNumber,
}: {
  chapter: AdventureChapter
  chapterNumber: number
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Chapter label */}
      <div className="chapter-ornament">
        <span className="text-xs font-bold text-[#92400e] uppercase tracking-[0.15em]">
          Chapter {chapterNumber}
        </span>
      </div>

      {/* Chapter title */}
      <h2
        className="text-xl font-bold text-center mb-3"
        style={{
          fontFamily: "'Fredoka', sans-serif",
          color: chapter.color,
        }}
      >
        {chapter.chapter}
      </h2>

      {/* Character card */}
      <div
        className="mx-auto mb-4 p-4 rounded-2xl text-center"
        style={{
          background: `linear-gradient(135deg, ${chapter.color}12, ${chapter.color}08)`,
          border: `2px solid ${chapter.color}30`,
          maxWidth: '280px',
          width: '100%',
        }}
      >
        <motion.div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl border-3 mb-2"
          style={{
            backgroundColor: `${chapter.color}20`,
            borderColor: chapter.color,
            boxShadow: `0 4px 20px ${chapter.color}30`,
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, type: 'tween' }}
        >
          {chapter.characterEmoji}
        </motion.div>

        <h3 className="font-bold text-[#451a03] text-base">{chapter.character}</h3>
        <p className="text-xs italic" style={{ color: chapter.color }}>
          {chapter.characterRole}
        </p>
      </div>

      {/* Story text */}
      <div className="flex-1">
        <p className="text-sm text-[#5c2d0e] leading-relaxed">
          In this adventure, you traveled to{' '}
          <span className="font-bold">{chapter.scenario.design.locationLabel}</span> and
          met <span className="font-bold">{chapter.character}</span>.{' '}
          {chapter.scenario.environment.atmosphere}.
        </p>

        <p className="text-sm text-[#5c2d0e] leading-relaxed mt-3">
          Together you explored {chapter.scenario.environment.setting.split('.')[0].toLowerCase()}.
        </p>
      </div>

      {/* Completion status */}
      <div className="mt-auto pt-3 flex justify-center">
        <span className={`completion-stamp ${chapter.completed ? 'completed' : 'locked'}`}>
          {chapter.completed ? (
            <>
              <span>✅</span>
              <span>Adventure Complete</span>
            </>
          ) : (
            <>
              <span>🔒</span>
              <span>Not Yet Explored</span>
            </>
          )}
        </span>
      </div>
    </div>
  )
}

/* ---- Right page: Discoveries + Facts ---- */

function ChapterRightPage({
  chapter,
  chapterNumber,
}: {
  chapter: AdventureChapter
  chapterNumber: number
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Discoveries section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💡</span>
          <h3 className="text-sm font-bold text-[#78350f] uppercase tracking-wider">
            Discoveries Unlocked
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {chapter.discoveries.map((discovery, i) => (
            <motion.span
              key={discovery}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="discovery-badge"
            >
              <span>✨</span>
              <span>{discovery}</span>
            </motion.span>
          ))}
        </div>
      </div>

      {/* Fun Facts section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📚</span>
          <h3 className="text-sm font-bold text-[#78350f] uppercase tracking-wider">
            Fun Facts Learned
          </h3>
        </div>

        <div className="space-y-2">
          {chapter.scenario.facts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-2 p-2 rounded-lg bg-white/40"
            >
              <span className="text-base flex-shrink-0 mt-0.5">{fact.emoji}</span>
              <p className="text-xs text-[#5c2d0e] leading-relaxed">{fact.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scene info */}
      <div className="mt-auto">
        <div className="p-3 rounded-xl" style={{ background: `${chapter.color}10`, border: `1px solid ${chapter.color}25` }}>
          <div className="flex items-center gap-2 mb-1">
            <span>📍</span>
            <span className="text-xs font-bold text-[#78350f]">
              {chapter.scenario.design.locationLabel}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {chapter.scenario.environment.sounds.slice(0, 3).map((sound) => (
              <span
                key={sound}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  background: `${chapter.color}15`,
                  color: chapter.color,
                  border: `1px solid ${chapter.color}30`,
                }}
              >
                🔊 {sound}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Date */}
      {chapter.dateCompleted && (
        <div className="mt-2 text-center">
          <p className="text-[10px] text-[#92400e] italic">
            Completed on {chapter.dateCompleted}
          </p>
        </div>
      )}
    </div>
  )
}
