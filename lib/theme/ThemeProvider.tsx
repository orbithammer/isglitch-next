'use client'

import { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

export default function ThemeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get initial system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)
    setIsLoaded(true)

    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      // Update document classes when dark mode changes
      document.documentElement.classList.toggle('dark', isDarkMode)
    }
  }, [isDarkMode, isLoaded])

  // Prevent flash of wrong theme
  if (!isLoaded) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}