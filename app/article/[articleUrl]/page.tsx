import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { articlesData } from '@/data/articles'
import ShareButtons from '@/components/ShareButtons'
import Markdown from 'react-markdown'
import LemmyLink from '@/components/LemmyLink'
import BuyMeACoffee from '@/components/BuyMeACoffee'
import SocialLinks from '@/components/SocialLinks'
import MostRecentArticles from '@/components/MostRecentArticles'
import EarlierArticles from '@/components/EarlierArticles'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: {params: Promise<{articleUrl: string}>}) {
  const { articleUrl } = await params
  const article = articlesData.find(a => a.articleUrl === articleUrl)
  
  if (!article) {
    return {}
  }

  return {
    title: article.header,
    description: article.subhead,
    openGraph: {
      title: article.header,
      description: article.subhead,
      images: [article.img],
      url: `https://isglitch.com/article/${article.articleUrl}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: article.header,
      description: article.subhead,
      images: [article.img],
      creator: '@EtAl19820625'
    },
    alternates: {
      canonical: `https://isglitch.com/article/${article.articleUrl}`
    }
  }
}

export default async function ArticlePage({ params }: {params: Promise<{articleUrl: string}>}) {
  const { articleUrl } = await params
  const article = articlesData.find(a => a.articleUrl === articleUrl)
  
  if (!article) {
    notFound()
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="w-full mb-8">
        <div className="relative w-full aspect-[16/9]">
          <Image 
            src={article.img}
            alt={article.alt}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
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
          href={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-block text-black dark:text-white hover:text-white dark:hover:text-black bg-gray-200 dark:bg-gray-700 hover:bg-purple-600 dark:hover:bg-green-400 rounded-full px-3 py-1 text-sm mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {article.author}
        </Link>
        <span>•</span>
        <time dateTime={article.datePublished.toISOString()}>
          {new Date(article.datePublished).toLocaleDateString()}
        </time>
      </div>
      <ShareButtons articleUrl={article.articleUrl} title={article.header} />
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <article className="prose dark:prose-invert max-w-none">
            <Markdown>
              {Array.isArray(article.articleBody) 
                ? article.articleBody.join('\n\n')
                : article.articleBody}
            </Markdown>
          </article>
          <div className="flex gap-4 mb-8">
            <LemmyLink />
            <BuyMeACoffee />
          </div>
          <SocialLinks />
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

export function generateStaticParams() {
  return articlesData.map((article) => ({
    articleUrl: article.articleUrl,
  }))
}