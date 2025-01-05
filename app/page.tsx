import { fetchArticles } from '@/lib/fetchArticles'
import Pagination from '@/components/Pagination'
import ArticleList from '@/components/ArticleList'
import Title from '@/components/Title'

// interface PageParams {
//   params: {
//     page: string;
//   }
// }

export default async function HomePage() {
    const page = '1'
    const category = "home"
    const { articles, totalPages } = await fetchArticles(
        category,
        parseInt(page)
    )

    return (
        <div>
            <Pagination 
              currentPage={parseInt(page)} 
              totalPages={totalPages}
              basePath="/page"
            />
            <Title />
            <ArticleList articles={articles} />
            <Pagination 
              currentPage={parseInt(page)} 
              totalPages={totalPages}
              basePath="/page"
            />
        </div>
    )
}