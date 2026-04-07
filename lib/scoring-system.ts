// Scoring System for ChronoKids
// Tracks player progress and calculates points for learning activities

export interface PlayerProgress {
  playerName: string
  totalPoints: number
  adventuresCompleted: string[]
  charactersMet: string[]
  discoveriesUnlocked: string[]
  chaptersCompleted: number
  lastUpdated: string
}

export interface ScoringEvent {
  type: 'adventure' | 'character' | 'discovery' | 'chapter'
  points: number
  description: string
  timestamp: string
}

export class ScoringSystem {
  private static readonly STORAGE_KEY = 'chronoKidsProgress'
  
  // Scoring constants
  private static readonly POINTS = {
    ADVENTURE_COMPLETED: 50,
    CHARACTER_MET: 20,
    DISCOVERY_UNLOCKED: 10,
    CHAPTER_COMPLETED: 30
  }

  // Get player progress from localStorage
  static getPlayerProgress(playerName: string): PlayerProgress {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) {
        return this.createDefaultProgress(playerName)
      }

      const allProgress = JSON.parse(stored)
      return allProgress[playerName] || this.createDefaultProgress(playerName)
    } catch (error) {
      console.error('Error getting player progress:', error)
      return this.createDefaultProgress(playerName)
    }
  }

  // Create default progress for new player
  static createDefaultProgress(playerName: string): PlayerProgress {
    return {
      playerName,
      totalPoints: 0,
      adventuresCompleted: [],
      charactersMet: [],
      discoveriesUnlocked: [],
      chaptersCompleted: 0,
      lastUpdated: new Date().toISOString()
    }
  }

  // Save player progress to localStorage
  static savePlayerProgress(progress: PlayerProgress): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      const allProgress = stored ? JSON.parse(stored) : {}
      
      allProgress[progress.playerName] = {
        ...progress,
        lastUpdated: new Date().toISOString()
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress))
    } catch (error) {
      console.error('Error saving player progress:', error)
    }
  }

  // Add points for completing an adventure
  static completeAdventure(playerName: string, adventureTitle: string): PlayerProgress {
    const progress = this.getPlayerProgress(playerName)
    
    if (!progress.adventuresCompleted.includes(adventureTitle)) {
      progress.totalPoints += this.POINTS.ADVENTURE_COMPLETED
      progress.adventuresCompleted.push(adventureTitle)
      progress.chaptersCompleted += 1
      progress.lastUpdated = new Date().toISOString()
      
      this.savePlayerProgress(progress)
    }
    
    return progress
  }

  // Add points for meeting a character
  static meetCharacter(playerName: string, characterName: string): PlayerProgress {
    const progress = this.getPlayerProgress(playerName)
    
    if (!progress.charactersMet.includes(characterName)) {
      progress.totalPoints += this.POINTS.CHARACTER_MET
      progress.charactersMet.push(characterName)
      progress.lastUpdated = new Date().toISOString()
      
      this.savePlayerProgress(progress)
    }
    
    return progress
  }

  // Add points for unlocking a discovery
  static unlockDiscovery(playerName: string, discoveryName: string): PlayerProgress {
    const progress = this.getPlayerProgress(playerName)
    
    if (!progress.discoveriesUnlocked.includes(discoveryName)) {
      progress.totalPoints += this.POINTS.DISCOVERY_UNLOCKED
      progress.discoveriesUnlocked.push(discoveryName)
      progress.lastUpdated = new Date().toISOString()
      
      this.savePlayerProgress(progress)
    }
    
    return progress
  }

  // Add points for completing a chapter
  static completeChapter(playerName: string, chapterTitle: string): PlayerProgress {
    const progress = this.getPlayerProgress(playerName)
    
    progress.totalPoints += this.POINTS.CHAPTER_COMPLETED
    progress.chaptersCompleted += 1
    progress.lastUpdated = new Date().toISOString()
    
    this.savePlayerProgress(progress)
    
    return progress
  }

  // Get scoring history for debugging
  static getScoringHistory(playerName: string): ScoringEvent[] {
    try {
      const historyKey = `${this.STORAGE_KEY}_${playerName}_history`
      const stored = localStorage.getItem(historyKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error getting scoring history:', error)
      return []
    }
  }

  // Add scoring event to history
  static addScoringEvent(playerName: string, event: ScoringEvent): void {
    try {
      const historyKey = `${this.STORAGE_KEY}_${playerName}_history`
      const history = this.getScoringHistory(playerName)
      history.push(event)
      
      // Keep only last 50 events
      if (history.length > 50) {
        history.splice(0, history.length - 50)
      }
      
      localStorage.setItem(historyKey, JSON.stringify(history))
    } catch (error) {
      console.error('Error adding scoring event:', error)
    }
  }

  // Get player statistics
  static getPlayerStats(playerName: string) {
    const progress = this.getPlayerProgress(playerName)
    const history = this.getScoringHistory(playerName)
    
    return {
      totalPoints: progress.totalPoints,
      adventuresCompleted: progress.adventuresCompleted.length,
      charactersMet: progress.charactersMet.length,
      discoveriesUnlocked: progress.discoveriesUnlocked.length,
      chaptersCompleted: progress.chaptersCompleted,
      lastUpdated: progress.lastUpdated,
      recentEvents: history.slice(-5)
    }
  }

  // Reset player progress (for testing)
  static resetPlayerProgress(playerName: string): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      const allProgress = stored ? JSON.parse(stored) : {}
      
      delete allProgress[playerName]
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress))
      
      // Also clear history
      const historyKey = `${this.STORAGE_KEY}_${playerName}_history`
      localStorage.removeItem(historyKey)
    } catch (error) {
      console.error('Error resetting player progress:', error)
    }
  }
}

export default ScoringSystem
