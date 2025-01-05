'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { articlesData } from '@/data/articles'

interface EarlierArticlesProps {
  currentArticleUrl?: string
  recentArticleUrls: string[]
}

export default function EarlierArticles({ currentArticleUrl, recentArticleUrls }: EarlierArticlesProps) {
  const earlierArticles = useMemo(() => {
    return articlesData
      .filter(article => 
        article.articleUrl !== currentArticleUrl && 
        !recentArticleUrls.includes(article.articleUrl)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
  }, [currentArticleUrl, recentArticleUrls])

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md mt-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Earlier Articles
      </h3>
      <ul className="space-y-6">
        {earlierArticles.map((article) => (
          <li key={article.id}>
            <Link 
              href={`/article/${article.articleUrl}`}
              className="flex gap-4 group min-h-24"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image 
                  src={article.img}
                  alt={article.header}
                  className="object-cover rounded-md"
                  sizes="96px"
                  fill
                  priority={false}
                />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <span className="text-base font-medium group-hover:text-purple-600 dark:group-hover:text-green-400 transition-colors">
                  {article.header}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  By {article.author}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}