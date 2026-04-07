'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Smile, ChevronRight } from 'lucide-react'
import { Starfield } from '@/components/starfield'
import { Navigation } from '@/components/navigation'
import { HelpButton } from '@/components/help-button'
import { ToastProvider, useToast } from '@/components/achievement-toast'
import { AdventurePanel } from '@/components/simulation/adventure-panel'
import { DiscoveryPanel } from '@/components/simulation/discovery-panel'
import { WorldViewport } from '@/components/simulation/world-viewport'
import { useGame } from '@/lib/game-state'
import { CustomScenario, getScenarioById, resolveScenarioFromText } from '@/lib/custom-scenarios'
import ScoringSystem from '@/lib/scoring-system'
import LeaderboardService from '@/lib/supabase-service'

interface Message {
  id: string
  type: 'character' | 'user' | 'discovery'
  character?: string
  content: string
  concept?: string
}

const getActiveScenario = (adventure: string | null): CustomScenario => {
  if (typeof window !== 'undefined') {
    const storedScenarioId = localStorage.getItem('currentScenarioId')
    if (storedScenarioId) {
      return getScenarioById(storedScenarioId)
    }
  }

  return resolveScenarioFromText(adventure)
}

const getCharacterMessages = (scenario: CustomScenario): Message[] => [
  {
    id: '1',
    type: 'character',
    character: scenario.id,
    content: scenario.dialogue.greeting,
  },
]

