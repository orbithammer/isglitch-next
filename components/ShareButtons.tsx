'use client'

import { useState } from 'react'
import { Link2, Facebook, Twitter } from 'lucide-react'

interface ShareButtonsProps {
  articleUrl: string
  title: string
}

export default function ShareButtons({ articleUrl, title }: ShareButtonsProps) {
  const [showCopied, setShowCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 my-6">
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-green-400 transition-colors relative"
        aria-label="Copy link"
      >
        <Link2 className="w-5 h-5" />
        {showCopied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded">
            Copied!
          </span>
        )}
      </button>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`${title} | #isGlitch #tech`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-green-400 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={`https://twitter.com/share?text=${encodeURIComponent(`${title} | #isGlitch #tech`)}&url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-green-400 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
    </div>
  )
}