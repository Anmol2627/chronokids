import type { Metadata } from 'next'
import { Nunito, Fredoka } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ErrorBoundary } from '@/components/error-boundary'
import { GameProvider } from '@/lib/game-state'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap',
})

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ChronoKids - Travel Through Time, Make Friends with History!',
  description: 'A magical AI learning platform where kids travel through time, meet historical figures, and build their knowledge map through exciting adventures.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="font-sans antialiased bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#0f766e] text-[#f0f0ff] min-h-screen overflow-x-hidden">
        <ErrorBoundary>
          <GameProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
