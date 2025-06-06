import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title';

export const dynamic = 'force-dynamic'

export default async function SearchPage({ params }: {params: Promise<{ tag: string; page: string }> }) {
    const { tag, page } = await params
    // Decode the URL-encoded tag
    const decodedTag = decodeURIComponent(tag)  
    const { articles, totalPages } = await fetchArticles(
        parseInt(page),
        undefined, //implement search by category later
        decodedTag
    )

    return (
        <div>
            <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages}
                basePath={`/search/${tag}`}
            />
            <Title />
            <ArticleList articles={articles} />
            <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages}
                basePath={`/search/${tag}`}
            />
        </div>
    )
}