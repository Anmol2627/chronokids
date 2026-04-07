# ChronoKids AI Setup Script for Windows
# This script configures the OpenAI API key for AI functionality

Write-Host "=== ChronoKids AI Setup ===" -ForegroundColor Green
Write-Host ""

# Create .env.local file with the API key
$envContent = @"
# AI Configuration for ChronoKids
# OpenAI API Key for dynamic content generation
NEXT_PUBLIC_OPENAI_API_KEY=

# Alternative AI providers (optional)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# GOOGLE_AI_API_KEY=your_google_ai_api_key_here
"@

# Write the content to .env.local
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "API key configured successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your development server: npm run dev"
Write-Host "2. Try the AI features by typing a historical request"
Write-Host "3. Example: 'take me to India's independence'"
Write-Host ""
Write-Host "Your ChronoKids app now has AI-powered dynamic content generation!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
