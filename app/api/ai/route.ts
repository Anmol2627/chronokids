import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userInput, type, character, userMessage, conversationHistory, scenario } = body

    if (!userInput || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: userInput and type' },
        { status: 400 }
      )
    }

    // Check if AI service is available
    if (!aiService.isAvailable()) {
      return NextResponse.json(
        { 
          error: 'AI service not available. Please configure API key.',
          fallbackUsed: true 
        },
        { status: 503 }
      )
    }

    let response

    switch (type) {
      case 'scenario':
        response = await aiService.generateScenario(userInput)
        break
      case 'dialogue':
        if (!character || !userMessage) {
          return NextResponse.json(
            { error: 'Missing required fields for dialogue: character and userMessage' },
            { status: 400 }
          )
        }
        response = await aiService.generateDialogue(character, userMessage, conversationHistory)
        break
      case 'environment':
        if (!scenario) {
          return NextResponse.json(
            { error: 'Missing required field for environment: scenario' },
            { status: 400 }
          )
        }
        response = await aiService.generateEnvironment(scenario)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        )
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        fallbackUsed: true 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'AI Service API',
    available: aiService.isAvailable(),
    endpoints: {
      'POST /api/ai': {
        description: 'Generate AI content',
        types: ['scenario', 'dialogue', 'environment']
      }
    }
  })
}
