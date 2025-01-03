'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  category?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  category = ''
}: PaginationProps) {
  const pathname = usePathname()
  const categoryPath = category ? `/${category}` : ''
  const path = `${basePath}/${categoryPath}`

  const pageNumbers = []
  if (currentPage > 2) pageNumbers.push(currentPage - 2)
  if (currentPage > 1) pageNumbers.push(currentPage - 1)
  pageNumbers.push(currentPage)
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1)
  if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 2)

  return (
    <div className="flex justify-between items-center p-4 mx-8 mb-8">
      <Link
        href={`${path}/1`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="First page"
      >
        {'<<'}
      </Link>

      <Link
        href={currentPage === 1 ? path : `${path}/${currentPage - 1}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Previous page"
      >
        {'<'}
      </Link>

      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`${path}/${number}`}
          className={`px-3 py-2 rounded-md transition-colors ${
            currentPage === number
              ? 'text-purple-600 dark:text-green-400 font-bold'
              : 'hover:bg-purple-600 dark:hover:bg-green-400'
          }`}
        >
          {number}
        </Link>
      ))}

      <Link
        href={`${path}/${currentPage + 1}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Next page"
      >
        {'>'}
      </Link>

      <Link
        href={`${path}/${totalPages}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Last page"
      >
        {'>>'}
      </Link>
    </div>
  )
}