'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-20 px-4 md:px-8 relative">
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbbf24]/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready, Explorer? 🌟
          </h2>
          <p className="text-xl text-purple-200 mb-12">
            Your next discovery is one click away.
          </p>

          {/* Portal Button */}
          <Link href="/portal">
            <motion.div
              className="inline-block relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #f97066, #fbbf24, #fb923c, #f472b6, #f97066)',
                  padding: 4,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full bg-[#1e1b4b]" />
              </motion.div>

              {/* Inner spinning ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-dashed border-[#fbbf24]/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />

              {/* Button content */}
              <div className="relative px-12 py-6 rounded-full portal-gradient shadow-xl">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: '0 0 40px rgba(249, 112, 102, 0.5), 0 0 80px rgba(251, 191, 36, 0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(249, 112, 102, 0.5), 0 0 80px rgba(251, 191, 36, 0.3)',
                      '0 0 60px rgba(249, 112, 102, 0.7), 0 0 100px rgba(251, 191, 36, 0.5)',
                      '0 0 40px rgba(249, 112, 102, 0.5), 0 0 80px rgba(251, 191, 36, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, type: "tween" }}
                />
                <span className="relative text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                  <span>Open the Portal</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, type: "tween" }}
                  >
                    ✨
                  </motion.span>
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Footer mascot hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="text-2xl">🤖</span>
            <span className="text-sm text-purple-200">
              TEMPO is ready to guide your adventures!
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="h-20 md:h-0" />
    </section>
  )
}
