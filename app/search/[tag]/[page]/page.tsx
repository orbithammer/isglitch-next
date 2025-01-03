import { fetchArticles } from '@/lib/fetchArticles'
import ArticleList from '@/components/ArticleList'
import Image from 'next/image'
import Pagination from '@/components/Pagination'

interface PageParams {
  params: {
    tag: string;
    page: string;
  }
}

export const dynamic = 'force-dynamic'

export default async function SearchPage({ params }: PageParams) {
    const { tag, page } = params
    const { articles, totalPages } = await fetchArticles(
        undefined,
        parseInt(page),
        tag
    )

    return (
        <div>
            <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages}
                basePath={`/search/${tag}`}
            />
            <div className='absolute top-[16%] left-2 md:top-[16%] lg:top-[15.5%] xl:top-[15.5%] sm:left-[10%] flex'>
                <h1 className="text-5xl font-bold z-10 text-gray-900 dark:text-white lg:text-6xl drop-shadow-[1px_1px_5px_rgba(255,255,255,0.5)] dark:drop-shadow-[1px_1px_5px_rgba(0,0,0,0.5)]">
                    Search: {decodeURIComponent(tag)}
                </h1>
                <Image 
                    className='z-10'
                    src="/logo.svg"
                    alt="isGlitch.com"
                    width={75}
                    height={15}
                    priority
                />
            </div>
            <ArticleList articles={articles} />
            <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages}
                basePath={`/search/${tag}`}
            />
        </div>
    )
}