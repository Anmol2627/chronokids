#!/bin/bash

# ChronoKids AI Setup Script
# This script helps configure the OpenAI API key

echo "=== ChronoKids AI Setup ==="
echo ""

# Create .env.local file with the API key
cat > .env.local << EOF
# AI Configuration for ChronoKids
# OpenAI API Key for dynamic content generation
OPENAI_API_KEY="your_openai_api_key_here"

# Alternative AI providers (optional)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# GOOGLE_AI_API_KEY=your_google_ai_api_key_here
EOF

echo "API key configured successfully!"
echo ""
echo "Next steps:"
echo "1. Restart your development server: npm run dev"
echo "2. Try the AI features by typing a historical request"
echo "3. Example: 'take me to India's independence'"
echo ""
echo "Your ChronoKids app now has AI-powered dynamic content generation!"
