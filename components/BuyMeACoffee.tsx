'use client'

import { useContext } from 'react'
import Image from 'next/image'
import ThemeContext from '@/lib/theme/ThemeContext'

const BuyMeACoffee = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <a
      href="https://buymeacoffee.com/isglitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-6 mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Image
        src={isDarkMode ? "/buyMeACoffeeDark.svg" : "/buyMeACoffee.svg"}
        alt="Buy Me a Coffee"
        width={48}
        height={48}
        className="w-12 h-12"
      />
      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Support isGlitch.com and buy me a coffee!
      </p>
    </a>
  )
}

export default BuyMeACoffee