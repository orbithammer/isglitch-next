'use client'

import { createContext } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  setIsDarkMode: () => {}
})

export default ThemeContext