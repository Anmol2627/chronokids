'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Portal } from '@/components/portal'
import { ChronoKidsLogo } from '@/components/chronokids-logo'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-start justify-center px-4 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full text-center">
        {/* Main centered ChronoKids logo */}
        <div className="mb-8">
          <div className="text-7xl md:text-9xl lg:text-10xl font-bold mb-4 inline-flex items-baseline">
            <span style={{ color: '#f97316', display: 'inline-block', transform: 'rotate(0deg) translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #f9731660, 0 0 40px #f9731630' }}>C</span>
            <span style={{ color: '#a855f7', display: 'inline-block', transform: 'rotate(3deg) translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #a855f760, 0 0 40px #a855f730' }}>h</span>
            <span style={{ color: '#0ea5e9', display: 'inline-block', transform: 'rotate(-3deg) translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #0ea5e960, 0 0 40px #0ea5e930' }}>r</span>
            <span style={{ color: '#14b8a6', display: 'inline-block', transform: 'rotate(0deg) translateY(-3px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #14b8a660, 0 0 40px #14b8a630' }}>o</span>
            <span style={{ color: '#eab308', display: 'inline-block', transform: 'rotate(0deg) translateY(3px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #eab30860, 0 0 40px #eab30830' }}>n</span>
            <span style={{ color: '#ec4899', display: 'inline-block', transform: 'rotate(5deg) translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #ec489960, 0 0 40px #ec489930' }}>o</span>
            <span style={{ color: '#f97316', display: 'inline-block', transform: 'rotate(-2deg) translateY(0px) scale(1.1)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #f9731660, 0 0 40px #f9731630' }}>K</span>
            <span style={{ color: '#a855f7', display: 'inline-block', transform: 'rotate(0deg) translateY(4px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #a855f760, 0 0 40px #a855f730' }}>i</span>
            <span style={{ color: '#0ea5e9', display: 'inline-block', transform: 'rotate(4deg) translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #0ea5e960, 0 0 40px #0ea5e930' }}>d</span>
            <span style={{ color: '#14b8a6', display: 'inline-block', transform: 'rotate(0deg) translateY(-4px)', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255,100,255,0.3), 0 0 20px #14b8a660, 0 0 40px #14b8a630' }}>s</span>
          </div>
        </div>

        {/* Centered headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-relaxed mb-8 text-balance"
        >
          <span className="text-white">Travel Through Time.</span>{' '}
          <span className="bg-gradient-to-r from-[#f97316] via-[#a855f7] to-[#0ea5e9] bg-clip-text text-transparent">Make Friends with History!</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join ChronoKids on a magical adventure through history! Meet famous historical figures, 
          discover amazing inventions, and build your own knowledge map as you travel through time. 
          Your journey through the ages starts here!
        </motion.p>
        {/* Home Image with Kids and Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="relative w-full max-w-4xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl mb-12 mt-20 md:mt-32"
        >
          <Image
            src="/home.png"
            alt="Kids running on an ancient map adventure"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
