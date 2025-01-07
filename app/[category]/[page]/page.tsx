import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: {params: Promise<{ category: string; page: string }> }) {
    const {category, page} = await params
    const { articles, totalPages } = await fetchArticles(
        category,
        parseInt(page)
    )

    return (
        <div>
            <Pagination 
              currentPage={parseInt(page)} 
              totalPages={totalPages}
              basePath={`/${category}`}
            />
            <Title />
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={parseInt(page)} 
              totalPages={totalPages}
              basePath={`/${category}`}
            />
        </div>
    )
}