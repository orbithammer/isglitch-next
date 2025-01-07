import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchAuthorInfo } from '@/lib/fetchAuthorInfo'
import { authors } from '@/data/authors'
import { articlesData } from '@/data/articles'
import ArticleList from '@/components/ArticleList'
import Markdown from 'react-markdown'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: {params: Promise<{author: string}>}) {
  const { author } = await params
  const authorInfo = await fetchAuthorInfo(author)
  
  return {
    title: `${authorInfo.name} - isGlitch.com`,
    description: authorInfo.bio[0],
    openGraph: {
      title: `${authorInfo.name} - isGlitch.com`,
      description: authorInfo.bio[0],
      images: [authorInfo.image],
      url: `https://isglitch.com/author/${author}`,
      type: 'profile'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${authorInfo.name} - isGlitch.com`,
      description: authorInfo.bio[0],
      images: [authorInfo.image],
      creator: '@EtAl19820625'
    },
    alternates: {
      canonical: `https://isglitch.com/author/${author}`
    }
  }
}

export default async function AuthorPage({ params }: {params: Promise<{author: string}>}) {
  try {
    const { author } = await params
    const authorInfo = await fetchAuthorInfo(author)
    const authorArticles = articlesData.filter(article => 
      article.author.toLowerCase() === authorInfo.name.toLowerCase()
    )

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12 mx-[5%] sm:mx-[20%] max-w-6xl">
          <div className="relative md:float-left md:mr-8 mb-4 w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={authorInfo.image}
              alt={authorInfo.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{authorInfo.name}</h1>
            <div className="prose dark:prose-invert">
              {authorInfo.bio.map((paragraph, index) => (
                <Markdown key={index}>{paragraph}</Markdown>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Articles by {authorInfo.name}</h2>
        <ArticleList articles={authorArticles
          .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
          .slice(0, 10)
        } />
      </main>
    )
  } catch {
    notFound()
  }
}

export function generateStaticParams() {
  return authors.map((author) => ({
    author: author.id,
  }))
}