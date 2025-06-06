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
      className="flex flex-col text-center md:text-left md:flex-row items-center justify-center gap-4 p-6 mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative w-12 h-12">
        <Image
          src={isDarkMode ? "/buyMeACoffeeDark.svg" : "/buyMeACoffee.svg"}
          alt="Buy Me a Coffee"
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
      <p className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-green-400">
        Support isGlitch.com and buy me a coffee
      </p>
    </a>
  )
}

export default BuyMeACoffee