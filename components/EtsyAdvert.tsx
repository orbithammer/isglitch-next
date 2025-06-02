'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type EtsyProduct = {
  id: string;
  title: string;
  image: string;
  slug: string;
}

const products: EtsyProduct[] = [
  {
    id: '1885766764',
    title: 'Dumpster Fire Pop Art Unisex Tee',
    image: '/etsy/dumpster-fire-tee.webp',
    slug: 'dumpster-fire-pop-art-unisex-tee-funny'
  },
  {
    id: '1899944605',
    title: 'Low Battery Woman Lichtenstein Style Tee',
    image: '/etsy/low-battery-tee.webp',
    slug: 'low-battery-woman-lichtenstein-style-tee'
  },
  {
    id: '1885559440',
    title: 'Seize the Means of Computation Tee',
    image: '/etsy/seize.webp',
    slug: 'seize-the-means-of-computation-unisex'
  },
  {
    id: '1833202656',
    title: 'Doomscroll Tee',
    image: '/etsy/doomscroll.webp',
    slug: 'doomscroll-unisex-tee-heavy-metal'
  },
  {
    id: '1885797578',
    title: 'Social Engineering Social Club Hoodie',
    image: '/etsy/social.webp',
    slug: 'social-engineering-social-club-hoodie'
  },
  {
    id: '1886877552',
    title: 'Oh, The Horror! Comic Tee',
    image: '/etsy/horror.webp',
    slug: 'oh-the-horror-comic-pop-art-phone-tee'
  }
]

export default function EtsyAdvert() {
  const [product, setProduct] = useState<EtsyProduct | null>(null)
  
  useEffect(() => {
    // Select a random product
    const randomIndex = Math.floor(Math.random() * products.length)
    setProduct(products[randomIndex])
  }, [])
  
  if (!product) return null
  
  const etsy_url = `https://www.etsy.com/listing/${product.id}/${product.slug}`
  
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-center">isGlitch Merch Alert</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/3]">
          <Image 
            src={product.image} 
            alt={product.title}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h4 className="text-xl font-semibold mb-3">{product.title}</h4>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Show your tech-savvy sense of humor with our exclusive isGlitch merch. Perfect for code debuggers, tech enthusiasts, and people who&apos;ve thrown their laptop across the room at least once.</p>
          <a 
            href={etsy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-purple-600 hover:bg-purple-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Shop Now on Etsy
          </a>
        </div>
      </div>
    </div>
  )
}