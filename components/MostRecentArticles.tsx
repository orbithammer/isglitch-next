'use client'

import Image from 'next/image'
import Link from 'next/link'
import { articlesData } from '@/data/articles'

interface MostRecentArticlesProps {
  currentArticleUrl?: string
}

export default function MostRecentArticles({ currentArticleUrl }: MostRecentArticlesProps) {
  const recentArticles = articlesData
    .filter(article => article.articleUrl !== currentArticleUrl)
    .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime())
    .slice(0, 5)

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Most Recent Articles
      </h3>
      <ul className="space-y-6">
        {recentArticles.map((article) => (
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
                <span className="text-base font-medium transition-colors group-hover:text-purple-600 dark:group-hover:text-green-400">
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