'use client'

import { motion } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { AdventureChapter } from './adventure-book'

interface SummaryPageProps {
  chapters: AdventureChapter[]
}

/*
  Map each adventure to broad learning categories.
  This is a simple heuristic based on scenario themes.
*/
function buildKnowledgeData(chapters: AdventureChapter[]) {
  const categories: Record<string, number> = {
    Science: 0,
    Space: 0,
    History: 0,
    Inventions: 0,
    Discovery: 0,
    Leadership: 0,
  }

  const categoryMap: Record<string, string[]> = {
    Science: ['einstein', 'curie', 'newton'],
    Space: ['armstrong'],
    History: ['cleopatra', 'wright'],
    Inventions: ['franklin', 'wright', 'einstein'],
    Discovery: ['curie', 'newton', 'armstrong'],
    Leadership: ['cleopatra', 'franklin'],
  }

  for (const chapter of chapters) {
    if (!chapter.completed) continue
    const id = chapter.scenarioId.toLowerCase()
    for (const [category, ids] of Object.entries(categoryMap)) {
      if (ids.some((term) => id.includes(term))) {
        categories[category] += chapter.discoveries.length
      }
    }
  }

  return Object.entries(categories).map(([subject, value]) => ({
    subject,
    knowledge: Math.min(value, 10), // cap at 10 for chart scale
    fullMark: 10,
  }))
}

export function SummaryPage({ chapters }: SummaryPageProps) {
  const data = buildKnowledgeData(chapters)
  const completed = chapters.filter((c) => c.completed).length
  const totalDiscoveries = chapters.reduce(
    (sum, c) => sum + (c.completed ? c.discoveries.length : 0),
    0,
  )

  return (
    <div className="h-full flex flex-col">
      {/* Title */}
      <div className="chapter-ornament">
        <span className="text-xs font-bold text-[#92400e] uppercase tracking-[0.15em]">
          Knowledge Summary
        </span>
      </div>

      <h2
        className="text-lg font-bold text-[#78350f] text-center mb-2"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        What I&apos;ve Learned 🧠
      </h2>

      {/* Quick stats row */}
      <div className="flex justify-center gap-4 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#78350f]">{completed}</div>
          <div className="text-[10px] text-[#92400e] uppercase font-semibold">Adventures</div>
        </div>
        <div className="w-px bg-[#b45309]/20" />
        <div className="text-center">
          <div className="text-2xl font-bold text-[#78350f]">{totalDiscoveries}</div>
          <div className="text-[10px] text-[#92400e] uppercase font-semibold">Discoveries</div>
        </div>
        <div className="w-px bg-[#b45309]/20" />
        <div className="text-center">
          <div className="text-2xl font-bold text-[#78350f]">{chapters.length}</div>
          <div className="text-[10px] text-[#92400e] uppercase font-semibold">Characters</div>
        </div>
      </div>

      {/* Radar chart */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="chart-container flex-1 min-h-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid
              stroke="#d4a574"
              strokeOpacity={0.3}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: 10,
                fill: '#78350f',
                fontWeight: 700,
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 10]}
              tick={{ fontSize: 8, fill: '#92400e' }}
              tickCount={4}
            />
            <Tooltip
              contentStyle={{
                background: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#78350f',
                fontWeight: 600,
              }}
              formatter={(value: number) => [`${value} discoveries`, 'Knowledge']}
            />
            <Radar
              name="Knowledge"
              dataKey="knowledge"
              stroke="#f59e0b"
              fill="#fbbf24"
              fillOpacity={0.35}
              strokeWidth={2}
              dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category list */}
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {data.map((item) => (
          <div
            key={item.subject}
            className="text-center p-1.5 rounded-lg bg-white/40"
          >
            <div className="text-xs font-bold text-[#78350f]">{item.subject}</div>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: i < Math.ceil(item.knowledge / 2) ? '#fbbf24' : '#e5e7eb',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
