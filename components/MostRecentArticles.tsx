'use client'

import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { articlesData } from '@/data/articles'
import ThemeContext from '@/lib/theme/ThemeContext'

interface MostRecentArticlesProps {
  currentArticleUrl?: string
}

export default function MostRecentArticles({ currentArticleUrl }: MostRecentArticlesProps) {
  const { isDarkMode } = useContext(ThemeContext)
  
  const recentArticles = articlesData
    .filter(article => article.articleUrl !== currentArticleUrl)
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 5)

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Most Recent Articles
      </h3>
      <ul className="space-y-6">
        {recentArticles.map((article) => (
          <li key={article.id} className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image 
                src={article.img}
                alt={article.header}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Link 
                href={`/article/${article.articleUrl}`}
                className="text-lg font-medium hover:text-purple-600 dark:hover:text-green-400 transition-colors line-clamp-2"
              >
                {article.header}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                By {article.author}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}