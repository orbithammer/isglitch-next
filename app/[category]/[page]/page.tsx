import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

// Validate category
const validCategories = [`home`, 'tech', 'reviews', 'entertainment', 'ai']

export const generateMetadata = async ({ 
  params 
}: { 
  params: Promise<{ category: string; page: string }> 
}): Promise<Metadata> => {
  const { category, page } = await params

  // Return empty metadata for invalid categories
  if (!validCategories.includes(category.toLowerCase())) {
    return {}
  }

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page} - isGlitch.com`,
    description: `isGlitch.com - the online-est of tech rags. Where satire meets silicon and the truth isn't binary.`,
    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page} - isGlitch.com`,
      description: `isGlitch.com - the online-est of tech rags. Where satire meets silicon and the truth isn't binary.`,
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

  // Validate category and page number
  if (!validCategories.includes(category.toLowerCase()) ||
      isNaN(pageNum) || 
      pageNum < 1 || 
      !Number.isInteger(pageNum)) {
    notFound()
  }

  const { articles, totalPages } = await fetchArticles(category, pageNum)

  // Check if page exists and has articles
  if (pageNum > totalPages || articles.length === 0) {
    notFound()
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

// Generate static params for valid routes
export function generateStaticParams() {
  return validCategories.flatMap(category => 
    Array.from({ length: 10 }, (_, i) => ({
      category,
      page: String(i + 1)
    }))
  )
}