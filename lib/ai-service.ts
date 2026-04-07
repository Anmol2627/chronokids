import 'server-only'

// AI Service for Dynamic Historical Content Generation
// This service handles AI-powered content creation for ChronoKids

export interface HistoricalCharacter {
  id: string
  name: string
  role: string
  era: string
  location: string
  personality: string
  appearance: {
    emoji: string
    description: string
    colors: string[]
  }
  backstory: string
  dialogueStyle: string
}

export interface HistoricalScenario {
  id: string
  title: string
  description: string
  timePeriod: string
  location: string
  mainCharacter: HistoricalCharacter
  supportingCharacters: HistoricalCharacter[]
  environment: {
    setting: string
    atmosphere: string
    keyObjects: string[]
    sounds: string[]
  }
  learningObjectives: string[]
  keyEvents: string[]
}

export interface AIRequest {
  userInput: string
  context: 'adventure_creation' | 'character_dialogue' | 'environment_generation'
  currentScenario?: HistoricalScenario
  character?: HistoricalCharacter
}

export interface AIResponse {
  success: boolean
  data?: HistoricalScenario | HistoricalCharacter | string
  error?: string
  fallbackUsed?: boolean
}

class AIService {
  private apiKey: string | null = null
  private baseUrl: string = 'https://api.openai.com/v1'
  private model: string = 'gpt-4-turbo-preview'
  private maxRetries: number = 3

  constructor() {
    // Keep the API key server-side only for Vercel and Next.js deployments.
    this.apiKey = process.env.OPENAI_API_KEY || null
    this.model = process.env.OPENAI_MODEL || this.model
  }

  /**
   * Generate a complete historical scenario based on user input
   */
  async generateScenario(userInput: string): Promise<AIResponse> {
    try {
      const prompt = this.buildScenarioPrompt(userInput)
      const response = await this.callAI(prompt, 'scenario_generation')
      
      if (response.success && response.data) {
        return {
          success: true,
          data: this.parseScenarioResponse(response.data as string)
        }
      }
      
      return this.getFallbackScenario(userInput)
    } catch (error) {
      console.error('AI Service Error:', error)
      return this.getFallbackScenario(userInput)
    }
  }

  /**
   * Generate character dialogue based on context
   */
  async generateDialogue(
    character: HistoricalCharacter, 
    userMessage: string, 
    conversationHistory: string[] = []
  ): Promise<AIResponse> {
    try {
      const prompt = this.buildDialoguePrompt(character, userMessage, conversationHistory)
      const response = await this.callAI(prompt, 'dialogue_generation')
      
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data as string
        }
      }
      
