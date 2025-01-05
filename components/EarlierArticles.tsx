'use client'

import { useContext, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { articlesData } from '@/data/articles'
import ThemeContext from '@/lib/theme/ThemeContext'

interface EarlierArticlesProps {
  currentArticleUrl?: string
  recentArticleUrls: string[]
}

export default function EarlierArticles({ currentArticleUrl, recentArticleUrls }: EarlierArticlesProps) {
  const { isDarkMode } = useContext(ThemeContext)

  const earlierArticles = useMemo(() => {
    const filteredArticles = articlesData
      .filter(article => 
        article.articleUrl !== currentArticleUrl && 
        !recentArticleUrls.includes(article.articleUrl)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)

    return filteredArticles
  }, [currentArticleUrl, recentArticleUrls])

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md mt-8 lg:mt-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Earlier Articles
      </h3>
      <ul className="space-y-6">
        {earlierArticles.map((article) => (
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