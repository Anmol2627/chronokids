'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type ToastType = 'discovery' | 'mission' | 'badge' | 'xp'

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

const toastStyles: Record<ToastType, { emoji: string; color: string; bg: string }> = {
  discovery: { emoji: '🌟', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' },
  mission: { emoji: '✅', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  badge: { emoji: '🎁', color: '#f97066', bg: 'rgba(249, 112, 102, 0.15)' },
  xp: { emoji: '⭐', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.15)' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, title: string, description?: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, title, description }])

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const style = toastStyles[toast.type]
            return (
              <motion.div
                key={toast.id}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 px-4 py-3 rounded-[20px] min-w-[280px] max-w-[400px]"
                style={{
                  background: '#ffffff',
                  borderLeft: `4px solid ${style.color}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 20px ${style.color}30`,
                }}
              >
                <span className="text-2xl">{style.emoji}</span>
                <div className="flex-1">
                  <p 
                    className="font-bold text-sm"
                    style={{ color: style.color }}
                  >
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="text-[#78350f] text-xs mt-0.5">
                      {toast.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
