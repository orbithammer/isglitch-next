// app/feed/route.ts
import { NextResponse } from 'next/server'
import { articlesData } from '@/data/articles'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic' // Disable static optimization

function getNyDateTime() {
  // Get current date/time in NY timezone
  const nyTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  return new Date(nyTime)
}

function isArticlePublished(articleDate: Date) {
  const nyNow = getNyDateTime()
  
  // Set both dates to midnight for date-only comparison if needed
  const publishDate = new Date(articleDate)
  publishDate.setSeconds(0)
  publishDate.setMilliseconds(0)
  
  const currentDate = new Date(nyNow)
  currentDate.setSeconds(0)
  currentDate.setMilliseconds(0)
  
  return publishDate <= currentDate
}

export async function GET() {
  const nyNow = getNyDateTime()
  
  // Filter to only get published articles
  const publishedArticles = articlesData
    .filter(article => isArticlePublished(article.datePublished))
    .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime())
    .slice(0, 20) // Latest 20 articles

  const headersList = await headers()
  const host = headersList.get('host') || 'isglitch.com'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  // If no articles are published yet, return an empty but valid RSS feed
  if (publishedArticles.length === 0) {
    const emptyRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>isGlitch.com</title>
    <link>${baseUrl}</link>
    <description>Latest tech news and entertainment with a satirical twist</description>
    <language>en</language>
    <lastBuildDate>${nyNow.toUTCString()}</lastBuildDate>
  </channel>
</rss>`

    return new NextResponse(emptyRss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=60' // Short cache for empty feed
      }
    })
  }

  // Generate RSS with published articles
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>isGlitch.com</title>
    <link>${baseUrl}</link>
    <description>Latest tech news and entertainment with a satirical twist</description>
    <language>en</language>
    <lastBuildDate>${nyNow.toUTCString()}</lastBuildDate>
    ${publishedArticles.map(article => `
    <item>
      <title><![CDATA[${article.header}]]></title>
      <link>${baseUrl}/article/${article.articleUrl}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.articleUrl}</guid>
      <pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${article.author}]]></dc:creator>
      <description><![CDATA[${article.subhead}]]></description>
      <content:encoded><![CDATA[
        <img src="${baseUrl}${article.img}" alt="${article.alt}" />
        ${Array.isArray(article.articleBody) 
          ? article.articleBody.map(para => `<p>${para}</p>`).join('\n')
          : `<p>${article.articleBody}</p>`
        }
      ]]></content:encoded>
      ${article.tags?.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`).join('\n    ')}
  </channel>
</rss>`

  // Calculate cache duration based on next article to be published
  let cacheSeconds = 300 // Default 5 minutes
  
  // Find next scheduled article
  const nextArticle = articlesData
    .filter(article => !isArticlePublished(article.datePublished))
    .sort((a, b) => a.datePublished.getTime() - b.datePublished.getTime())[0]

  if (nextArticle) {
    // Calculate seconds until next article publishes
    const secondsUntilNextPublish = Math.floor(
      (nextArticle.datePublished.getTime() - nyNow.getTime()) / 1000
    )
    
    // Use the shorter of our default cache or time until next publish
    cacheSeconds = Math.min(cacheSeconds, secondsUntilNextPublish)
  }

  // Ensure cache is at least 60 seconds to prevent hammering the server
  cacheSeconds = Math.max(60, cacheSeconds)

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${cacheSeconds}`
    }
  })
}