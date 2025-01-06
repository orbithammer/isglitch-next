import { authors } from '@/data/authors'

export async function fetchAuthorInfo(authorId: string) {
  const normalizedAuthorId = authorId.toLowerCase().replace(/\s+/g, '-')
  const author = authors.find(a => a.id === normalizedAuthorId)
  
  if (!author) {
    throw new Error('Author not found')
  }

  return author
}