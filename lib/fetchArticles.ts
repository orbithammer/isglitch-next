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

export type CategoryTags = Record<string, string[]>

export async function getCategoryTags(): Promise<CategoryTags> {
  const articles = await articlesData
  const categories = ['home', 'tech', 'reviews', 'entertainment', 'ai']
  const tags: Record<string, Record<string, number>> = {}

  categories.forEach(category => {
    tags[category] = {}
    articles.forEach(article => {
      if (category === 'home' || article.category.toLowerCase() === category) {
        article.tags?.forEach(tag => {
          tags[category][tag] = (tags[category][tag] || 0) + 1
        })
      }
    })
  })

  const topTags: CategoryTags = {}
  Object.entries(tags).forEach(([category, categoryTags]) => {
    topTags[category] = Object.entries(categoryTags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag)
  })

  return topTags
}

export async function fetchArticles(category?: string, page: number = 1, tag?: string) {
  const articles = await articlesData
  const itemsPerPage = 10
  
  let filtered = articles

  if (tag) {
    filtered = articles.filter(article => article.tags?.includes(tag))
  } else if (category === 'home') {
    filtered = articles.filter(article => 
      ['tech', 'reviews', 'entertainment', 'ai'].includes(article.category.toLowerCase())
    )
  } else if (category) {
    filtered = articles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    )
  }
    
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