import { fetchArticles } from '@/lib/fetchArticles'
import ArticleList from '@/components/ArticleList'

interface PageParams {
  params: {
    category: string;
    page: string;
  }
}

export default async function CategoryPage({ params }: PageParams) {
    const {category, page} = await params
    const { articles, totalPages } = await fetchArticles(
        category,
        parseInt(page)
    )

    return (
        <div>
            <p>Page: {page}</p>
            <ArticleList articles={articles} />
        </div>
    )
}
