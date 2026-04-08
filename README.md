# ChronoKids 

An AI-powered interactive history learning app for kids. Players choose a historical era, meet real historical figures, and explore the past through dynamic conversations and guided adventures - all wrapped in a gamified, kid-friendly interface.

---

## Features

- **Time Portal**- Enter a historical destination in plain language (e.g. *"take me to ancient Egypt"* or *"I want to meet Leonardo da Vinci"*) and the AI generates a custom scenario.
- **AI-Powered Dialogue** - Converse with historical characters using AI-generated responses that stay in character and teach real history.
- **Simulation View** - A three-panel experience with a world viewport (built with Three.js/React Three Fiber), an adventure chat panel, and a live discovery tracker.
- **Adventure Book** - A storybook-style recap of completed adventures with an animated page-flip effect.
- **Knowledge Journal** - A visual knowledge graph that maps everything the player has discovered across sessions.
- **Leaderboard** - A global leaderboard powered by Supabase that ranks top time explorers by score.
- **Scoring System** - Players earn points for discoveries, dialogue interactions, and completed adventures.
- **Achievement Toasts** - In-app pop-up rewards when milestones are hit.
- **Fallback Mode** - A full set of predefined scenarios and characters lets the app run without an API key.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + shadcn/ui |
| Animations | Framer Motion |
| 3D Rendering | Three.js + React Three Fiber |
| AI Backend | Anthropic API (via Next.js API route) |
| Database | Supabase (leaderboard & session data) |
| Charts | Recharts |
| Maps | react-simple-maps |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://platform.claude.com/docs/en/api/admin/api_keys/retrieve)
- A [Supabase](https://supabase.com) project (optional - only needed for the leaderboard)

### Installation

```bash
git clone https://github.com/your-username/chronokids.git
cd chronokids
npm install
```

### Environment Variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
# Required for AI features
Anthropic_API_KEY=your_Anthropic_api_key_here
Anthropic_MODEL=gpt-4-turbo-preview

# Required for leaderboard (optional for local dev)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Keep `Anthropic_API_KEY` server-side only. Never prefix it with `NEXT_PUBLIC_`.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## App Structure

```
app/
├── page.tsx              # Landing page (hero, character showcase, leaderboard, era explorer)
├── portal/               # Time portal - enter a historical destination
├── simulation/           # Main adventure view (chat + world viewport + discoveries)
├── journal/              # Knowledge journal with graph view
└── api/ai/route.ts       # Server-side AI API route

components/
├── adventure-book/       # Animated storybook recap component
├── simulation/           # Adventure panel, discovery panel, world viewport
├── landing/              # Hero, how-it-works, era explorer, CTA sections
├── journal/              # Knowledge graph component
└── ui/                   # shadcn/ui base components

lib/
├── ai-service.ts         # Anthropic integration (scenario, dialogue, environment generation)
├── game-state.ts         # Global game state hook
├── custom-scenarios.ts   # Predefined fallback scenarios
├── scoring-system.ts     # Points and achievement logic
└── supabase-service.ts   # Leaderboard read/write
```

---

## AI API

The AI route at `POST /api/ai` accepts three request types:

| `type` | Required fields | Description |
|---|---|---|
| `scenario` | `userInput` | Generates a full historical scenario from a free-text prompt |
| `dialogue` | `character`, `userMessage`, `conversationHistory` | Generates an in-character reply from a historical figure |
| `environment` | `scenario` | Generates environment/world description for the viewport |

A `GET /api/ai` returns service status and available endpoint docs.

If no API key is configured, all routes return a `503` with `fallbackUsed: true` and the app falls back to its built-in scenarios.

---

## Deployment (Vercel)

https://chronokids-snowy.vercel.app/

```
Anthropic_API_KEY
Anthropic_MODEL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

MIT
