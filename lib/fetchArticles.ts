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
  articleBody?: string[] | string
}

export type CategoryTags = Record<string, string[]>

export async function getCategoryTags(): Promise<CategoryTags> {
  const articles = await articlesData
  const categories = ['home', 'tech', 'reviews', 'entertainment', 'ai']
  const TARGET_TAG_COUNT = 10
  
  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Split articles into recent and older
  const recentArticles = articles.filter(article => 
    article.datePublished >= thirtyDaysAgo
  )
  const olderArticles = articles.filter(article => 
    article.datePublished < thirtyDaysAgo
  )

  // Sort older articles by date, most recent first
  const sortedOlderArticles = [...olderArticles].sort((a, b) => 
    b.datePublished.getTime() - a.datePublished.getTime()
  )

  // Function to collect tags from articles
  const collectTags = (articleList: Article[], category: string) => {
    const tagCounts: Record<string, number> = {}
    articleList.forEach(article => {
      if (category === 'home' || article.category.toLowerCase() === category) {
        article.tags?.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })
    return tagCounts
  }

  const topTags: CategoryTags = {}

  categories.forEach(category => {
    // Get tags from recent articles first
    const recentTags = collectTags(recentArticles, category)
    const recentTagsList = Object.entries(recentTags)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)

    if (recentTagsList.length >= TARGET_TAG_COUNT) {
      // If we have enough recent tags, just take the top 10
      topTags[category] = recentTagsList.slice(0, TARGET_TAG_COUNT)
    } else {
      // If we need more tags, get them from older articles
      const olderTags = collectTags(sortedOlderArticles, category)
      
      // Filter out tags that are already in recentTagsList
      const remainingOlderTags = Object.entries(olderTags)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag)
        .filter(tag => !recentTagsList.includes(tag))

      // Combine recent and older tags
      topTags[category] = [
        ...recentTagsList,
        ...remainingOlderTags.slice(0, TARGET_TAG_COUNT - recentTagsList.length)
      ]
    }
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
  const articles = await articlesData
  return articles.find(article => article.articleUrl === articleUrl)
}