'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    number: 'STEP 1',
    title: 'Explore a Moment in History',
    description: 'Choose a place or time from history you want to explore.',
    image: '/home1.webp',
    color: '#f97066',
  },
  {
    number: 'STEP 2',
    title: 'Meet Famous Thinkers',
    description: 'Talk with inventors, scientists, and explorers from the past.',
    image: '/home2.png',
    color: '#a855f7',
  },
  {
    number: 'STEP 3',
    title: 'Unlock Knowledge Powers',
    description: 'Discover amazing ideas and collect achievements as you learn.',
    image: '/home3.png',
    color: '#0ea5e9',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Become a Time Explorer ⏳
          </h2>
          <p className="text-purple-200 text-lg">
            Three fun steps to start your adventure through history
          </p>
        </motion.div>

        {/* Steps with connecting path */}
        <div className="relative">
          {/* Connecting dotted path - visible on desktop */}
          <svg
            className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 hidden md:block"
            viewBox="0 0 1000 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M100 40 L 300 40 L 500 40 L 700 40 L 900 40"
              stroke="url(#pathGradientWarm)"
              strokeWidth="4"
              strokeDasharray="8 12"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="pathGradientWarm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97066" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Step cards */}
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Step badge outside card */}
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white z-20"
                  style={{
                    background: step.color,
                    boxShadow: `0 4px 12px ${step.color}40`,
                  }}
                >
                  {step.number}
                </div>

                {/* Image card - fills entire card */}
                <motion.div 
                  className="relative rounded-[32px] border transition-all duration-300 card-glow overflow-hidden h-64"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    borderColor: `${step.color}50`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${step.color}15`,
                  }}
                  whileHover={{ 
                    y: -6,
                    scale: 1.02,
                    boxShadow: `0 16px 40px ${step.color}40`,
                  }}
                >
                  {/* Watermark number */}
                  <span 
                    className="absolute -right-4 -top-8 text-[120px] font-display font-bold pointer-events-none select-none"
                    style={{ color: `${step.color}15` }}
                  >
                    {step.number.replace('STEP ', '')}
                  </span>

                  {/* Full card image */}
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>

                {/* Content outside card */}
                <h3 
                  className="text-xl font-bold text-center mb-2 mt-4 relative z-10"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="text-purple-200 text-center text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
