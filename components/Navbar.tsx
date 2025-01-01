'use client'

import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-purple-600 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>

          {/* Navigation Links */}
          <div className="mt-12 flex flex-col space-y-6">
            <Link href="/" className="text-white text-xl hover:text-gray-200">
              Home
            </Link>
            <Link href="/tech/1" className="text-green-400 text-xl hover:text-green-300">
              Tech
            </Link>
            <Link href="/reviews/1" className="text-white text-xl hover:text-gray-200">
              Reviews
            </Link>
            <Link href="/entertainment/1" className="text-white text-xl hover:text-gray-200">
              Entertainment
            </Link>
            <Link href="/ai/1" className="text-white text-xl hover:text-gray-200">
              AI
            </Link>
            <Link href="/search/1" className="text-white text-xl hover:text-gray-200">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="p-4 flex justify-end">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-sm font-medium hover:text-gray-600"
        >
          Menu +
        </button>
      </nav>
      
      <Sidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  )
}