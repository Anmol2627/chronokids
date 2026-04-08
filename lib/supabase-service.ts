import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client for development when Supabase is not configured
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Using mock client.')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Leaderboard interfaces
export interface LeaderboardEntry {
  id: string
  name: string
  points: number
  chapters_completed: number
  updated_at: string
}

export interface PlayerScore {
  name: string
  points: number
  chapters_completed: number
}

// Leaderboard service functions
export class LeaderboardService {
  // Update or insert player score
  static async updatePlayerScore(playerScore: PlayerScore): Promise<void> {
    const client = supabase
    if (!client) {
      console.warn('Supabase client not available. Skipping leaderboard update.')
      return
    }

    try {
      const { error } = await client
        .from('leaderboard')
        .upsert({
          name: playerScore.name,
          points: playerScore.points,
          chapters_completed: playerScore.chapters_completed,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'name'
        })

      if (error) {
        console.error('Error updating player score:', error)
        throw error
      }
    } catch (error) {
      console.error('Unexpected error in updatePlayerScore:', error)
      throw error
    }
  }

  // Get top 10 players
  static async getTopPlayers(limit: number = 10): Promise<LeaderboardEntry[]> {
    const client = supabase
    if (!client) {
      console.warn('Supabase client not available. Returning empty leaderboard.')
      return []
    }

    try {
      const { data, error } = await client
        .from('leaderboard')
        .select('*')
        .order('points', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching top players:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Unexpected error in getTopPlayers:', error)
      throw error
    }
  }

  // Get player rank
  static async getPlayerRank(playerName: string): Promise<number> {
    const client = supabase
    if (!client) {
      return -1
    }

    try {
      const { data, error } = await client
        .from('leaderboard')
        .select('name, points')
        .order('points', { ascending: false })

      if (error) {
        console.error('Error getting player rank:', error)
        return -1
      }

      if (!data) return -1

      const playerIndex = data.findIndex(player => player.name === playerName)
      return playerIndex >= 0 ? playerIndex + 1 : -1
    } catch (error) {
      console.error('Unexpected error in getPlayerRank:', error)
      return -1
    }
  }

  // Get player data
  static async getPlayerData(playerName: string): Promise<LeaderboardEntry | null> {
    const client = supabase
    if (!client) {
      return null
    }

    try {
      const { data, error } = await client
        .from('leaderboard')
        .select('*')
        .eq('name', playerName)
        .single()

      if (error) {
        console.error('Error getting player data:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error in getPlayerData:', error)
      return null
    }
  }
}

export default LeaderboardService
