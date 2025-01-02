import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/fetchArticles'

export default function ArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {articles.map((article, index) => (
                <Link key={article.id} href={`/article/${article.articleUrl}`}>
                    <article className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/50 transition bg-white dark:bg-gray-800">
                        <div className="relative">
                            <Image 
                                src={article.img}
                                alt={article.alt}
                                width={400}
                                height={250}
                                className="w-full h-72 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{article.header}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">{article.subhead}</p>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span>{article.author}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(article.datePublished).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    )
}