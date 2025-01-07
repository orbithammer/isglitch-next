'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, ChevronUp } from 'lucide-react'
import Sidebar from './Sidebar'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  const segments = pathname.split("/")
  const pathNameFirstSegment = segments[1] === "page" ? "" : segments[1]
  const pathNameUnformatted = pathNameFirstSegment === "search" 
    ? segments[2] 
    : pathNameFirstSegment === "thank-you" 
      ? "" 
      : pathNameFirstSegment
      
  const pageName = pathNameUnformatted === "ai" 
    ? "AI" 
    : decodeURIComponent(pathNameUnformatted)?.charAt(0).toUpperCase() + 
      decodeURIComponent(pathNameUnformatted)?.slice(1)

  const toggleSidebar = () => {
    if(isOpen) {
      setTimeout(() => {
        setIsOpen(!isOpen)
      }, 500)
    } else{
      setIsOpen(!isOpen)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark">
        <header className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          <p className="text-2xl font-medium">{pageName}</p>
          
          <button 
            className="flex items-center bg-transparent border-0 text-base text-foreground-light dark:text-foreground-dark hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={toggleSidebar}
          >
            Menu
            <Menu className="w-4 h-4 ml-2" />
          </button>

          {!isOpen && (
            <button 
              className="fixed bottom-8 right-[9.5%] border-0 rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer z-50 bg-gray-800/20 dark:bg-white/20 hover:bg-gray-800/30 dark:hover:bg-white/30 transition-colors"
              onClick={scrollToTop}
            >
              <ChevronUp className="w-8 h-8 text-foreground-light dark:text-foreground-dark" />
            </button>
          )}
        </header>
      </div>

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  )
}

export default Header