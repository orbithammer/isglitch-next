import { Metadata } from 'next'

type MetaTagsProps = {
  title: string
  description: string
  imageUrl: string
  url: string
}

export function generateMetadata({ title, description, imageUrl, url }: MetaTagsProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      url,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@EtAl19820625'
    },
    alternates: {
      canonical: url
    }
  }
}