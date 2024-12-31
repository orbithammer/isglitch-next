import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/fetchArticles'

export default function ArticleList({ articles }: { articles: Article[] }) {
    console.log(articles.map(article => article.articleUrl))
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {articles.map(article => (
                <Link key={article.id} href={`/article/${article.articleUrl}`}>
                    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                    <Image 
                        src={article.img}
                        alt={article.alt}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">{article.header}</h2>
                        <p className="text-gray-600 mb-2">{article.subhead}</p>
                        <div className="text-sm text-gray-500">
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