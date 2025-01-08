'use client'

import { useState } from 'react'
import { Copy, Facebook } from 'lucide-react'

interface ShareButtonsProps {
  articleUrl: string
  title: string
  imageUrl: string
}

export default function ShareButtons({ articleUrl, title, imageUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://isglitch.com/article/${articleUrl}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    window.open(fbUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Copy link"
      >
        <Copy className="w-4 h-4" />
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>

      <button
        onClick={shareToFacebook}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
        <span>Share</span>
      </button>
    </div>
  )
}