      return this.getFallbackDialogue(character, userMessage)
    } catch (error) {
      console.error('AI Dialogue Error:', error)
      return this.getFallbackDialogue(character, userMessage)
    }
  }

  /**
   * Generate environment description for historical period
   */
  async generateEnvironment(scenario: HistoricalScenario): Promise<AIResponse> {
    try {
      const prompt = this.buildEnvironmentPrompt(scenario)
      const response = await this.callAI(prompt, 'environment_generation')
      
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data as string
        }
      }
      
      return this.getFallbackEnvironment(scenario)
    } catch (error) {
      console.error('AI Environment Error:', error)
      return this.getFallbackEnvironment(scenario)
    }
  }

  /**
   * Build prompt for scenario generation
   */
  private buildScenarioPrompt(userInput: string): string {
    return `
You are an expert historian and educator creating engaging historical content for children (ages 8-12). 
Based on the user's request: "${userInput}"

Generate a complete historical scenario with the following JSON structure:
{
  "title": "Catchy title for the adventure",
  "description": "Brief, exciting description",
  "timePeriod": "Year or era",
  "location": "Geographic location",
  "mainCharacter": {
    "name": "Historical figure name",
    "role": "Their role/job",
    "era": "Time period they lived in",
    "location": "Where they are",
    "personality": "3-4 personality traits",
    "appearance": {
      "emoji": "Single emoji representing them",
      "description": "Visual description",
      "colors": ["#color1", "#color2"]
    },
    "backstory": "Brief, child-friendly backstory",
    "dialogueStyle": "How they speak (formal, friendly, etc.)"
  },
  "supportingCharacters": [
    {
      "name": "Supporting character name",
      "role": "Their role",
      "personality": "2-3 traits",
      "appearance": {"emoji": "emoji", "description": "description"}
    }
  ],
  "environment": {
    "setting": "Detailed setting description",
    "atmosphere": "Mood and feeling",
    "keyObjects": ["object1", "object2"],
    "sounds": ["sound1", "sound2"]
  },
  "learningObjectives": ["objective1", "objective2"],
  "keyEvents": ["event1", "event2"]
}

Requirements:
- Must be historically accurate but child-friendly
- Focus on educational value and engagement
- Include diverse historical periods and cultures
- Content must be appropriate for ages 8-12
- Avoid violence, focusing on positive historical contributions
`
  }

  /**
   * Build prompt for character dialogue
   */
  private buildDialoguePrompt(
    character: HistoricalCharacter, 
    userMessage: string, 
    conversationHistory: string[]
  ): string {
    const history = conversationHistory.join('\n')
    return `
You are ${character.name}, ${character.backstory}
Personality: ${character.personality}
Speaking style: ${character.dialogueStyle}

Conversation history:
${history}

User message: "${userMessage}"

Respond as ${character.name} in a way that is:
- Educational and engaging for children (ages 8-12)
- Historically accurate but accessible
- In character with your personality and speaking style
- Encourages curiosity and learning
- 2-3 sentences maximum

Your response:
`
  }

  /**
   * Build prompt for environment generation
   */
  private buildEnvironmentPrompt(scenario: HistoricalScenario): string {
    return `
Create an immersive environment description for children (ages 8-12) based on this historical scenario:

Title: ${scenario.title}
Time Period: ${scenario.timePeriod}
Location: ${scenario.location}
Setting: ${scenario.environment.setting}

Generate a vivid, sensory description that includes:
- Visual details (what children would see)
- Sounds of the era/location
- Textures and materials
- Lighting and atmosphere
- 3-4 key objects that would be present

Keep it engaging, educational, and appropriate for children. Focus on positive, interesting aspects of the historical period.

Description:
`
  }

  /**
   * Call AI API
   */
  private async callAI(prompt: string, type: string): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key not configured')
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert historian and educator creating content for children.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: type === 'scenario_generation' ? 1000 : 200,
          temperature: type === 'scenario_generation' ? 0.7 : 0.8,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data: data.choices[0].message.content
      }
    } catch (error) {
      console.error('AI API Error:', error)
      throw error
    }
  }

  /**
   * Parse AI response into structured scenario
   */
  private parseScenarioResponse(response: string): HistoricalScenario {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsed = JSON.parse(jsonMatch[0])
      return this.validateScenario(parsed)
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      throw error
    }
  }

  /**
   * Validate and sanitize scenario data
   */
  private validateScenario(data: any): HistoricalScenario {
    // Basic validation and sanitization
    return {
      id: `scenario_${Date.now()}`,
      title: data.title || 'Historical Adventure',
      description: data.description || 'Explore the past!',
      timePeriod: data.timePeriod || 'Unknown',
      location: data.location || 'Unknown',
      mainCharacter: this.validateCharacter(data.mainCharacter),
      supportingCharacters: (data.supportingCharacters || []).map(this.validateCharacter),
      environment: {
        setting: data.environment?.setting || 'Historical setting',
        atmosphere: data.environment?.atmosphere || 'Mysterious',
        keyObjects: data.environment?.keyObjects || [],
        sounds: data.environment?.sounds || []
      },
      learningObjectives: data.learningObjectives || [],
      keyEvents: data.keyEvents || []
    }
  }

  /**
   * Validate character data
   */
  private validateCharacter(character: any): HistoricalCharacter {
    return {
      id: `char_${Date.now()}_${Math.random()}`,
      name: character.name || 'Historical Figure',
      role: character.role || 'Unknown',
      era: character.era || 'Unknown',
      location: character.location || 'Unknown',
      personality: character.personality || 'Wise and knowledgeable',
      appearance: {
        emoji: character.appearance?.emoji || '??',
        description: character.appearance?.description || 'Historical figure',
        colors: character.appearance?.colors || ['#f97066', '#fbbf24']
      },
      backstory: character.backstory || 'A figure from history',
      dialogueStyle: character.dialogueStyle || 'Friendly and educational'
    }
  }

  /**
   * Fallback scenarios when AI fails
   */
  private getFallbackScenario(userInput: string): AIResponse {
    const fallbacks = [
      {
        title: "Journey Through Time",
        description: "Explore an amazing moment in history!",
        mainCharacter: {
          name: "Time Traveler",
          role: "Historical Explorer",
          emoji: "??",
          personality: "Curious and adventurous"
        }
      }
    ]

    const fallback = fallbacks[0]
    return {
      success: true,
      fallbackUsed: true,
      data: {
        id: `fallback_${Date.now()}`,
        title: fallback.title,
        description: fallback.description,
        timePeriod: "Historical Era",
        location: "Historical Place",
        mainCharacter: this.validateCharacter(fallback.mainCharacter),
        supportingCharacters: [],
        environment: {
          setting: "A place in history",
          atmosphere: "Educational and exciting",
          keyObjects: [],
          sounds: []
        },
        learningObjectives: ["Learn about history"],
        keyEvents: ["Historical event"]
      }
    }
  }

  /**
   * Fallback dialogue when AI fails
   */
  private getFallbackDialogue(character: HistoricalCharacter, userMessage: string): AIResponse {
    const responses = [
      "That's a fascinating question! Let me tell you more about that time period.",
      "I remember that well! It was an incredible moment in history.",
      "Ah, yes! That's one of the most interesting things about my time.",
      "Wonderful question! History is full of amazing stories like that."
    ]

    return {
      success: true,
      fallbackUsed: true,
      data: responses[Math.floor(Math.random() * responses.length)]
    }
  }

  /**
   * Fallback environment when AI fails
   */
  private getFallbackEnvironment(scenario: HistoricalScenario): AIResponse {
    return {
      success: true,
      fallbackUsed: true,
      data: `You find yourself in ${scenario.location} during ${scenario.timePeriod}. The air is filled with the sounds of daily life from this historical period. You can see important objects and buildings that tell the story of this amazing time in history.`
    }
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return !!this.apiKey
  }
}

export const aiService = new AIService()
