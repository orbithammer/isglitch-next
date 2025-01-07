import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

export const generateMetadata = async ({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> => {
  const { page } = await params
  return {
    title: `Page ${page} - isGlitch.com`,
    description: 'Latest tech news and entertainment with a satirical twist',
    openGraph: {
      title: `Page ${page} - isGlitch.com`,
      description: 'Latest tech news and entertainment with a satirical twist',
      url: `https://isglitch.com/page/${page}`,
      type: 'website'
    }
  }
}

export default async function PaginatedHomePage({ 
  params 
}: { 
  params: Promise<{ page: string }> 
}) {
  const { page } = await params
  const pageNum = parseInt(page)

  // Validate page parameter
  if (isNaN(pageNum) || pageNum < 1 || !Number.isInteger(pageNum)) {
    notFound()
  }

  const category = "home"
  const { articles, totalPages } = await fetchArticles(category, pageNum)

  // Validate page is within range
  if (pageNum > totalPages) {
    notFound()
  }

  return (
    <div>
      <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        basePath="/page"
      />
      <Title />
      <ArticleList articles={articles} />
      <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        basePath="/page"
      />
    </div>
  )
}