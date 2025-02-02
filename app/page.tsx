import type { Metadata } from 'next'
import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `isGlitch.com - Where satire meets silicon`,
  description: `The online-est of tech rags. Where satire meets silicon and the truth isn't binary.`,
  openGraph: {
    title: `isGlitch.com - Where satire meets silicon`,
    description: `The online-est of tech rags. Where satire meets silicon and the truth isn't binary.`,
    url: `https://isglitch.com`,
    type: 'website'
  }
 }

export default async function HomePage() {
    const page = 1
    const { articles, totalPages } = await fetchArticles(page, "home" );
    return (
        <div>
            <Pagination 
              currentPage={page} 
              totalPages={totalPages}
              basePath="/home"
            />
            <Title />
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={page} 
              totalPages={totalPages}
              basePath="/home"
            />
        </div>
    )
}