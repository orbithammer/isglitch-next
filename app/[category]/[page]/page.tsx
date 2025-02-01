import type { Metadata } from 'next'
import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

export const generateMetadata = async ({ 
  params 
}: { 
  params: Promise<{ category: string; page: string }> 
}): Promise<Metadata> => {
  const { category, page } = await params
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page} - isGlitch.com`,
    description: `Latest ${category} at isGlitch.com - the online-est of tech rags. Where satire meets silicon and the truth isn’t binary.`,
    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page} - isGlitch.com`,
      description: `Latest ${category} at isGlitch.com - the online-est of tech rags. Where satire meets silicon and the truth isn’t binary.`,
      url: `https://isglitch.com/${category}/${page}`,
      type: 'website'
    }
  }
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string; page: string }> 
}) {
  const { category, page } = await params
  const pageNum = parseInt(page)

  if (isNaN(pageNum) || pageNum < 1 || !Number.isInteger(pageNum)) {
    throw new Error('Invalid page number');
  }

  const { articles, totalPages } = await fetchArticles(category, pageNum)

  if (pageNum > totalPages || articles.length === 0) {
    throw new Error('Page not found');
  }

  return (
    <div>
      <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/${category}`}
      />
      <Title />
      <ArticleList articles={articles} />
      <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        basePath={`/${category}`}
      />
    </div>
  )
}