'use client'

import React from 'react'
import ThemeContext from './ThemeContext'
import { useTheme } from './useTheme'

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { isDarkMode, setIsDarkMode, mounted } = useTheme()

  // Prevent flash of wrong theme
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider