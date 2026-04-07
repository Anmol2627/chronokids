'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface Discovery {
  id: string
  name: string
  description: string
  subject: 'physics' | 'history' | 'science' | 'math' | 'geography'
  era: string
  timestamp: Date
  character?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  earned: boolean
  emoji: string
  earnedAt?: Date
}

export interface GameState {
  discoveries: Discovery[]
  achievements: Achievement[]
  currentAdventure: string | null
  unlockedCharacters: string[]
  totalXP: number
  level: number
}

type GameAction =
  | { type: 'ADD_DISCOVERY'; payload: Discovery }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'START_ADVENTURE'; payload: string }
  | { type: 'COMPLETE_ADVENTURE' }
  | { type: 'UNLOCK_CHARACTER'; payload: string }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'LOAD_STATE'; payload: GameState }

const initialState: GameState = {
  discoveries: [],
  achievements: [
    { id: 'einstein', name: "Einstein's Friend", description: 'Completed your first conversation with Einstein', earned: false, emoji: '👨‍🔬' },
    { id: 'physics', name: 'Physics Pioneer', description: 'Discovered 5 physics concepts', earned: false, emoji: '⚛️' },
    { id: 'time', name: 'Time Traveler', description: 'Visited 3 different eras', earned: false, emoji: '⏰' },
    { id: 'moon', name: 'Moon Walker', description: 'Visit the Moon Landing in 1969', earned: false, emoji: '🌙' },
    { id: 'electric', name: 'Electricity Finder', description: 'Learn about electricity with Ben Franklin', earned: false, emoji: '⚡' },
    { id: 'ancient', name: 'Ancient Explorer', description: 'Complete 3 adventures in the Ancient World', earned: false, emoji: '🏛️' },
    { id: 'leonardo', name: "Da Vinci's Apprentice", description: 'Learn art and science from Leonardo', earned: false, emoji: '🎨' },
    { id: 'master', name: 'Knowledge Master', description: 'Discover 50 concepts', earned: false, emoji: '🏆' },
  ],
  currentAdventure: null,
  unlockedCharacters: [],
  totalXP: 0,
  level: 1,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_DISCOVERY': {
      const newDiscoveries = [...state.discoveries, action.payload]
      const newXP = state.totalXP + 10
      
      // Check achievements
      const updatedAchievements = state.achievements.map(achievement => {
        if (achievement.id === 'physics' && 
            newDiscoveries.filter(d => d.subject === 'physics').length >= 5) {
          return { ...achievement, earned: true, earnedAt: new Date() }
        }
        if (achievement.id === 'master' && newDiscoveries.length >= 50) {
          return { ...achievement, earned: true, earnedAt: new Date() }
        }
        return achievement
      })
      
      const newLevel = Math.floor(newXP / 100) + 1
      
      return {
        ...state,
        discoveries: newDiscoveries,
        achievements: updatedAchievements,
        totalXP: newXP,
        level: newLevel,
      }
    }
    
    case 'UNLOCK_ACHIEVEMENT': {
      const updatedAchievements = state.achievements.map(achievement =>
        achievement.id === action.payload
          ? { ...achievement, earned: true, earnedAt: new Date() }
          : achievement
      )
      return {
        ...state,
        achievements: updatedAchievements,
        totalXP: state.totalXP + 50,
      }
    }
    
    case 'START_ADVENTURE':
      return {
        ...state,
        currentAdventure: action.payload,
      }
    
    case 'COMPLETE_ADVENTURE':
      return {
        ...state,
        currentAdventure: null,
        totalXP: state.totalXP + 25,
      }
    
    case 'UNLOCK_CHARACTER':
      return {
        ...state,
        unlockedCharacters: [...state.unlockedCharacters, action.payload],
      }
    
    case 'ADD_XP': {
      const newXP = state.totalXP + action.payload
      const newLevel = Math.floor(newXP / 100) + 1
      return {
        ...state,
        totalXP: newXP,
        level: newLevel,
      }
    }
    
    case 'LOAD_STATE':
      return action.payload
    
    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
  addDiscovery: (discovery: Omit<Discovery, 'timestamp'>) => void
  unlockAchievement: (id: string) => void
  startAdventure: (adventure: string) => void
  completeAdventure: () => void
  unlockCharacter: (character: string) => void
  addXP: (amount: number) => void
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('chronokids-game-state')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        dispatch({ type: 'LOAD_STATE', payload: parsed })
      } catch (error) {
        console.error('Failed to load game state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chronokids-game-state', JSON.stringify(state))
  }, [state])

  const addDiscovery = (discovery: Omit<Discovery, 'timestamp'>) => {
    dispatch({ type: 'ADD_DISCOVERY', payload: { ...discovery, timestamp: new Date() } })
  }

  const unlockAchievement = (id: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: id })
  }

  const startAdventure = (adventure: string) => {
    dispatch({ type: 'START_ADVENTURE', payload: adventure })
  }

  const completeAdventure = () => {
    dispatch({ type: 'COMPLETE_ADVENTURE' })
  }

  const unlockCharacter = (character: string) => {
    dispatch({ type: 'UNLOCK_CHARACTER', payload: character })
  }

  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', payload: amount })
  }

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      addDiscovery,
      unlockAchievement,
      startAdventure,
      completeAdventure,
      unlockCharacter,
      addXP,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
