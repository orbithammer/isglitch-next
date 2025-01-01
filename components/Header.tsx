'use client'

import { useState, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, ChevronUp } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isDarkMode = true
  const pathname = usePathname()
  
  const segments = pathname.split("/")
  const pathNameFirstSegment = segments[1]
  const pathNameUnformatted = pathNameFirstSegment === "search" 
    ? segments[2] 
    : pathNameFirstSegment === "thank-you" 
      ? "" 
      : pathNameFirstSegment
      
  const pageNameInitial = pathNameUnformatted === "ai" 
    ? "AI" 
    : decodeURIComponent(pathNameUnformatted)?.charAt(0).toUpperCase() + 
      decodeURIComponent(pathNameUnformatted)?.slice(1)
      
  const hasOnlyNumber = /^\d+$/.test(pageNameInitial)
  const pageName = hasOnlyNumber ? "" : pageNameInitial

  const toggleSidebar = () => {
    setTimeout(() => {
      setIsOpen(!isOpen)
    }, 200)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className={`flex items-center justify-between px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <p className="text-2xl">{pageName}</p>
      
      <button 
        className={`flex items-center bg-transparent border-0 text-base ${
          isDarkMode 
            ? 'border-white text-white' 
            : 'border-gray-900 text-gray-900'
        }`}
        onClick={toggleSidebar}
      >
        Menu
        <Menu className="w-4 h-4 ml-2" />
      </button>

      {!isOpen && (
        <button 
          className={`fixed bottom-16 right-8 border-0 rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer z-50 ${
            isDarkMode 
              ? 'bg-white/50' 
              : 'bg-black/50'
          } lg:right-[calc((100vw-64rem)/2)]`}
          onClick={scrollToTop}
        >
          <ChevronUp className="w-full h-full" />
        </button>
      )}
      
      {/* Sidebar component would go here */}
    </header>
  )
}

export default Header