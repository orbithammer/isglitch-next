import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
    const page = 1
    const category = "home"
    const { articles, totalPages } = await fetchArticles(
        category,
        page
    )

    return (
        <div>
            <Pagination 
              currentPage={page} 
              totalPages={totalPages}
              basePath="/page"
            />
            <Title />
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={page} 
              totalPages={totalPages}
              basePath="/page"
            />
        </div>
    )
}