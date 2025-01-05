'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { fetchArticle } from '@/lib/fetchArticles'
import { Article as ArticleType } from '@/lib/fetchArticles'
import Markdown from 'react-markdown'
import MostRecentArticles from '@/components/MostRecentArticles'
import EarlierArticles from '@/components/EarlierArticles'
import { articlesData } from '@/data/articles'

export default function Article() {
    const [article, setArticle] = useState<ArticleType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const articleUrl = params?.articleUrl as string

    useEffect(() => {
        const loadArticle = async () => {
            setIsLoading(true)
            const foundArticle = await fetchArticle(articleUrl)
            if (foundArticle) {
                setArticle(foundArticle)
            }
            setIsLoading(false)
        }
        
        if (articleUrl) {
            loadArticle()
        }
    }, [articleUrl])

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    if (!article) {
        return <div className="text-red-500 text-center py-8">Article not found</div>
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="relative w-full h-96 mb-8">
                <Image 
                    src={article.img}
                    alt={article.alt}
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </div>

            <div className="space-y-4 mb-8">
                {article.tags?.map((tag, index) => (
                    <Link 
                        key={index}
                        href={`/search/${tag}/1`}
                        className="inline-block bg-gray-200 dark:bg-gray-700 hover:text-purple-600 dark:hover:text-green-400 rounded-full px-3 py-1 text-sm mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{article.header}</h1>
            <h2 className="text-2xl text-gray-600 dark:text-gray-400 mb-8">{article.subhead}</h2>

            <div className="flex items-center space-x-4 mb-8 text-gray-600 dark:text-gray-400">
                <Link 
                    href={`/author/${article.author.toLowerCase()}`}
                    className="hover:underline"
                >
                    {article.author}
                </Link>
                <span>•</span>
                <time dateTime={article.datePublished.toISOString()}>
                    {new Date(article.datePublished).toLocaleDateString()}
                </time>
            </div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-2">
                    <div className="prose dark:prose-invert max-w-none">
                        <Markdown>
                            {Array.isArray(article.articleBody) 
                                ? article.articleBody.join('\n\n')
                                : article.articleBody}
                        </Markdown>
                    </div>
                </div>

                <div className="mt-12 lg:mt-0">
                    <MostRecentArticles currentArticleUrl={articleUrl} />
                    <EarlierArticles 
                        currentArticleUrl={articleUrl}
                        recentArticleUrls={articlesData
                            .filter(a => a.articleUrl !== articleUrl)
                            .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
                            .slice(0, 5)
                            .map(a => a.articleUrl)
                        }
                    />
                </div>
            </div>
        </main>
    )
}