'use client'

import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get initial theme preference
    const getPreferredTheme = () => {
      if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem('theme')
        if (savedTheme) {
          return savedTheme === 'dark'
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return true
    }

    setIsDarkMode(getPreferredTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Store theme preference
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      
      // Update class for Tailwind dark mode
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDarkMode, mounted])

  return { isDarkMode, setIsDarkMode, mounted }
}