function SimulationContent() {
  const { showToast } = useToast()
  const { state } = useGame()
  const currentScenario = getActiveScenario(state.currentAdventure)
  const [messages, setMessages] = useState<Message[]>(getCharacterMessages(currentScenario))
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [discoveries, setDiscoveries] = useState<string[]>(currentScenario.dialogue.discoveries.slice(0, 2))
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showMobilePanel, setShowMobilePanel] = useState<'adventure' | 'discovery' | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Update player score in background
  const updatePlayerScore = async (playerName: string) => {
    try {
      const progress = ScoringSystem.getPlayerProgress(playerName)
      await LeaderboardService.updatePlayerScore({
        name: playerName,
        points: progress.totalPoints,
        chapters_completed: progress.chaptersCompleted
      })
    } catch (error) {
      console.error('Failed to update leaderboard:', error)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const scenario = getActiveScenario(state.currentAdventure)
    setMessages(getCharacterMessages(scenario))
    setDiscoveries(scenario.dialogue.discoveries.slice(0, 2))
    
    // Award points for completing adventure
    const playerName = localStorage.getItem('playerName')
    if (playerName && scenario) {
      const progress = ScoringSystem.getPlayerProgress(playerName)
      if (!progress.adventuresCompleted.includes(scenario.title)) {
        ScoringSystem.completeAdventure(playerName, scenario.title)
        updatePlayerScore(playerName)
      }
    }
  }, [state.currentAdventure])

  const handleSend = async () => {
    if (!input.trim()) return

    const activeScenario = getActiveScenario(state.currentAdventure)
    const submittedInput = input.trim()
    const playerName = localStorage.getItem('playerName')

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: submittedInput,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Award points for character interaction
    if (playerName) {
      ScoringSystem.meetCharacter(playerName, activeScenario.character.name)
      updatePlayerScore(playerName)
    }

    const normalizedInput = submittedInput.toLowerCase()
    let matchedResponses: string[] = []

    for (const [keyword, responses] of Object.entries(activeScenario.dialogue.responses)) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        matchedResponses = responses
        break
      }
    }

    if (matchedResponses.length === 0) {
      matchedResponses = [
        `${activeScenario.character.name} smiles and points around the scene. "${activeScenario.environment.atmosphere}. Ask me about ${Object.keys(activeScenario.dialogue.responses).slice(0, 2).join(' or ')} and we will keep exploring together."`
      ]
    }

    const nextDiscovery = activeScenario.dialogue.discoveries.find(
      (discovery) => !discoveries.includes(discovery)
    )

    matchedResponses.forEach((response, index) => {
      const isLastResponse = index === matchedResponses.length - 1

      setTimeout(() => {
        const shouldRevealDiscovery = Boolean(isLastResponse && nextDiscovery)
        const characterMessage: Message = {
          id: `${Date.now()}-${index}`,
          type: shouldRevealDiscovery ? 'discovery' : 'character',
          character: activeScenario.id,
          content: response,
          concept: shouldRevealDiscovery ? nextDiscovery : undefined,
        }

        setMessages((prev) => [...prev, characterMessage])

        if (shouldRevealDiscovery && nextDiscovery) {
          setDiscoveries((prev) => {
            if (prev.includes(nextDiscovery)) {
              return prev
            }

            return [...prev, nextDiscovery]
          })
          showToast('discovery', 'New Discovery!', `You learned about ${nextDiscovery}!`)

          // Award points for discovery
          if (playerName) {
            ScoringSystem.unlockDiscovery(playerName, nextDiscovery)
            updatePlayerScore(playerName)
          }
        }

        if (isLastResponse) {
          setIsTyping(false)
        }
      }, 900 + index * 1200)
    })
  }

  return (
    <div className="min-h-screen relative">
      <Starfield starCount={60} />
      <Navigation />

      <main className="relative z-10 h-screen pt-16 pb-0 md:pb-0 flex">
        <div className="hidden lg:block w-[260px] flex-shrink-0 border-r border-[#fbbf24]/30">
          <AdventurePanel />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-[30%] min-h-[180px] border-b border-[#fbbf24]/30">
            <WorldViewport />
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-[#fffbf5]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type !== 'user' && (
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl mr-3 flex-shrink-0"
                      style={{
                        backgroundColor: `${currentScenario.character.color}20`,
                        borderColor: currentScenario.character.color,
                      }}
                    >
                      {currentScenario.character.emoji}
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-[20px] p-4 ${
                      message.type === 'user'
                        ? 'bg-white border'
                        : message.type === 'discovery'
                        ? 'bg-white border-2 relative overflow-hidden shadow-lg'
                        : 'bg-white shadow-sm'
                    }`}
                    style={
                      message.type === 'user'
                        ? {
                            backgroundColor: `${currentScenario.character.color}12`,
                            borderColor: `${currentScenario.character.color}55`,
                          }
                        : message.type === 'discovery'
                        ? {
                            borderColor: currentScenario.character.color,
                          }
                        : {
                            borderLeft: `4px solid ${currentScenario.character.color}`,
                          }
                    }
                  >
                    {message.type === 'discovery' && (
                      <>
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            boxShadow: `inset 0 0 30px ${currentScenario.character.color}25`,
                          }}
                          animate={{
                            boxShadow: [
                              `inset 0 0 30px ${currentScenario.character.color}25`,
                              `inset 0 0 50px ${currentScenario.character.color}45`,
                              `inset 0 0 30px ${currentScenario.character.color}25`,
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, type: "tween" }}
                        />
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                          <span className="text-lg">✨</span>
                          <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: currentScenario.character.color }}
                          >
                            New Discovery!
                          </span>
                          {message.concept && (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: `${currentScenario.character.color}20`,
                                color: currentScenario.character.color,
                              }}
                            >
                              {message.concept}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    
                    {message.type !== 'user' && message.type !== 'discovery' && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-[#451a03] text-sm">{currentScenario.character.name}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${currentScenario.character.color}20`,
                            color: currentScenario.character.color,
                          }}
                        >
                          {currentScenario.character.role}
                        </span>
                      </div>
                    )}
                    
                    <p className={`text-[#451a03] leading-relaxed relative z-10 ${
                      message.type === 'user' ? 'text-right' : ''
                    }`}>
                      {message.content}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg ml-3 flex-shrink-0"
                      style={{
                        backgroundColor: `${currentScenario.character.color}20`,
                        borderColor: currentScenario.character.color,
                      }}
                    >
                      🚀
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl"
                      style={{
                        backgroundColor: `${currentScenario.character.color}20`,
                        borderColor: currentScenario.character.color,
                      }}
                    >
                      {currentScenario.character.emoji}
                    </div>
                    <div className="bg-white rounded-full px-4 py-3 flex items-center gap-1 shadow-sm">
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentScenario.character.color }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0, type: "tween" }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentScenario.emoji === '🚀' ? '#93c5fd' : '#fbbf24' }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.15, type: "tween" }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentScenario.design.gradient.glow }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.3, type: "tween" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-[#fef3e2]">
              <span className="text-xs text-[#a16207] flex-shrink-0 self-center">Ask About:</span>
              {currentScenario.promptSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setInput(suggestion)
                  }}
                  className="px-3 py-1.5 rounded-full bg-white text-[#78350f] text-sm whitespace-nowrap transition-colors"
                  style={{
                    border: `1px solid ${currentScenario.character.color}55`,
                  }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>

            <div className="p-4 border-t border-[#fbbf24]/30 bg-white">
              <div
                className="flex items-center gap-2 p-2 rounded-full bg-[#fef3e2] border-2"
                style={{ borderColor: `${currentScenario.character.color}55` }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Ask ${currentScenario.character.name} anything! 💬`}
                  className="flex-1 bg-transparent px-4 py-2 text-[#451a03] placeholder:text-[#a16207] focus:outline-none"
                />
                <button className="p-2 rounded-full hover:bg-white transition-colors">
                  <Smile className="w-5 h-5 text-[#a16207]" />
                </button>
                <button className="p-2 rounded-full hover:bg-white transition-colors">
                  <Mic className="w-5 h-5 text-[#a16207]" />
                </button>
                <motion.button
                  onClick={handleSend}
                  className="p-3 rounded-full text-white shadow-lg"
                  style={{ backgroundColor: currentScenario.character.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-[280px] flex-shrink-0 border-l border-[#fbbf24]/30">
          <DiscoveryPanel discoveries={discoveries} />
        </div>
      </main>

      <div className="fixed bottom-20 left-4 right-4 flex gap-2 lg:hidden z-40">
        <motion.button
          onClick={() => setShowMobilePanel(showMobilePanel === 'adventure' ? null : 'adventure')}
          className="flex-1 py-3 rounded-xl bg-white border-2 border-[#fbbf24]/40 text-[#78350f] text-sm font-semibold shadow-md"
          whileTap={{ scale: 0.98 }}
        >
          🎯 Mission
        </motion.button>
        <motion.button
          onClick={() => setShowMobilePanel(showMobilePanel === 'discovery' ? null : 'discovery')}
          className="flex-1 py-3 rounded-xl bg-white border-2 border-[#fbbf24]/40 text-[#78350f] text-sm font-semibold shadow-md"
          whileTap={{ scale: 0.98 }}
        >
          📖 Journal
        </motion.button>
      </div>

      <AnimatePresence>
        {showMobilePanel && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-x-0 bottom-0 h-[70%] z-50 bg-[#fffbf5] border-t-2 border-[#fbbf24]/40 rounded-t-3xl lg:hidden shadow-xl"
          >
            <div className="p-4 border-b border-[#fbbf24]/30 flex items-center justify-between">
              <h3 className="font-bold text-[#451a03]">
                {showMobilePanel === 'adventure' ? '🎯 Your Mission' : '📖 Discovery Journal'}
              </h3>
              <button
                onClick={() => setShowMobilePanel(null)}
                className="p-2 rounded-full hover:bg-[#fef3e2]"
              >
                <ChevronRight className="w-5 h-5 text-[#78350f] rotate-90" />
              </button>
            </div>
            <div className="h-full overflow-y-auto pb-32">
              {showMobilePanel === 'adventure' ? (
                <AdventurePanel />
              ) : (
                <DiscoveryPanel discoveries={discoveries} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HelpButton />
    </div>
  )
}

export default function SimulationPage() {
  return (
    <ToastProvider>
      <SimulationContent />
    </ToastProvider>
  )
}
