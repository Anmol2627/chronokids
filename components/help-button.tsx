'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { HelpCircle, X } from 'lucide-react'

const helpContent: Record<string, { title: string; tips: string[] }> = {
  '/': {
    title: "Welcome to Time Travel Classroom!",
    tips: [
      "Click 'Start Your Adventure' to begin your first time travel mission!",
      "Scroll down to meet historical friends you can chat with.",
      "Pick a time period you're curious about from the Era Explorer.",
    ]
  },
  '/portal': {
    title: "The Time Portal Machine",
    tips: [
      "Type where and when you want to travel in the magic input box.",
      "Try clicking one of the adventure idea chips for inspiration!",
      "Watch the portal spin and glow as it opens your adventure.",
    ]
  },
  '/simulation': {
    title: "You're in a Historical World!",
    tips: [
      "Chat with historical figures by typing in the message box.",
      "Complete mission objectives to earn XP and badges.",
      "Watch your Discovery Journal fill up with new knowledge!",
    ]
  },
  '/journal': {
    title: "Your Discovery Journal",
    tips: [
      "Click on knowledge nodes to learn more about each topic.",
      "Filter by subject or era to explore different discoveries.",
      "Unlock new achievements by completing more adventures!",
    ]
  },
}

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = usePathname()

  // Get help content based on current path
  const content = helpContent[currentPath] || helpContent['/']

  return (
    <>
      {/* Help Button */}
      <motion.button
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#f97066] text-white flex items-center justify-center shadow-lg"
        style={{
          boxShadow: '0 0 20px rgba(249, 112, 102, 0.5)',
        }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(249, 112, 102, 0.5)',
            '0 0 30px rgba(249, 112, 102, 0.7)',
            '0 0 20px rgba(249, 112, 102, 0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, type: "tween" }}
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      {/* Help Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 border-2 border-[#fbbf24]/40"
              style={{
                boxShadow: '0 8px 40px rgba(249, 112, 102, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#fef3e2] transition-colors"
              >
                <X className="w-5 h-5 text-[#78350f]" />
              </button>

              {/* Mascot */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f97066] to-[#fbbf24] flex items-center justify-center text-4xl shadow-lg"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, type: "tween" }}
                >
                  🤖
                </motion.div>
              </div>

              {/* Mascot name */}
              <p className="text-center text-[#f97066] font-display font-bold mb-2">
                TEMPO the Time Robot
              </p>

              {/* Title */}
              <h2 className="text-xl font-bold text-center text-[#451a03] mb-4">
                {content.title}
              </h2>

              {/* Tips */}
              <div className="space-y-3">
                {content.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#fef3e2]"
                  >
                    <span className="text-lg">💡</span>
                    <p className="text-[#78350f] text-sm leading-relaxed">
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Got it button */}
              <motion.button
                className="w-full mt-6 py-3 rounded-full font-bold text-white portal-gradient shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
              >
                Got it! Thanks, TEMPO! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
