'use client'

import { ToastProvider } from '@/components/achievement-toast'
import { PortalPage } from './portal-page'

export default function Portal() {
  return (
    <ToastProvider>
      <PortalPage />
    </ToastProvider>
  )
}
