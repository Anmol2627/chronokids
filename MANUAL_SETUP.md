# Manual API Key Setup Instructions

## Quick Setup for ChronoKids AI

Since the automated script might not work, here's how to manually configure your API key:

### Step 1: Create the .env.local file
1. In your project root (`c:\Users\HP\Desktop\hackhrcc\`), create a new file named `.env.local`
2. Add the following content to the file:

```
# AI Configuration for ChronoKids
# OpenAI API Key for dynamic content generation
OPENAI_API_KEY="your_openai_api_key_here"

# Alternative AI providers (optional)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

### Step 2: Restart the Development Server
1. Stop the current server (Ctrl+C in the terminal)
2. Run: `npm run dev`

### Step 3: Test AI Features
1. Go to http://localhost:3000/portal
2. Type a historical request like:
   - "take me to India's independence"
   - "I want to meet Leonardo da Vinci"
   - "Show me ancient Egypt"
3. Click "Start Adventure" and see the AI generate content!

## What to Expect

### Without API Key:
- App works with predefined scenarios
- Fallback content available
- Limited to preset characters

### With API Key:
- Dynamic content generation
- AI-powered dialogue
- Unlimited historical scenarios
- Personalized learning experiences

## Troubleshooting

If you see "AI service not available" error:
1. Check that `.env.local` exists in the project root
2. Verify the API key is correctly copied
3. Restart the development server
4. Check browser console for errors

The AI integration will transform ChronoKids into a dynamic educational platform that can generate unlimited historical content!

## Vercel Deployment

Add these environment variables in Vercel Project Settings before deploying:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Notes:
- `OPENAI_API_KEY` must stay server-side only. Do not use `NEXT_PUBLIC_OPENAI_API_KEY`.
- The Supabase URL and anon key are safe to expose publicly and are meant for client-side use.
- If you do not set `OPENAI_API_KEY`, the app will still deploy, but AI-powered routes will return fallback behavior.
