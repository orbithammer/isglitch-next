'use client'

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string  
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  // Remove trailing slashes and ensure consistent format
  const normalizedPath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  
  const pageNumbers = []
  if (currentPage > 2) pageNumbers.push(currentPage - 2)
  if (currentPage > 1) pageNumbers.push(currentPage - 1)
  pageNumbers.push(currentPage)
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1)
  if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 2)

  return (
    <div className="flex justify-between items-center p-4 mx-8 mb-8">
      <Link
        href={`${normalizedPath}/1`}
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
        href={`${normalizedPath}/${Math.max(1, currentPage - 1)}`}
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
          href={`${normalizedPath}/${number}`}
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
        href={`${normalizedPath}/${Math.min(totalPages, currentPage + 1)}`}
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
        href={`${normalizedPath}/${totalPages}`}
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