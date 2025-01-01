import { articlesData } from "@/data/articles"

export type Article = {
  id: number
  articleUrl: string
  category: string
  img: string
  alt: string
  header: string
  subhead: string
  author: string
  datePublished: Date
  tags?: string[]
  articleBody?: string[]
}

export async function fetchArticles(category?: string, page: number = 1) {
  const articles = await articlesData
  const itemsPerPage = 10
  
  const filtered = category ? 
    articles.filter(article => article.category.toLowerCase() === category.toLowerCase()) : 
    articles
    
  // Sort by date, newest first
  const sorted = [...filtered].sort((a, b) => 
    b.datePublished.getTime() - a.datePublished.getTime()
  )
    
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  
  return {
    articles: sorted.slice(start, end),
    totalPages: Math.ceil(filtered.length / itemsPerPage),
    currentPage: page
  }
 }

export async function fetchArticle(articleUrl: string) {
  const { articles } = await fetchArticles()
  return articles.find(article => article.articleUrl === articleUrl)
}