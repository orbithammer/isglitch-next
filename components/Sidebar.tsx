'use client'

import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp, Sun, Moon, X, Rss, Cookie } from 'lucide-react'
import type { SidebarProps } from './types'
import { getCategoryTags } from '@/lib/fetchArticles'
import type { CategoryTags } from '@/lib/fetchArticles'
import ThemeContext from '@/lib/theme/ThemeContext'

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [categoryTags, setCategoryTags] = useState<CategoryTags>({})
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)
  const pathname = usePathname()

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getCategoryTags()
      setCategoryTags(tags)
    }
    fetchTags()
  }, [])

  const handleDropdownToggle = (e: React.MouseEvent, category: string) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdown(openDropdown === category ? null : category)
  }

  const getNavLinkPath = (item: string) => {
    return `/${item.toLowerCase()}/1`
  }

  const handleCookiePreferences = () => {
    localStorage.removeItem('cookieConsent')
    window.location.reload()
  }

  return (
    <div className={`fixed top-0 right-0 w-[21.5rem] h-screen bg-purple-700 transform transition-transform duration-100 ease-out ${
      isOpen ? 'translate-x-0' : 'translate-x-[23rem]'
    } z-20 flex flex-col`}
      onClick={toggleSidebar}
    >
      {/* Wrapper to handle safe areas and padding */}
      <div className="flex flex-col h-full px-5 pt-5 pb-[calc(env(safe-area-inset-bottom,_0px)_+_1.25rem)]">
        {/* Top section with theme toggle and close button */}
        <div className="flex items-start justify-start mb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="relative flex items-center justify-center w-16 h-8 rounded-full cursor-pointer bg-background-dark dark:bg-background-light"
            onClick={(e) => {
              e.stopPropagation()
              setIsDarkMode(!isDarkMode)
            }}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <div 
              className={`absolute w-6 h-6 rounded-full shadow-md transition-all duration-200 ${
                isDarkMode ? 'translate-x-4 bg-background-dark' : '-translate-x-4 bg-background-light'
              }`} 
            />
            <div className={`absolute w-4 h-4 flex items-center justify-center transition-all duration-200 ${
              isDarkMode ? '-translate-x-4' : 'translate-x-4'
            }`}>
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-foreground-light" />
              ) : (
                <Moon className="w-4 h-4 text-foreground-dark" />
              )}
            </div>
          </button>

          <button 
            className="h-8 w-8 bg-purple-700 border-0 ml-auto mr-4 text-white hover:text-lime-400 transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        {/* Main navigation - with flex-grow to push bottom content down */}
        <nav onClick={(e) => e.stopPropagation()} className="flex-grow overflow-y-auto">
          <ul className="list-none p-0">
            {['Home', 'Tech', 'Reviews', 'Entertainment', 'AI'].map((item) => {
              const path = getNavLinkPath(item)
              const isActive = pathname === path
              const category = item.toLowerCase()
              
              return (
                <li key={item} className="mb-4">
                  <Link
                    href={path}
                    className={`text-3xl flex items-center justify-between text-white hover:text-lime-400 transition-colors duration-200 no-underline ${
                      isActive ? 'text-lime-400 font-bold' : ''
                    }`}
                    onClick={toggleSidebar}
                  >
                    <div className="flex items-center justify-between w-full">
                      {item}
                      <button
                        onClick={(e) => handleDropdownToggle(e, category)}
                        className="ml-2 cursor-pointer"
                      >
                        {openDropdown === category ? 
                          <ChevronUp size={24} /> : 
                          <ChevronDown size={24} />
                        }
                      </button>
                    </div>
                  </Link>

                  <ul className={`list-none pl-4 mt-2 overflow-hidden transition-all duration-300 ${
                    openDropdown === category 
                      ? 'max-h-[500px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}>
                    {categoryTags[category]?.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/search/${tag}/1`}
                          className="text-white hover:text-lime-400 no-underline text-lg block py-1"
                          onClick={toggleSidebar}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
            
            <li>
              <Link
                href="/contact"
                className={`text-3xl text-white hover:text-lime-400 transition-colors duration-200 no-underline ${
                  pathname === '/contact' ? 'text-lime-400 font-bold' : ''
                }`}
                onClick={toggleSidebar}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href="https://www.etsy.com/shop/isGlitch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-white hover:text-lime-400 transition-colors duration-200 no-underline block mt-6"
                onClick={toggleSidebar}
              >
                Merch (Etsy)
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom buttons for RSS and Cookie Settings - now with safe area inset */}
        <div className="mt-4 pt-4 border-t border-purple-600">
          <div className="flex justify-between items-center">
            <a
              href="/feed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-lime-400 transition-colors duration-200"
              title="RSS Feed"
              onClick={(e) => e.stopPropagation()}
            >
              <Rss className="w-6 h-6" />
            </a>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleCookiePreferences()
              }}
              className="text-white hover:text-lime-400 transition-colors duration-200"
              title="Cookie Settings"
            >
              <Cookie className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar