import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster.tsx'

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}
